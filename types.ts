export type Role = "admin" | "patient" | "doctor" | "patient";

export type DoctorCardProps = {
  _id: string;
  firstname: string;
  lastname: string;
  department: string;
  avatar: string;
};

export type DepartmentType = {
  _id: string;
  name: string;
  avatar?: string;
};

export type DoctorForm = {};

export type DayName =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type TimeSlot = {
  startTime: string;
  endTime: string;
};
