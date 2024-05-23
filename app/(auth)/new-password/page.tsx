"use client";

import * as React from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaSpinner } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";

const setPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});
const NewPasswordPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(setPasswordSchema),
  });
  async function onSubmit(data: z.infer<typeof setPasswordSchema>) {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    console.log(data);
    try {
      const res = await axios.post("/api/auth/register", data);

      if (res.status === 201) {
        toast.success("Verification email sent!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col my-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Set New Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below
        </p>
      </div>
      <div className={cn("grid gap-6")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormControl>
                  <div className="grid gap-2 mb-2">
                    <div className="grid gap-1">
                      <Input
                        {...field}
                        placeholder="password (min 8 characters)"
                        disabled={isLoading}
                        type="password"
                      />
                      <FormMessage className="px-2" />
                    </div>
                  </div>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormControl>
                  <div className="grid gap-2 mb-2">
                    <div className="grid gap-1">
                      <Input
                        {...field}
                        type="password"
                        placeholder="confirm password (should match above password)"
                        disabled={isLoading}
                      />
                      <FormMessage className="px-2" />
                    </div>
                  </div>
                </FormControl>
              )}
            />
            <Button disabled={isLoading} className="w-full">
              {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Set Password
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default NewPasswordPage;
