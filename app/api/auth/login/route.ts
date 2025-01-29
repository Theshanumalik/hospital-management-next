import dbConnect from "@/lib/dbconnection";
import { catchAsyncError, CustomError, getFullName } from "@/lib/utils";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
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

  let userInformation: {
    email: string;
    role: string;
    id: string;
    image: string;
    name: string;
  } | null = null;

  console.log({ user });

  switch (user.role) {
    case "doctor":
      const doctor = await Doctor.findOne({ user: user._id });
      if (!doctor) throw new CustomError("Invalid credentials", 401);
      userInformation = {
        email: user.email,
        role: user.role,
        id: user._id,
        image: doctor?.avatar || "",
        name: getFullName(doctor.firstname || "", doctor?.lastname),
      };
      break;

    case "patient":
      const patient = await Patient.findOne({ user: user._id });
      if (!patient) throw new CustomError("Invalid credentials", 401);
      userInformation = {
        email: user.email,
        role: user.role,
        id: user._id,
        image: patient?.avatar || "",
        name: getFullName(patient.firstname || "", patient?.lastname),
      };
      break;
    default:
      userInformation = {
        email: user.email,
        role: user.role,
        id: user._id,
        image: "",
        name: "Admin",
      };
      break;
  }

  return NextResponse.json(userInformation, { status: 200 });
});
