"use client";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { doctorSchema, scheduleSchema } from "@/lib/schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppointment } from "@/context/appointmentContext";
import ScheduleFrom from "../../../_components/forms/schedule-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { getTimeIn12HourFormat } from "@/lib/utils";

type DoctorSchemaType = z.infer<typeof doctorSchema>;

type ScheduleSchemaType = z.infer<typeof scheduleSchema>;
type DepartmentalInformationProp = {
  form: UseFormReturn<DoctorSchemaType>;
};

const DepartmentalInformation = ({ form }: DepartmentalInformationProp) => {
  const { departmentList } = useAppointment();
  const [modalOpen, setModalOpen] = useState(false);
  const [scheduleList, setScheduleList] = useState<
    {
      days: ScheduleSchemaType["days"];
      timeslots: ScheduleSchemaType["timeslots"];
    }[]
  >([]);

  const handleUpdateSchedule = (schedule: {
    days: ScheduleSchemaType["days"];
    timeslots: ScheduleSchemaType["timeslots"];
  }) => {
    setScheduleList((pre) => {
      form.setValue("schedule", [...pre, schedule]);
      return [...pre, schedule];
    });
  };

  const handleScheduleDelete = (index: number) => {
    setScheduleList((pre) => {
      const newSchedule = pre.filter((_, i) => i !== index);
      form.setValue("schedule", newSchedule);
      return newSchedule;
    });
  };
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormField
        control={form.control}
        name="consultationFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Consaltation fee</FormLabel>
            <FormControl>
              <Input placeholder="Fee per meeting" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Department</FormLabel>
            <Select
              onValueChange={(value) => {
                form.setValue("department", value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a department form this list" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {departmentList.map((department) => (
                  <SelectItem key={department._id} value={department._id}>
                    {department?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Schedule</h2>
          <Button
            onClick={() => setModalOpen(true)}
            type="button"
            size={"icon"}
          >
            <FaPlus />
          </Button>
        </div>
        <div className="space-y-4">
          {scheduleList.map((schedule, index) => (
            <div key={index} className="grid grid-cols-2">
              <SingleSchedule
                schedule={schedule}
                onDelete={() => handleScheduleDelete(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <ScheduleFrom
        open={modalOpen}
        setOpen={setModalOpen}
        setSchedule={handleUpdateSchedule}
      />
    </motion.div>
  );
};

export default DepartmentalInformation;

type SingleScheduleProp = {
  schedule: {
    days: ScheduleSchemaType["days"];
    timeslots: ScheduleSchemaType["timeslots"];
  };
  onDelete: () => void;
};

const SingleSchedule = ({ schedule, onDelete }: SingleScheduleProp) => {
  const { days, timeslots } = schedule;
  const dayMap = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT",
  };

  return (
    <div className="space-y-2 shadow-md rounded-lg border px-3 py-3">
      <div className="flex gap-1 flex-wrap">
        {days.map((day) => (
          <span
            key={day}
            className="text-sm rounded-lg px-2 py-1 bg-blue-400 text-white"
          >
            {dayMap[day]}
          </span>
        ))}
      </div>
      <hr />
      <div className="flex gap-2 mt-4 flex-wrap">
        {timeslots.map((timeslot) => (
          <span
            key={timeslot.startTime}
            className="text-sm block p-1 border rounded-md"
          >
            {getTimeIn12HourFormat(timeslot.startTime)} -{" "}
            {getTimeIn12HourFormat(timeslot.endTime)}
          </span>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <Button onClick={onDelete} size={"icon"} variant={"destructive"}>
          <FaTrash />
        </Button>
      </div>
    </div>
  );
};
