import dbConnect from "@/lib/dbconnection";
import { catchAsyncError, CustomError } from "@/lib/utils";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = catchAsyncError(async (req: NextRequest) => {
  await dbConnect();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email, isVerified: true }).select(
    "+password"
  );

  if (!user) {
    throw new CustomError("Invalid credentials", 401);
  }

  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    throw new CustomError("Invalid credentials", 401);
  }

  return NextResponse.json({
    ...user.toJSON(),
    password: undefined,
    id: user.id,
  });
});
