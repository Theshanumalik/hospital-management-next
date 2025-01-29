"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { doctorSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save, Loader } from "lucide-react";
import EditableImage from "../forms/image-editable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDepartments } from "@/context/departments-provider";
import { zodResolver } from "@hookform/resolvers/zod";

type DoctorFormData = z.infer<typeof doctorSchema>;

type DoctorFormProps = {
  data: DoctorFormData;
  onSubmit: (values: DoctorFormData) => void;
};

const DoctorForm = ({ data, onSubmit }: DoctorFormProps) => {
  const { departments } = useDepartments();
  const form = useForm<DoctorFormData>({
    defaultValues: {
      firstname: data.firstname,
      lastname: data.lastname,
      department: data.department,
      email: data.email,
      consultationFee: data.consultationFee?.toString(),
      avatar: data.avatar,
      contactInfo: {
        address: data.contactInfo?.address,
        phoneNumber: data.contactInfo?.phoneNumber,
      },
    },
    resolver: zodResolver(doctorSchema),
  });

  const handleSubmit = (values: DoctorFormData) => {
    onSubmit(values);
    form.reset({ ...values }, { keepDirty: false });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <EditableImage
          link={form.watch("avatar")}
          onChange={(e) => form.setValue("avatar", e, { shouldDirty: true })}
          className="place-items-start"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@abc.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {departments && (
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Department</FormLabel>
                <Select
                  onValueChange={(value) => {
                    form.setValue("department", value, { shouldDirty: true });
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department form this list" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((department) => (
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
        )}
        <FormField
          control={form.control}
          name="consultationFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consultation Fee</FormLabel>
              <FormControl>
                <Input
                  placeholder="1000"
                  {...field}
                  onChange={(e) =>
                    form.setValue(
                      "consultationFee",
                      e.target.value.toString(),
                      { shouldDirty: true }
                    )
                  }
                />
              </FormControl>
              <FormDescription>Fee in INR</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactInfo.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123, Example Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactInfo.phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" size={"lg"} disabled={!form.formState.isDirty}>
            {form.formState.isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <Save size={16} className="mr-1" />
            )}{" "}
            Save Changes
          </Button>
          <Button
            variant={"destructive"}
            size={"lg"}
            type="button"
            onClick={() => form.reset()}
            disabled={!form.formState.isDirty}
          >
            <RotateCcw size={16} className="mr-1" /> Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DoctorForm;
