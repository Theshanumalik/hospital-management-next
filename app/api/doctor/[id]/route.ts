import dbConnect from "@/lib/dbconnection";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Doctor from "@/models/Doctor";
import { NextRequest, NextResponse } from "next/server";

export const GET = catchAsyncError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();

    const doctor = await Doctor.findById(params.id);
    return NextResponse.json(doctor);
  }
);

export const PUT = catchAsyncError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const data = await req.json();
    const doctorId = params.id;
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
    return NextResponse.json("Doctor updated successfully!");
  }
);

export const DELETE = catchAsyncError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const doctorId = params.id;
    if (!doctorId) {
      throw new CustomError("Doctor ID is required!", 400);
    }
    await dbConnect();
    const doctor = await Doctor.findByIdAndDelete(doctorId);
    if (!doctor) {
      throw new CustomError("Doctor not found!", 404);
    }
    return NextResponse.json("Doctor deleted successfully!");
  }
);
