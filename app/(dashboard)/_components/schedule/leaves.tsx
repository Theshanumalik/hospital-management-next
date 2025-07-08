"use client";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { DateRange } from "react-day-picker";

const Leaves = () => {
  const [date, setDate] = React.useState<Date[] | undefined>([new Date()]);
  return (
    <div className="p-6 bg-white shadow rounded-xl flex-1">
      <h1 className="font-semibold my-3 text-lg">Leaves</h1>

      <Calendar
        mode="multiple"
        defaultMonth={new Date(2025, 5, 12)}
        selected={date}
        onSelect={setDate}
        className="rounded-lg border shadow-sm"
        role="application"
        // className="w-full"
        classNames={{
          root: "w-full border-none",
          caption: "text-lg font-semibold",
        }}
        onDayClick={(day) => {
          console.log("Selected day:", day);
        }}
      />
    </div>
  );
};

export default Leaves;
