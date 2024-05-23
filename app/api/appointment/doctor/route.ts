import dbConnect from "@/lib/dbconnection";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Doctor from "@/models/Doctor";
import { ObjectId } from "mongodb";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = catchAsyncError(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const departmentId = searchParams.get("department");

  console.log(departmentId);

  await dbConnect();

  if (!departmentId || !isValidObjectId(departmentId)) {
    throw new CustomError("Invalid Department ID", 400);
  }

  const doctors = await Doctor.find({ department: new ObjectId(departmentId) });

  return NextResponse.json(doctors, { status: 200 });
});
