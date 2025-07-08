import { type ClassValue, clsx } from "clsx";
import { NextRequest, NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const getFullName = (firstname: string, lastname?: string) => {
  return lastname ? `${firstname} ${lastname}` : firstname;
};

export function catchAsyncError(
  fun: (req: NextRequest, ...others: any[]) => Promise<any>
) {
  return async (req: NextRequest, ...others: any[]) => {
    try {
      return await fun(req, ...others);
    } catch (error: any) {
      // Handle custom error
      if (error instanceof CustomError) {
        return NextResponse.json(error.message, {
          status: error.statusCode,
        });
      }
      // Handle Zod error
      if (error?.errors) {
        return NextResponse.json(error.errors, {
          status: 400,
        });
      }
      // Handle Mongoose error
      if (error.name === "ValidationError") {
        return NextResponse.json(error.message, {
          status: 400,
        });
      }
      // Handle Mongoose duplicate key error
      if (error.code === 11000) {
        return NextResponse.json("Duplicate Key Error", {
          status: 400,
        });
      }
      // Handle other errors
      console.error(error);
      return NextResponse.json("Internal Server Error", { status: 500 });
    }
  };
}

export function generateToken(length = 6) {
  return Math.random().toString(20).substr(2, length);
}

export function convert12to24(time12h: string): string {
  const match = time12h.match(/^(\d{1,2}):(\d{2})([ap]m)$/i);

  if (!match) {
    throw new Error('Invalid time format. Expected "HH:MMam" or "HH:MMpm"');
  }

  let [_, hoursStr, minutesStr, period] = match;
  let hours = parseInt(hoursStr, 10);
  const minutes = minutesStr.padStart(2, "0");

  // Validate time components
  if (hours < 0 || hours > 12 || minutesStr.length !== 2) {
    throw new Error("Invalid time value");
  }

  // Convert hours
  hours = (hours % 12) + (period.toLowerCase() === "pm" ? 12 : 0);

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

/*
  time slot sorting isn't working properly
  startA and startB are not being generated correctly
  this is because the date is not being set correctly
*/
export function timeOverlap(
  slots: { startTime: string; endTime: string }[]
): boolean {
  // Convert all times to 24h format first
  const normalizedSlots = slots.map((slot) => ({
    startTime: convert12to24(slot.startTime),
    endTime: convert12to24(slot.endTime),
  }));

  // Create a reference date (time components will be ignored)
  const referenceDate = new Date().toISOString().split("T")[0];

  // Sort slots by start time (ascending)
  const sortedSlots = [...normalizedSlots].sort((a, b) => {
    return (
      new Date(`${referenceDate} ${a.startTime}`).getTime() -
      new Date(`${referenceDate} ${b.startTime}`).getTime()
    );
  });

  // Check for overlaps
  for (let i = 1; i < sortedSlots.length; i++) {
    const prevEnd = new Date(
      `${referenceDate} ${sortedSlots[i - 1].endTime}`
    ).getTime();
    const currStart = new Date(
      `${referenceDate} ${sortedSlots[i].startTime}`
    ).getTime();

    if (prevEnd > currStart) {
      return true;
    }
  }

  return false;
}
