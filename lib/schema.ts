import { z } from "zod";
import { timezones } from "./constants";
import { DayName } from "@/types";

// time formate hrs:min am/pm
export const timeFormat = /^(0?[1-9]|1[0-2]):[0-5][0-9](am|pm)$/;

export const timeslotsSchema = z.object({
  startTime: z.string().regex(timeFormat, "invalid format").min(1),
  endTime: z.string().regex(timeFormat, "invalid format").min(1),
});

export const patientDetailsSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  mobileNumber: z.string().regex(/^\d{10}$/),
  age: z.string().regex(/^(?:1[0-4]?\d|150|[1-9])$/),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z.string().min(6),
});

export const appointmentDetailsSchema = z.object({
  appointmentDate: z.string().datetime().default(Date.now().toString()),
  department: z.string().min(1),
  doctor: z.string().min(1),
  timeslot: timeslotsSchema,
});

export const appointmentSchema =
  appointmentDetailsSchema.merge(patientDetailsSchema);

export const departmentSchema = z.object({
  name: z.string().min(1).max(255),
  doctors: z.array(z.string()),
  avatar: z.string().optional(),
});

const dayNames: DayName[] = [
  "monday",
  "thursday",
  "thursday",
  "wednesday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const scheduleSchema = z.object({
  doctor: z.string().optional(),
  workingDays: z.array(z.enum([...dayNames] as [DayName, ...DayName[]])),
  timezone: z.enum(timezones).default("IST"),
  maxBookingSlots: z.number().default(15),
});

export const doctorSchema = z.object({
  user: z.string().optional(),
  firstname: z.string().min(1),
  lastname: z.string().optional(),
  department: z.string().min(1),
  contactInfo: z
    .object({
      phoneNumber: z
        .string()
        .length(10, "Phone number must be 10 digits")
        .optional()
        .refine((value = "") => {
          return /^\d+$/.test(value);
        }, "Phone number must be a number"),
      address: z.string().optional(),
    })
    .optional(),
  schedule: z
    .array(
      scheduleSchema.merge(
        z.object({
          doctor: z.string().optional(),
        })
      )
    )
    .optional(),
  consultationFee: z
    .string()
    .optional()
    .refine((value = "") => {
      return /^\d+(\.\d{1,2})?$/.test(value);
    }, "Invalid consultation fee"),
  avatar: z.string().optional(),
  email: z.string().email(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid credentials!"),
  password: z.string().min(4),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  isDoctor: z.boolean().optional(),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

// function forbidDuplicate(times: { startTime: string; endTime: string; }[], ctx: z.RefinementCtx) {
//   const overlap = timeOverlap(times)
// }
