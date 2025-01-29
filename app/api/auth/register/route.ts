import dbConnect from "@/lib/dbconnection";
import { sendMail, TEMPLATES } from "@/lib/mail";
import { registerSchema } from "@/lib/schema";
import { catchAsyncError, CustomError, generateToken } from "@/lib/utils";
import Doctor from "@/models/Doctor";
import User, { IUser } from "@/models/User";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = catchAsyncError(async (req: NextRequest) => {
  // Parse request body
  const { email, isDoctor, password } = registerSchema.parse(await req.json());

  // Connect to the database
  await dbConnect();
  console.log("I am colled");
  // Find existing user by email
  let user: HydratedDocument<IUser> | null = await User.findOne({
    email,
  }).select("+password +isVerified");

  console.log({ user });

  // If user is found and verified, throw an error
  if (user && user.isVerified) {
    throw new CustomError("Email is already in use. Please login", 400);
  }

  // If user is not found and isDoctor flag is true
  if (!user && isDoctor) {
    // Check if the email exists in the Doctor model
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      // Create a new user with the doctor role
      user = new User({ email, role: "doctor", password });
      existingDoctor.user = user._id;
      await existingDoctor.save();
    } else {
      throw new CustomError("Doctor is not registered in our system!", 400);
    }
  }

  // If user is found, but not verified, resend verification email
  if (user && !user.isVerified) {
    // Generate verification token and expiry
    user.verification.token = generateToken(6);
    user.verification.expiry = new Date(Date.now() + 60 * 60 * 1000);

    // Send verification email
    await sendMail(
      user.email,
      "Verify your email",
      TEMPLATES.Email_VERIFICATION_OTP(user.verification.token)
    );
  }

  // If user is not found and is not a doctor
  if (!user && !isDoctor) {
    // Create a new user with the patient role
    user = new User({ email, role: "patient", password });

    // Generate verification token and expiry
    user.verification.token = generateToken(6);
    user.verification.expiry = new Date(Date.now() + 60 * 60 * 1000);

    // Send verification email
    await sendMail(
      user.email,
      "Verify your email",
      TEMPLATES.Email_VERIFICATION_OTP(user.verification.token)
    );
  }

  // Save user to the database
  await user?.save();

  // Return success response
  return NextResponse.json(
    { message: "Verification email sent" },
    { status: 201 }
  );
});
