"use client";

import { DoctorCardProps } from "@/types";
import React from "react";
import { Stethoscope } from "lucide-react";
import Image from "next/image";
import { useDepartments } from "@/context/departments-provider";
import { motion } from "framer-motion";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

const DoctorCard = ({
  _id,
  avatar,
  firstname,
  department,
  onClick,
  active,
}: DoctorCardProps & {
  onClick: (_id: string) => void;
  active?: boolean;
}) => {
  const { departments, isFetching } = useDepartments();
  return (
    <motion.div
      className={cn(
        "bg-white rounded-xl border shadow p-4 text-center space-y-2 hover:border-black cursor-pointer w-full max-w-44",
        { "border-black": active }
      )}
      onClick={() => onClick(_id)}
      layout="position"
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      {avatar ? (
        <Image
          src={avatar}
          alt={firstname}
          width={100}
          height={100}
          className="rounded-full object-cover block mx-auto aspect-square"
        />
      ) : (
        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
          <Stethoscope />
        </div>
      )}
      <h1 className="capitalize">{firstname}</h1>
      <p className="text-sm text-gray-600 border max-w-fit mx-auto px-3 capitalize py-1 rounded-xl grow">
        {departments.find((dep) => dep._id === department)?.name}
      </p>
    </motion.div>
  );
};

export default DoctorCard;
