import dbConnect from "@/lib/dbconnection";
import { doctorSchema } from "@/lib/schema";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Doctor from "@/models/Doctor";
import Schedule from "@/models/Schedule";
import { NextRequest, NextResponse } from "next/server";

export const GET = catchAsyncError(async (req: NextRequest) => {
  await dbConnect();

  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 10;

  const skip = (page - 1) * limit;

  const doctors = await Doctor.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        firstname: 1,
        lastname: 1,
        avatar: 1,
        department: 1,
        _id: 1,
      },
    },
  ])
    .skip(skip)
    .limit(limit);
  return NextResponse.json(doctors);
});

export const POST = catchAsyncError(async (req: NextRequest) => {
  await dbConnect();
  const { schedule, ...data } = doctorSchema.parse(await req.json());
  const newDoctor = await Doctor.create(data);
  if (schedule && schedule?.length > 0) {
    schedule?.forEach(async (scheduleId) => {
      await Schedule.create({ ...scheduleId, doctor: newDoctor._id });
    });
  }
  return NextResponse.json(newDoctor, { status: 200, statusText: "ok" });
});
