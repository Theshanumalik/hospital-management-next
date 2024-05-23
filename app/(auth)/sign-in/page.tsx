"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaSpinner } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/lib/schema";
import { z } from "zod";

const SignInPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    const promise = new Promise((resolve, reject) => {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard",
      })
        .then((res) => {
          if (res?.error) {
            reject("Invalid credentials");
          } else {
            location.href = res?.url || "/dashboard";
            resolve("Success!");
          }
        })
        .catch((error) => {
          reject(error?.message || "An error occurred");
        })
        .finally(() => {
          setIsLoading(false);
        });
    });

    toast.promise(promise, {
      loading: "Please wait...",
      success: "Logged in successfully! Redirecting...",
      error: (error) => error,
    });
  }

  return (
    <>
      <div className="flex flex-col my-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome Back! 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign in
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
                        placeholder="Password"
                        disabled={isLoading}
                        type="password"
                      />
                      <FormMessage className="px-2" />
                    </div>
                  </div>
                </FormControl>
              )}
            />
            <Button disabled={isLoading} className="w-full">
              {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Go to Dashboard
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

export default SignInPage;
