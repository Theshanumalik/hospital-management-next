"use client";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/layout/Wrapper";
import { useForm } from "react-hook-form";
import { doctorSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormStep, useMultiStep } from "@/hooks/useMultiStep";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import PersonalInformation from "./_steps/personal-information";
import ContactInformation from "./_steps/contact-information";
import DepartmentalInformation from "./_steps/departmental-information";
import { MouseEventHandler } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ConsultationFormPage() {
  const form = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      firstname: "shanu",
      lastname: "malik",
      email: "s@gm.com",
      department: "",
      schedule: [],
      avatar: "",
      contactInfo: {
        address: "32, 3rd cross, 4th main, Bangalore",
        phoneNumber: "1234567890",
      },
      consultationFee: "",
    },
  });

  const formSteps: FormStep[] = [
    {
      label: "Personal Information",
      component: <PersonalInformation form={form} />,
      fields: ["firstname", "lastname", "avatar"],
    },
    {
      label: "Contact Information",
      component: <ContactInformation form={form} />,
      fields: ["email", "contactInfo.phoneNumber", "contactInfo.address"],
    },
    {
      label: "Departmental Information",
      component: <DepartmentalInformation form={form} />,
      fields: ["department", "consultationFee", "schedule"],
    },
  ];

  const multiStep = useMultiStep(formSteps);

  const onSubmit = (data: z.infer<typeof doctorSchema>) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("/api/doctor", data)
        .then((res) => {
          if (res.statusText === "ok") {
            resolve("Success!");
          } else {
            reject("An error occurred");
          }
        })
        .catch((error) => {
          reject(error?.message || "An error occurred");
        });
    });

    toast.promise(promise, {
      loading: "Please wait...",
      success: "Doctor added successfully! Redirecting...",
      error: (error) => error,
    });
  };

  const handleNext = () => {
    const fields = formSteps[multiStep.currentStepIndex].fields as Array<
      keyof z.infer<typeof doctorSchema>
    >;
    form.trigger(fields).then((isValid) => {
      if (isValid) {
        multiStep.next();
      }
    });
  };

  return (
    <Wrapper className="max-w-xl">
      <Card className="max-w-xl my-6">
        <CardHeader>
          <CardTitle className="text-lg flex gap-2 items-center justify-between">
            {multiStep.currentStep.label}
            <span className="text-sm">
              Step {multiStep.currentStepIndex + 1} of {formSteps.length}
            </span>
          </CardTitle>
          <CardDescription>
            Fill in the form to create a new doctor.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <AnimatePresence>
                {multiStep.currentStep.component}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between">
              {multiStep.isFirstStep ? (
                <Link href="/">Cancel</Link>
              ) : (
                <Button
                  variant="outline"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    multiStep.back();
                  }}
                >
                  <FaArrowLeft />
                </Button>
              )}
              {multiStep.isLastStep ? (
                <Button type="submit">Submit</Button>
              ) : (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  className="btn btn-primary"
                >
                  <FaArrowRight />
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </Wrapper>
  );
}
