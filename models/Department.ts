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

const Department: IDepartmentModel =
  (models.Department as IDepartmentModel) ||
  model<IDepartment, IDepartmentModel>("Department", departmentSchema);

export default Department;
