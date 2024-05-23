"use client";

import * as React from "react";

import axios from "axios";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaSpinner } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "@/lib/schema";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      email: "",
      isDoctor: false,
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });
  async function onSubmit(data: z.infer<typeof registerSchema>) {
    setIsLoading(true);
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
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to create an account
        </p>
      </div>
      <div className={cn("grid gap-6")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormControl>
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <Input
                        {...field}
                        placeholder="name@example.com"
                        disabled={isLoading}
                      />
                      <FormMessage className="px-2" />
                    </div>
                  </div>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormControl>
                  <div className="grid gap-2 my-2">
                    <div className="grid gap-1">
                      <Input
                        {...field}
                        placeholder="Password (min 8 characters)"
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
              name="isDoctor"
              render={({ field }) => (
                <FormControl>
                  <div className="flex items-center gap-2 px-2 my-2">
                    <Checkbox
                      id="isDoctor"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="border-gray-400"
                    />
                    <Label
                      className="text-sm text-muted-foreground"
                      htmlFor="isDoctor"
                    >
                      I am a doctor a registered doctor (optional)
                    </Label>
                  </div>
                </FormControl>
              )}
            />

            <Button disabled={isLoading} className="w-full">
              {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </div>
    </>
  );
};

export default RegisterPage;
