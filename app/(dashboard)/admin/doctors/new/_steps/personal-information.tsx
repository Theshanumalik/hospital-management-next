"use client";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { doctorSchema } from "@/lib/schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import EditableImage from "../../../_components/forms/image-editable";

type DoctorSchemaType = z.infer<typeof doctorSchema>;
type PersonalInformationProps = {
  form: UseFormReturn<DoctorSchemaType>;
};

const PersonalInformation = ({ form }: PersonalInformationProps) => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <EditableImage
        link={form.watch("avatar")}
        onChange={(link) => form.setValue("avatar", link)}
      />

      <div className="grid grid-cols-2 gap-2 justify-between">
        <div>
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firtname</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalInformation;
