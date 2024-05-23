import Wrapper from "@/components/layout/Wrapper";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import Image from "next/image";
import imageSrc from "@/assets/doctor.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FeatureCard from "./feature-card";
import { FaC, FaKitMedical } from "react-icons/fa6";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Free Consultation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies, lorem a semper bibendum, purus nisi scelerisque enim.",
      icon: <FaKitMedical />,
    },
    {
      title: "24/7 Support",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies, lorem a semper bibendum, purus nisi scelerisque enim.",
      icon: <FaC />,
    },
    {
      title: "Secure Payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies, lorem a semper bibendum, purus nisi scelerisque enim.",
      icon: <FaC />,
    },
    {
      title: "Certified Doctors",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies, lorem a semper bibendum, purus nisi scelerisque enim.",
      icon: <FaC />,
    },
  ];
  return (
    <Wrapper>
      <section className="py-6 my-16 lg:flex gap-3 justify-between">
        <Image
          src={imageSrc}
          quality={60}
          className="w-5/12 hidden lg:block aspect-square object-cover rounded-xl shadow-lg"
          alt="Image Description"
        />
        <Card className="lg:w-6/12 border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl">Why Choose Us</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              ultricies, lorem a semper bibendum, purus nisi scelerisque enim.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </CardContent>
        </Card>
      </section>
    </Wrapper>
  );
};

export default WhyChooseUs;
