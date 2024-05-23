import dbConnect from "@/lib/dbconnection";
import { departmentSchema } from "@/lib/schema";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Department from "@/models/Department";
import { NextRequest, NextResponse } from "next/server";

const createDepartment = catchAsyncError(async (req: NextRequest) => {
  const data = departmentSchema.parse(await req.json());
  await dbConnect();
  const newDepartment = await Department.create(data);
  if (!newDepartment) {
    throw new CustomError("Failed to create new department!");
  }
  return NextResponse.json(newDepartment, { status: 201 });
});

const getDepartments = catchAsyncError(async (req: NextRequest) => {
  await dbConnect();
  const departments = await Department.find().select("-doctors");
  return NextResponse.json(departments, { status: 200 });
});

const editDepartment = catchAsyncError(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const data = departmentSchema.parse(await req.json());
  await dbConnect();
  const updatedDepartment = await Department.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!updatedDepartment) {
    throw new CustomError("Department not found!", 400);
  }
  return NextResponse.json(updatedDepartment);
});

export {
  createDepartment as POST,
  getDepartments as GET,
  editDepartment as PUT,
};
