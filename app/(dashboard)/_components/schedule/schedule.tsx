"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dayNames } from "@/lib/constants";
import DayItem from "./day-item";

const Schedule = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
        <CardDescription>Manage your schedule and availability</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-3">
          {dayNames.map((day) => (
            <DayItem dayName={day} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Schedule;

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { timezones } from "@/lib/constants";
// import { scheduleSchema, timeslotsSchema } from "@/lib/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SaveIcon } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import Timeslot from "./timeslot";
// import { ScheduleProvider } from "./context";
// import { DayName } from "@/types";

// type ScheduleType = z.infer<typeof scheduleSchema>;

// type Timezone = (typeof timezones)[number];
// const timezoneOptions: {
//   [key in Timezone]: string;
// } = {
//   IST: "Indian Standard Time",
//   EST: "Eastern Standard Time",
//   CST: "Central Standard Time",
//   PST: "Pacific Standard Time",
//   GMT: "Greenwich Mean Time",
//   UTC: "Coordinated Universal Time",
// };

// type TimeslotType = z.infer<typeof timeslotsSchema>;

// const defaultSlot: TimeslotType = {
//   startTime: "9:00am",
//   endTime: "5:00pm",
// };
// const ScheduleForm = () => {
//   const form = useForm<ScheduleType>({
//     defaultValues: {
//       doctor: "",
//       bookingTimes: {
//         sunday: [],
//         monday: [defaultSlot],
//         tuesday: [defaultSlot],
//         wednesday: [defaultSlot],
//         thursday: [defaultSlot],
//         friday: [defaultSlot],
//         saturday: [],
//       },
//       timezones: "IST",
//     },
//     resolver: zodResolver(scheduleSchema),
//   });

//   const handleCopy = (slots: TimeslotType[], days: DayName[]) => {
//     days.forEach((day) => {
//       form.setValue(`bookingTimes.${day}`, slots);
//     });
//   };

//   console.log(form.formState.errors);
//   return (
//     <div className="p-6 bg-white shadow rounded-xl max-w-3xl">
//       <h1 className="font-semibold my-3 text-lg">Schedule</h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit((data) => console.log(data))}>
//           <FormField
//             control={form.control}
//             name="timezones"
//             render={({ field }) => (
//               <FormItem className="max-w-sm w-full">
//                 <FormLabel>Timezone</FormLabel>
//                 <Select
//                   onValueChange={(value) =>
//                     form.setValue("timezones", value as Timezone)
//                   }
//                   value={form.watch("timezones")}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a department form this list" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {Object.entries(timezoneOptions).map(([key, value]) => (
//                       <SelectItem key={key} value={key}>
//                         {value}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <ScheduleProvider interval={15}>
//             <div className="space-y-6 mt-6">
//               {Object.keys(form.watch("bookingTimes")).map((day) => (
//                 <Timeslot
//                   key={day}
//                   day={day as DayName}
//                   values={form.watch(`bookingTimes`)[day as DayName]}
//                   onValueChange={(v) =>
//                     form.setValue(`bookingTimes.${day as DayName}`, v)
//                   }
//                   onCopy={handleCopy}
//                   error={
//                     form.formState.errors.bookingTimes?.[day as DayName]
//                       ?.message
//                   }
//                 />
//               ))}
//             </div>
//           </ScheduleProvider>

//           <div className="mt-6">
//             <Button type="submit" size={"lg"}>
//               <SaveIcon size={16} className="mr-2" />
//               <span>Save Changes</span>
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default ScheduleForm;
