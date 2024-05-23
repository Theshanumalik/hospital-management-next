import dbConnect from "@/lib/dbconnection";
import { scheduleSchema } from "@/lib/schema";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Schedule from "@/models/Schedule";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = catchAsyncError(async (req: NextRequest) => {
  const data = scheduleSchema.parse(await req.json());
  await dbConnect();
  //
  const schedule = await Schedule.create(data);

  return NextResponse.json(schedule);
});
export const GET = catchAsyncError(async (req: NextRequest) => {
  const { doctorId } = await req.json();

  if (!doctorId) {
    throw new CustomError("Doctor Id should be provided!");
  }

  const schedules = await Schedule.find({ doctor: doctorId });

  return NextResponse.json(schedules, { status: 200 });
});

export const PUT = catchAsyncError(async (req: NextRequest) => {});
export const DELETE = catchAsyncError(async (req: NextRequest) => {
  const { scheduleId } = z
    .object({ scheduleId: z.string().min(1) })
    .parse(await req.json());
  await dbConnect();
  const schedule = await Schedule.findByIdAndDelete(scheduleId);

  if (!schedule) {
    throw new CustomError("Schedule not found", 404);
  }

  return NextResponse.json({ message: "Schedule deleted successfully" });
});
