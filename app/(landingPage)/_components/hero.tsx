import Wrapper from "@/components/layout/Wrapper";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaHospital, FaUserDoctor } from "react-icons/fa6";
const Hero = () => {
  return (
    <Wrapper>
      <section className="flex flex-col gap-5 items-center mb-14">
        <div className="max-w-xl text-center">
          <h1 className="text-5xl my-2 font-semibold text-pretty">
            Better Health, Better Life
          </h1>
          <p className="my-4 text-gray-600 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui hic
            veritatis facilis distinctio debitis numquam dolores, rerum nihil ad
            accusantium{" "}
          </p>
          <div className="flex gap-2 items-center justify-center">
            <Button
              size={"lg"}
              className="flex gap-2  py-4 px-6 items-center justify-center"
            >
              <FaUserDoctor size={20} /> Get Consultation
            </Button>
            <Button
              size={"lg"}
              variant={"secondary"}
              className="flex gap-2  py-4 px-6 items-center justify-center"
            >
              <FaHospital size={20} /> Know More
            </Button>
          </div>
        </div>
      </section>
      <div className="max-w-4xl aspect-video bg-slate-900 rounded-lg shadow-md mx-auto"></div>
    </Wrapper>
  );
};

export default Hero;
