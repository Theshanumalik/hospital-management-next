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

export function getTimeIn12HourFormat(time: string) {
  const [hour, minute] = time.split(":");
  const suffix = +hour >= 12 ? "PM" : "AM";
  const hour12 = +hour % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}

export const timeOverlape = (
  slots: { startTime: string; endTime: string }[]
): boolean => {
  const date = new Date().toDateString();

  const sortedSlots = [...slots].sort((a, b) => {
    const startA = new Date(`${date} ${a.startTime}`).getTime();
    const startB = new Date(`${date} ${b.startTime}`).getTime();
    return startA - startB;
  });

  for (let i = 0; i < sortedSlots.length - 1; i++) {
    const currentEndTime = new Date(
      `${date} ${sortedSlots[i].endTime}`
    ).getTime();
    const nextStartTime = new Date(
      `${date} ${sortedSlots[i + 1].startTime}`
    ).getTime();

    if (currentEndTime > nextStartTime) {
      return true;
    }
  }

  return false;
};
