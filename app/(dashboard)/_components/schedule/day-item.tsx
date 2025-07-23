import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { dayNames } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { DayName } from "@/types";
import { Popover } from "@radix-ui/react-popover";
import { ClassValue } from "clsx";
import { Copy, Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type DayItemProps = {
  className?: ClassValue;
  dayName: DayName;
  disable?: boolean;
};

const DayItem = ({ className, dayName, disable }: DayItemProps) => {
  const [count, setCount] = useState(15);
  const [isDisable, setIsDisable] = useState(disable);

  return (
    <div
      className={cn("flex items-center justify-between w-full", className, {
        "text-gray-300": isDisable,
      })}
    >
      <div className="flex items-center gap-2">
        <Switch
          id={dayName}
          onCheckedChange={(e) => {
            setIsDisable(!e);
            setCount(e ? 1 : 0);
          }}
          checked={!isDisable}
        />
        <label htmlFor={dayName} className="capitalize cursor-pointer">
          {dayName}
        </label>
      </div>
      {!isDisable ? (
        <div className="flex items-center gap-5">
          <BookingCount count={count} setCountValue={setCount} />

          <CopyButton
            count={count}
            onCopy={(selctedDays, count) => {
              alert("copying data");
            }}
          />
        </div>
      ) : (
        <span>unavailable</span>
      )}
    </div>
  );
};

export default DayItem;

type BookingCountProps = {
  count: number;
  setCountValue: Dispatch<SetStateAction<number>>;
};

const BookingCount = ({ count, setCountValue }: BookingCountProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        size={"icon"}
        variant={"default"}
        type="button"
        onClick={() => {
          setCountValue((prev) => prev - 1);
        }}
      >
        <Minus />
      </Button>
      <Input
        className="w-14 border-gray-600 text-center"
        type="tel"
        value={count}
        onChange={(e) => {
          setCountValue(parseInt(e.target.value));
        }}
      />
      <Button
        size={"icon"}
        variant={"default"}
        onClick={() => {
          setCountValue((prev) => prev + 1);
        }}
      >
        <Plus />
      </Button>
    </div>
  );
};

type CopyButtonProps = {
  onCopy: (selectedDays: DayName[], count: number) => void;
  count: number;
};

const CopyButton = ({ onCopy, count }: CopyButtonProps) => {
  const [selectedDays, setSelectedDays] = useState<DayName[]>([]);
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer p-[.6rem] rounded-md bg-transparent transition-colors hover:bg-slate-100">
        <Copy size={16} />
      </PopoverTrigger>
      <PopoverContent className="max-w-52">
        <span className="text-xs text-gray-400">COPY TO:</span>
        {dayNames.map((day) => (
          <div
            className="flex items-center my-2 gap-2"
            key={`copy-button-${day}-key`}
          >
            <Checkbox
              id={`copy-button-${day}`}
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
              htmlFor={`copy-button-${day}`}
            >
              {day}
            </Label>
          </div>
        ))}
        <Button
          onClick={() => {
            onCopy(selectedDays, count);
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
