import { Document, model, Model, models, Schema, Types } from "mongoose";
import Doctor from "./Doctor";
import { time24hrRegex } from "@/lib/schema";
import { DayName } from "@/types";
import { timezones } from "@/lib/constants";

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
  bookingTimes: {
    [key in DayName]: ITimeSlot[];
  };
  timezone: string;
}

interface IScheduleDoc extends ISchedule, Document {}

interface IScheduleModel extends Model<IScheduleDoc> {}

const scheduleSchema = new Schema<ISchedule, IScheduleModel>({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
    unique: true,
  },
  bookingTimes: {
    monday: [timeSlotSchema],
    tuesday: [timeSlotSchema],
    wednesday: [timeSlotSchema],
    thursday: [timeSlotSchema],
    friday: [timeSlotSchema],
    saturday: [timeSlotSchema],
    sunday: [timeSlotSchema],
  },
  timezone: {
    type: String,
    enum: timezones,
    default: "IST",
  },
});

scheduleSchema.pre<IScheduleDoc>("save", async function (next) {
  try {
    if (this.isNew) {
      const doctor = await Doctor.findById(this.doctor);
      if (!doctor) {
        return next(new Error("Invalid Doctor Id!"));
      }
      await doctor.setSchedule(this._id);
      next();
    }
  } catch (error) {
    console.error("Error saving schedule:", error);
  }
});

// scheduleSchema.pre<IScheduleDoc>("save", function (next) {
//   if (this.isModified("timeslots")) {
//     this.timeslots = this.timeslots.sort((a, b) => {
//       const aStartTime = new Date(`01/01/2000 ${a.startTime}`);
//       const bStartTime = new Date(`01/01/2000 ${b.startTime}`);
//       return aStartTime.getTime() - bStartTime.getTime();
//     });
//   }
//   next();
// });

// scheduleSchema.post<IScheduleDoc>(
//   "findOneAndDelete",
//   async function (schedule: IScheduleDoc) {
//     try {
//       const doctor = await Doctor.findById(schedule.doctor);
//       if (!doctor) {
//         return;
//       }
//       await doctor.save({ validateBeforeSave: true });
//     } catch (error) {
//       console.error("Error removing schedule from doctor:", error);
//     }
//   }
// );

const Schedule: IScheduleModel =
  (models.Schedule as IScheduleModel) ||
  model<ISchedule, IScheduleModel>("Schedule", scheduleSchema);

export default Schedule;
