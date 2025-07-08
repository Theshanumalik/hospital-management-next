"use client";
import Link from "next/link";
import { useQuery } from "react-query";
import axios from "axios";
import { DoctorCardProps } from "@/types";
import DoctorCard from "../_components/doctor-card";
import { useState } from "react";
import DoctorTray from "../_components/doctor-tray";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AllDoctorsList = () => {
  const router = useRouter();
  const { isLoading, data } = useQuery(["doctor"], async () => {
    const res = await axios.get("/api/doctor");
    return res.data as DoctorCardProps[];
  });

  const [activeDoctor, setActiveDoctor] = useState<string>();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleActiveDoctor = (id: string) => {
    if (data === undefined) return;
    setActiveDoctor(id);
  };

  const handleDoctorTrayClose = () => {
    setActiveDoctor(undefined);
  };

  return (
    <div className="p-4 px-5 h-full w-full">
      <nav className="mb-3 flex justify-between items-center gap-4">
        <div className="flex gap-2 w-full max-w-xl">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="p-2"
            onClick={() => router.back()}
          >
            <ArrowLeft />
          </Button>
          <Input type="text" placeholder="Search" className="flex-1 bg-white" />
        </div>
        <Link
          href="/admin/doctors/new"
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md"
        >
          <Plus /> Doctor
        </Link>
      </nav>
      <AnimatePresence>
        <section className="flex gap-6 items-start overflow-hidden relative w-full">
          <motion.div
            className="grow flex-wrap gap-4 flex"
            layout={"size"}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            {data?.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                {...doctor}
                onClick={handleActiveDoctor}
                active={activeDoctor === doctor._id}
              />
            ))}
          </motion.div>
          {activeDoctor && (
            <div className="max-w-xl w-full">
              <DoctorTray _id={activeDoctor} close={handleDoctorTrayClose} />
            </div>
          )}
        </section>
      </AnimatePresence>
    </div>
  );
};

export default AllDoctorsList;
