import dbConnect from "@/lib/dbconnection";
import { appointmentSchema } from "@/lib/schema";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Appointment from "@/models/Appointment";
import Leave from "@/models/Leave";
import { NextRequest, NextResponse } from "next/server";

const createAppointment = catchAsyncError(async (req: NextRequest) => {
  const body = appointmentSchema.parse(await req.json());

  await dbConnect();

  //   if dactor is on leave for this date, return error
  const isleave = await Leave.findOne({
    doctorId: body.doctor,
    leaveDate: body.appointmentDate,
  });

  if (isleave) {
    throw new CustomError("Doctor is on leave on this date", 401);
  }

  //   validate if there is already an appointment for the same date and timeslot and doctor

  const existingAppointment = await Appointment.findOne({
    doctor: body.doctor,
    date: body.appointmentDate,
    "timeslot.startTime": body.timeslot.startTime,
    "timeslot.endTime": body.timeslot.endTime,
  });

  if (existingAppointment) {
    throw new CustomError(
      "Appointment already exists for this date and time",
      401
    );
  }

  await Appointment.create({ date: body.appointmentDate, ...body });

  return NextResponse.json(
    { message: "Appointment created successfully" },
    { status: 201, statusText: "ok" }
  );
});

export { createAppointment as POST };
