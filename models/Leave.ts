import mongoose, { InferSchemaType, Model } from "mongoose";

const leaveSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "Doctor",
  },
  leaveDate: {
    type: Date,
    required: [true, "Leave Date must be Provided!"],
  },
});

type ILeave = InferSchemaType<typeof leaveSchema>;

const Leave =
  (mongoose.models.leaves as Model<ILeave>) ||
  mongoose.model<ILeave>("leaves", leaveSchema);

export default Leave;
