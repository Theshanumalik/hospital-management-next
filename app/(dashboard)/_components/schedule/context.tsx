import { createContext, useContext, useMemo } from "react";

type ScheduleContextType = {
  interval: number;
  timeOptions: string[];
};

export const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};

export const ScheduleProvider = ({
  children,
  interval,
}: {
  children: React.ReactNode;
  interval: number;
}) => {
  const timeOptions = useMemo(() => generateTimeOptions(interval), [interval]);
  return (
    <ScheduleContext.Provider value={{ interval, timeOptions }}>
      {children}
    </ScheduleContext.Provider>
  );
};

function generateTimeOptions(interval: number): string[] {
  if (interval <= 0 || interval > 1440) {
    throw new Error("Interval must be between 1 and 1440 minutes.");
  }

  const times: string[] = [];
  for (let minutes = 0; minutes < 1440; minutes += interval) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert to 12-hour format
    const amPm = hours < 12 || hours === 24 ? "am" : "pm";
    const formattedMinutes = remainingMinutes.toString().padStart(2, "0"); // Pad with leading zero

    const timeString = `${formattedHours}:${formattedMinutes}${amPm}`;
    times.push(timeString);
  }
  return times;
}
