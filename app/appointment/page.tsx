"use client";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/layout/Wrapper";
import { useForm } from "react-hook-form";
import { appointmentSchema } from "@/lib/schema";
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
import { useMultiStep } from "@/hooks/use-multi-step";
import PersonalInformation from "./_steps/personal-information";
import AppointmentDetails from "./_steps/appointment-details";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ContactInformation from "./_steps/contact-information";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function ConsultationFormPage() {
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "shanu malik",
      email: "shanu@gm.com",
      mobileNumber: "9876543210",
      appointmentDate: "",
      age: "12",
      address: "32, 3rd cross, 4th main, Bangalore",
      gender: "Male",
      department: "",
      doctor: "",
      timeslot: {
        startTime: "",
        endTime: "",
      },
    },
  });

  const formSteps = [
    {
      label: "Personal Information",
      component: <PersonalInformation form={form} />,
      fields: ["name", "gender", "age"],
    },
    {
      label: "Contact Information",
      component: <ContactInformation form={form} />,
      fields: ["email", "mobileNumber", "address"],
    },
    {
      label: "Appointment Details",
      component: <AppointmentDetails form={form} />,
      fields: ["appointmentDate", "appointmentTime"],
    },
  ];

  const multiStep = useMultiStep(formSteps);

  const onSubmit = (data: z.infer<typeof appointmentSchema>) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post<{ message: string }>("/api/appointment", data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error.response?.data);
        });
    });

    toast.promise(promise, {
      loading: "Creating appointment...",
      success: "Appointment created successfully",
      error: (error) => error,
    });
  };

  const handleNext = () => {
    const fields = formSteps[multiStep.currentStepIndex].fields as Array<
      keyof z.infer<typeof appointmentSchema>
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
            Fill out the form below to book a consultation
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
                <Link href="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
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
                  variant={"outline"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
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
