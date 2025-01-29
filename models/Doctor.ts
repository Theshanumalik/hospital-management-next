import {
  Model,
  Schema,
  Document,
  Types,
  model,
  models,
  isValidObjectId,
} from "mongoose";
import Department from "./Department";
import User from "./User";

export interface IDoctor {
  user: Types.ObjectId;
  firstname: string;
  lastname: string;
  department: Types.ObjectId;
  contactInfo?: {
    phoneNumber?: string;
    address?: string;
  };
  email: string;
  schedule: Types.ObjectId;
  consultationFee?: number;
  avatar?: string;
}

export interface IDoctorDoc extends IDoctor, Document {
  setSchedule: (scheduleId: string) => Promise<void>;
}

export interface IDoctorModel extends Model<IDoctorDoc> {}
const doctorSchema = new Schema<IDoctor, IDoctorModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstname: {
      type: String,
      required: [true, "Please Enter FirstName"],
    },
    lastname: String,
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Please Enter Department"],
    },
    contactInfo: {
      phoneNumber: String,
      address: String,
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    consultationFee: {
      type: Number,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

doctorSchema.pre<IDoctorDoc>("save", async function (next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const department = await Department.findById(this.department);
    if (!department) {
      return next(new Error("Invalid Department Id!"));
    }
    department.doctors.push(this._id);
    await department.save();
    next();
  } catch (error) {
    return next(error as any);
  }
});

doctorSchema.post<IDoctorDoc>(
  "findOneAndDelete",
  async function (doc: IDoctorDoc) {
    try {
      const department = await Department.findById(doc.department);
      if (!department) {
        throw new Error("Invalid Department Id!");
      }
      department.doctors = department.doctors.filter(
        (docId) => docId.toString() !== doc._id.toString()
      );
      await department.save();
    } catch (error) {
      console.error("Error removing doctor from department:", error);
    }
  }
);

doctorSchema.methods.setSchedule = async function (scheduleId: string) {
  const doctor = this as IDoctorDoc;
  if (!isValidObjectId(scheduleId)) {
    throw new Error("Invalid Schedule Id!");
  }
  doctor.schedule = scheduleId as unknown as Types.ObjectId;
  await doctor.save();
};

const Doctor: IDoctorModel =
  (models.Doctor as IDoctorModel) ||
  model<IDoctor, IDoctorModel>("Doctor", doctorSchema);

export default Doctor;
