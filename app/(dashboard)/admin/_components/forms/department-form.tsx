"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditableImage from "./image-editable";
import { z } from "zod";
import { departmentSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { FaPlus } from "react-icons/fa6";

type DepartmentFormType = z.infer<typeof departmentSchema>;

type DepartmentFormProps = {
  onSubmit: (data: DepartmentFormType) => void;
};

const DepartmentForm = ({ onSubmit }: DepartmentFormProps) => {
  const form = useForm<DepartmentFormType>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      doctors: [],
      avatar: "",
    },
  });

  return (
    <div>
      <form
        className="border p-3 py-5 rounded-lg mb-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EditableImage
          link=""
          onChange={(link) => {
            form.setValue("avatar", link);
          }}
        />
        <div className="flex gap-2 my-2">
          <Input
            placeholder="Department Name"
            type="text"
            {...form.register("name")}
            className={cn("", {
              "border-red-500 outline-red-500": form.formState.errors.name,
            })}
          />
          <Button type="submit">
            <FaPlus />
          </Button>
        </div>
        <p className="text-xs text-red-500 font-semibold">
          {form.formState.errors.name && form.formState.errors.name.message}
        </p>
      </form>
    </div>
  );
};

export default DepartmentForm;
