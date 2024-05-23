import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import DoctorCard, { DoctorCardProps } from "./doctor-card";

const DoctorSlider = ({ doctors }: { doctors: DoctorCardProps[] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full my-3"
    >
      <CarouselContent>
        {doctors.map((data, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
            <div className="p-1">
              <DoctorCard {...data} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default DoctorSlider;
