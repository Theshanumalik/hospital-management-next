"use client";
import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { useSchedule } from "./context";

type TimePickerProps = {
  placeholder?: string;
  onValueChange: (value: string) => void;
  value?: string;
  className?: ClassValue;
};

const TimePicker = ({
  placeholder,
  onValueChange,
  value,
  className,
}: TimePickerProps) => {
  const { timeOptions } = useSchedule();
  const [selectedTime, setSelectedTime] = useState(value || "");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(selectedTime, 500);

  const [filteredOptions, setFilteredOptions] = useState(timeOptions);

  useEffect(() => {
    if (debouncedValue) {
      const filtered = timeOptions.filter((time) =>
        time.toLowerCase().startsWith(debouncedValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(timeOptions);
    }
  }, [debouncedValue, timeOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    onValueChange(e.target.value);
  };

  const handleSelect = (time: string) => {
    setSelectedTime(time);
    onValueChange(time);
    setOpen(false);
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current?.focus();
    }

    // Close dropdown on outside click
    const handleClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [selectedTime]);

  return (
    <div className={cn("relative max-w-36")}>
      <Input
        placeholder={placeholder}
        value={selectedTime}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        ref={inputRef}
        className={cn(className)}
      />
      {open && (
        <ul className="absolute z-10 w-full bg-white shadow rounded-xl mt-2 max-h-48 border overflow-y-auto p-2 space-y-1 no-scrollbar">
          {filteredOptions.map((time) => (
            <li
              key={time}
              className="cursor-pointer p-2 px-4 hover:bg-slate-100 rounded-lg"
              onClick={() => handleSelect(time)}
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimePicker;
