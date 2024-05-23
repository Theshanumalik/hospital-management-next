"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { appointmentSchema } from "@/lib/schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useAppointment } from "@/context/appointmentContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn, getTimeIn12HourFormat } from "@/lib/utils";
import { format } from "date-fns";
import { get } from "http";

type AppointmentSchemaType = z.infer<typeof appointmentSchema>;
type AppointmentDetailsProps = {
  form: UseFormReturn<AppointmentSchemaType>;
};

const AppointmentDetails = ({ form }: AppointmentDetailsProps) => {
  const {
    departmentList,
    setSelectedDepartment,
    doctorList,
    scheduleList,
    setAppointmentDate,
    setSelectedDoctor,
  } = useAppointment();
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Department</FormLabel>
            <Select
              onValueChange={(value) => {
                setSelectedDepartment(value);
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

      <FormField
        control={form.control}
        name="doctor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Doctor</FormLabel>
            <Select
              onValueChange={(value) => {
                setSelectedDoctor(value);
                form.setValue("doctor", value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a doctor from the list" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {doctorList.map((doctor) => (
                  <SelectItem key={doctor?._id} value={doctor?._id}>
                    {doctor?.firstname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="appointmentDate"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel>Date of meeting</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value) || new Date()}
                  onSelect={(date) => {
                    setAppointmentDate(date?.toISOString() ?? "");
                    form.setValue("appointmentDate", date?.toISOString() ?? "");
                  }}
                  disabled={(given) => {
                    const date = new Date(given);
                    const currentDate = new Date();
                    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
                    const yesterday = new Date(
                      currentDate.getTime() - oneDayInMilliseconds
                    );
                    const after7Days = new Date(
                      currentDate.getTime() + 7 * oneDayInMilliseconds
                    );

                    return date <= yesterday || date >= after7Days;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="timeslot"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Time</FormLabel>
            <Select
              onValueChange={(value) => {
                const { startTime, endTime } = JSON.parse(value);
                form.setValue("timeslot", { startTime, endTime });
              }}
              defaultValue={JSON.stringify(field.value)}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choose the time according to you confort" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {scheduleList?.timeslots?.map((schedule) => (
                  <SelectItem
                    key={schedule?._id}
                    value={JSON.stringify(schedule)}
                  >
                    {getTimeIn12HourFormat(schedule?.startTime)} -{" "}
                    {getTimeIn12HourFormat(schedule?.endTime)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

export default AppointmentDetails;
