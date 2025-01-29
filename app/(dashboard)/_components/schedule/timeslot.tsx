"use client";
import { Label } from "@/components/ui/label";
import { DayName } from "@/types";
import TimePicker from "./time-picker";
import { Button } from "@/components/ui/button";
import { Copy, Minus, Plus, X } from "lucide-react";
import { z } from "zod";
import { timeslotsSchema } from "@/lib/schema";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { dayNames } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TimeslotType = z.infer<typeof timeslotsSchema>;

type TimeslotProps = {
  day: DayName;
  values: TimeslotType[];
  onValueChange: (value: TimeslotType[]) => void;
  onCopy: (slots: TimeslotType[], days: DayName[]) => void;
  errors?:
    | Merge<
        FieldError,
        (Merge<FieldError, FieldErrorsImpl<TimeslotType>> | undefined)[]
      >
    | undefined;
};

const getNextSlot = (lastSlot: TimeslotType): TimeslotType => {
  return {
    startTime: lastSlot.endTime,
    endTime: "",
  };
};

const defaultSlot: TimeslotType = {
  startTime: "9:00am",
  endTime: "5:00pm",
};

const Timeslot = ({
  day,
  values,
  errors,
  onValueChange,
  onCopy,
}: TimeslotProps) => {
  const handleAdd = () => {
    const nextStot = getNextSlot(values[values.length - 1]);
    const newValues = [...values, nextStot];
    onValueChange(newValues);
  };
  const handleUpdate = (
    index: number,
    key: keyof TimeslotType,
    value: string
  ) => {
    const newValues = [...values];
    newValues[index][key] = value;
    onValueChange(newValues);
  };
  const handleDelete = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    onValueChange(newValues);
  };

  const handleCheck = (check: boolean) => {
    if (!check) {
      onValueChange([]);
    } else {
      onValueChange([defaultSlot]);
    }
  };
  return (
    <div
      className={cn("grid grid-cols-3 items-center gap-4", {
        "opacity-50": values.length === 0,
        "items-start": values.length > 1,
      })}
    >
      <div className="flex items-center">
        <Switch
          checked={values.length !== 0}
          onCheckedChange={(e) => handleCheck(e)}
          id={`day-switch-${day}`}
        />
        <Label
          className="capitalize font-normal ml-3"
          htmlFor={`day-switch-${day}`}
        >
          {day}
        </Label>
      </div>
      <div className="space-y-2 col-span-2">
        {values.map((value, index) => (
          <div key={index}>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <TimePicker
                  value={value.startTime}
                  onValueChange={(v) => handleUpdate(index, "startTime", v)}
                />
                <Minus />
                <TimePicker
                  value={value.endTime}
                  onValueChange={(v) => handleUpdate(index, "endTime", v)}
                />
              </div>
              <div className="grow flex items-center space-x-2 justify-start">
                {index === 0 ? (
                  <>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={handleAdd}
                      type="button"
                    >
                      <Plus size={16} />
                    </Button>
                    <CopyButton
                      days={dayNames}
                      onCopy={onCopy}
                      slots={values}
                    />
                  </>
                ) : (
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => handleDelete(index)}
                    type="button"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
              {errors && errors[index] && (
                <div>{JSON.stringify(errors[index], null, 2)}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Timeslot;

type CopyButtonProps = {
  days: DayName[];
  onCopy: (slots: TimeslotType[], days: DayName[]) => void;
  slots: TimeslotType[];
};

const CopyButton = ({ days, onCopy, slots }: CopyButtonProps) => {
  const [selectedDays, setSelectedDays] = useState<DayName[]>([]);
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer p-[.6rem] rounded-md bg-transparent transition-colors hover:bg-slate-100">
        <Copy size={16} />
      </PopoverTrigger>
      <PopoverContent className="max-w-40">
        <span className="text-sm font-semibold">Copy to:</span>
        {days.map((day) => (
          <div className="flex items-center my-2 gap-2" key={day}>
            <Checkbox
              id={day}
              checked={selectedDays.includes(day)}
              onCheckedChange={(e) => {
                if (e) {
                  setSelectedDays([...selectedDays, day]);
                } else {
                  setSelectedDays(selectedDays.filter((d) => d !== day));
                }
              }}
            ></Checkbox>
            <Label
              className="capitalize font-normal cursor-pointer"
              htmlFor={day}
            >
              {day}
            </Label>
          </div>
        ))}
        <Button
          onClick={() => {
            onCopy(slots, selectedDays);
            setSelectedDays([]);
          }}
          className="w-full mt-3"
          type="button"
        >
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  );
};
