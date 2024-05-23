import { Document, model, Model, models, Schema, Types } from "mongoose";
import Doctor from "./Doctor";
import { CustomError } from "@/lib/utils";
import { time24hrRegex } from "@/lib/schema";

export interface ITimeSlot {
  startTime: string;
  endTime: string;
}
interface ITimeSlotDoc extends ITimeSlot, Document {}

export const timeSlotSchema = new Schema<ITimeSlot, ITimeSlotDoc>({
  startTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: "Invalid time format",
    },
  },
  endTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return time24hrRegex.test(v);
      },
      message: "Invalid time format",
    },
  },
});

interface ISchedule {
  doctor: Types.ObjectId;
  timeslots: ITimeSlot[];
  days: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
}

interface IScheduleDoc extends ISchedule, Document {}

interface IScheduleModel extends Model<IScheduleDoc> {}

const scheduleSchema = new Schema<ISchedule, IScheduleModel>({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  days: {
    type: [Number],
    required: true,
    validate: {
      validator: function (v: (0 | 1 | 2 | 3 | 4 | 5 | 6)[]) {
        return v.length > 0;
      },
      message: "At least one day must be selected",
    },
    maxlength: 7,
  },
  timeslots: { type: [timeSlotSchema], required: true },
});

scheduleSchema.pre<IScheduleDoc>("save", async function (next) {
  try {
    if (this.isNew) {
      const doctor = await Doctor.findById(this.doctor);
      if (!doctor) {
        return next(new Error("Invalid Doctor Id!"));
      }
      doctor.schedule.push(this._id);
      await doctor.save({ validateBeforeSave: true });
      next();
    }
  } catch (error) {
    console.error("Error saving schedule:", error);
  }
});

scheduleSchema.pre<IScheduleDoc>("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  const daysScheduled: number[] = [];
  const existingSchedules = await Schedule.find({ doctor: this.doctor });

  for (const schedule of existingSchedules) {
    for (const day of schedule.days) {
      daysScheduled.push(day);
    }
  }

  for (const day of this.days) {
    if (daysScheduled.includes(day)) {
      return next(new CustomError("Schedule already exists for this day", 400));
    }
  }

  next();
});

scheduleSchema.pre<IScheduleDoc>("save", function (next) {
  if (this.isModified("timeslots")) {
    this.timeslots = this.timeslots.sort((a, b) => {
      const aStartTime = new Date(`01/01/2000 ${a.startTime}`);
      const bStartTime = new Date(`01/01/2000 ${b.startTime}`);
      return aStartTime.getTime() - bStartTime.getTime();
    });
  }
  next();
});

scheduleSchema.post<IScheduleDoc>(
  "findOneAndDelete",
  async function (schedule: IScheduleDoc) {
    try {
      const doctor = await Doctor.findById(schedule.doctor);
      if (!doctor) {
        return;
      }
      doctor.schedule = doctor.schedule.filter(
        (scheduleId) => scheduleId.toString() !== schedule._id.toString()
      );
      await doctor.save({ validateBeforeSave: true });
    } catch (error) {
      console.error("Error removing schedule from doctor:", error);
    }
  }
);

const Schedule: IScheduleModel =
  (models.Schedule as IScheduleModel) ||
  model<ISchedule, IScheduleModel>("Schedule", scheduleSchema);

export default Schedule;
