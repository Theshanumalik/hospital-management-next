import dbConnect from "@/lib/dbconnection";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Schedule from "@/models/Schedule";
import { isValidObjectId } from "mongoose";
import { type NextRequest, NextResponse } from "next/server";

export const GET = catchAsyncError(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const doctorId = searchParams.get("doctorId");
  const appointmentDate = searchParams.get("appointmentDate");

  if (!doctorId || !appointmentDate) {
    throw new CustomError("Doctor ID and Appointment Date are required", 400);
  }
  await dbConnect();

  const date = new Date(appointmentDate);

  if (!isValidObjectId(doctorId)) {
    throw new CustomError("Invalid Doctor ID", 400);
  }

  const schedule = await Schedule.findOne({
    doctor: doctorId,
    days: { $in: [date.getDay()] },
  });

  return NextResponse.json(schedule, { status: 200 });
});
