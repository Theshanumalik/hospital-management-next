import { Schema, model, models, Document, Model, Types } from "mongoose";

export interface IDepartment {
  name: string;
  doctors: Types.ObjectId[];
  avatar: string;
}
export interface IDepartmentDoc extends IDepartment, Document {}

export interface IDepartmentModel extends Model<IDepartmentDoc> {}
const departmentSchema = new Schema<IDepartment, IDepartmentModel>(
  {
    name: { type: String, required: [true, "Department Name is Required!"] },
    avatar: { type: String, default: "" },
    doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
  },
  { timestamps: true, versionKey: false }
);

const Department = (models?.Department ||
  model<IDepartment, IDepartmentModel>(
    "Department",
    departmentSchema
  )) as IDepartmentModel;

export default Department;
