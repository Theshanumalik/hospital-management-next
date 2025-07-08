"use client";
import React from "react";
import Schedule from "../../_components/schedule/schedule";
import { useSession } from "next-auth/react";
import Leaves from "../../_components/schedule/leaves";

const SchedulePage = () => {
  const { data } = useSession();
  return (
    <div className="flex gap-6">
      <Schedule />
      <Leaves />
    </div>
  );
};

export default SchedulePage;
