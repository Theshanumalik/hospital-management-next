import { Schema } from "mongoose";
import { Types, Model, Document, model, models } from "mongoose";
import { ITimeSlot, timeSlotSchema } from "./Schedule";

interface IAppointment {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  date: Date;
  timeslot: ITimeSlot;
  reason: string;
  status: "pending" | "approved" | "rejected" | "completed";
  name: string;
  age: string;
  gender: "Male" | "Female" | "Other";
  address: string;
  mobileNumber: string;
  email: string;
}

interface IAppointmentDoc extends IAppointment, Document {}
interface IAppointmentModel extends Model<IAppointmentDoc> {}

const appointmentSchema = new Schema<IAppointment, IAppointmentModel>({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  date: {
    type: Date,
    required: true,
  },
  timeslot: {
    type: timeSlotSchema,
    required: true,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending",
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Appointment: IAppointmentModel =
  (models.Appointment as IAppointmentModel) ||
  model<IAppointment, IAppointmentModel>("Appointment", appointmentSchema);

export default Appointment;
