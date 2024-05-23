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
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $unwind: "$department",
    },
    {
      $project: {
        _id: 1,
        firstname: 1,
        lastname: 1,
        email: 1,
        department: "$department.name",
        consultationFee: 1,
        avatar: 1,
        createdAt: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ])
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
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

export const PUT = catchAsyncError(async (req: NextRequest) => {
  const data = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const doctorId = searchParams.get("doctorId");
  if (!doctorId) {
    throw new CustomError("Doctor ID is required!", 400);
  }
  await dbConnect();
  const doctor = await Doctor.findByIdAndUpdate(doctorId, data, {
    new: true,
    runValidators: true,
  });
  if (!doctor) {
    throw new CustomError("Doctor not found!", 404);
  }
  return NextResponse.json(doctor);
});

export const DELETE = catchAsyncError(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const doctorId = searchParams.get("doctorId");
  if (!doctorId) {
    throw new CustomError("Doctor ID is required!", 400);
  }
  await dbConnect();
  const doctor = await Doctor.findByIdAndDelete(doctorId);
  if (!doctor) {
    throw new CustomError("Doctor not found!", 404);
  }
  return NextResponse.json("Doctor deleted successfully!");
});
