import { Model, Schema, Document, Types, model, models } from "mongoose";

export interface IPatient {
  user: Types.ObjectId;
  firstname: string;
  lastname: string;
  contactInfo: {
    phoneNumber: string;
    address?: string;
  };
  dateOfBirth?: Date;
  avatar?: string;
  email: string;
  gender?: "male" | "female" | "other";
}

export interface IPatientDoc extends IPatient, Document {}

export interface IPatientModel extends Model<IPatientDoc> {}
const patientSchema = new Schema<IPatient, IPatientModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: [true, "Please Enter FirstName"],
    },
    lastname: String,
    contactInfo: {
      phoneNumber: { type: String, required: true },
      address: String,
    },
    avatar: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Patient: IPatientModel =
  (models.Patient as IPatientModel) ||
  model<IPatient, IPatientModel>("Patient", patientSchema);

export default Patient;
