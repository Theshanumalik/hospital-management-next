import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import React from "react";

export type DoctorCardProps = {
  name: string;
  speciality: string;
  avatar: StaticImageData;
};
const DoctorCard = ({ name, speciality, avatar }: DoctorCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="">
        <Image
          src={avatar}
          quality={50}
          className="aspect-square w-full object-cover"
          alt="Doctor"
        />
        <div className="p-3">
          <h3 className="font-semibold my-1">{name}</h3>
          <p className="text-muted-foreground">{speciality}</p>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
