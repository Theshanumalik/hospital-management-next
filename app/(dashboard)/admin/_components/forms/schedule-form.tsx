"use client";
import { Button } from "@/components/ui/button";
import { scheduleSchema, timeslotsSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type ScheduleFormFields = z.infer<typeof scheduleSchema>;
enum Days {
  Sun = "0",
  Mon = "1",
  Tue = "2",
  Wed = "3",
  Thu = "4",
  Fri = "5",
  Sat = "6",
}
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type ScheduleFromProps = {
  setSchedule: (schedule: {
    days: ScheduleFormFields["days"];
    timeslots: ScheduleFormFields["timeslots"];
  }) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ScheduleFrom = ({ setSchedule, open, setOpen }: ScheduleFromProps) => {
  const [timeslots, setTimeslots] = useState<ScheduleFormFields["timeslots"]>(
    []
  );
  const [days, setDays] = useState<ScheduleFormFields["days"]>([]);
  const [timeSlotInput, setTimeSlotInput] = useState({
    startTime: "",
    endTime: "",
  });
  const slotsInputeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeSlotInput({ ...timeSlotInput, [e.target.name]: e.target.value });
  };
  const onTimeSlotSubmit = () => {
    if (
      !timeSlotInput.startTime ||
      !timeSlotInput.endTime ||
      timeSlotInput.startTime >= timeSlotInput.endTime
    ) {
      return;
    }

    const timeSlotInputSchema = timeslotsSchema.safeParse(timeSlotInput);
    if (!timeSlotInputSchema.success) {
      return;
    }
    if (timeslots.some((slot) => slot.startTime === timeSlotInput.startTime)) {
      return;
    }
    const newTimeslots = [...timeslots, timeSlotInput];
    setTimeslots(newTimeslots);
    setTimeSlotInput({ startTime: "", endTime: "" });
  };

  const removeTimeSlot = (timeslot: ScheduleFormFields["timeslots"][0]) => {
    const newTimeslots = timeslots.filter(
      (slot) => slot.startTime !== timeslot.startTime
    );
    setTimeslots(newTimeslots);
  };

  const handleDayClick = (day: Days) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleSave = () => {
    if (!days.length || !timeslots.length) return;
    setSchedule({ days, timeslots });
    setDays([]);
    setTimeslots([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Schedule</DialogTitle>
        </DialogHeader>
        <div>
          <label className="text-sm my-2">Select days: </label>
          <div className="flex flex-wrap items-center gap-2 my-3">
            {dayNames.map((day, index) => (
              <Button
                type="button"
                key={index}
                onClick={() => handleDayClick(index.toString() as Days)}
                className={cn("", {
                  "bg-blue-500 text-white": days.includes(
                    index.toString() as Days
                  ),
                })}
                variant={
                  days.includes(index.toString() as Days)
                    ? "primary"
                    : "outline"
                }
              >
                {day}
              </Button>
            ))}
          </div>
          <div>
            <label className="my-2 block text-sm">Add timeslots:</label>
            {timeslots.map((timeslot, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 mb-2">
                <input
                  type="time"
                  className="col-span-2 p-2 rounded-md border"
                  value={timeslot.startTime}
                  onChange={(e) => {
                    const newTimeslots = [...timeslots];
                    newTimeslots[index].startTime = e.target.value;
                    setTimeslots(newTimeslots);
                  }}
                />
                <input
                  type="time"
                  className="col-span-2 p-2 rounded-md border"
                  value={timeslot.endTime}
                  onChange={(e) => {
                    const newTimeslots = [...timeslots];
                    newTimeslots[index].endTime = e.target.value;
                    setTimeslots(newTimeslots);
                  }}
                />
                <Button
                  type="button"
                  onClick={() => removeTimeSlot(timeslot)}
                  className="col-span-1"
                  variant={"destructive"}
                  size={"icon"}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}

            <hr className="my-3" />
            <div className="grid grid-cols-5 gap-2">
              <input
                type="time"
                className="p-2 rounded-md border col-span-2"
                placeholder="Start Time"
                value={timeSlotInput.startTime}
                onChange={slotsInputeChange}
                name="startTime"
              />
              <input
                type="time"
                className="p-2 rounded-md border col-span-2"
                placeholder="End Time"
                value={timeSlotInput.endTime}
                onChange={slotsInputeChange}
                name="endTime"
              />
              <Button onClick={onTimeSlotSubmit} size={"icon"} className="mt-2">
                <FaPlus />
              </Button>
            </div>
          </div>

          <Button type="button" onClick={handleSave} className="mt-3">
            Save Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleFrom;
