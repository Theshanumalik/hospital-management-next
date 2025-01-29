import { Card, CardTitle } from "@/components/ui/card";
import React from "react";
import { FaPlus } from "react-icons/fa6";

export type StatsItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const StatsItem = ({ icon, label, value }: StatsItemProps) => {
  return (
    <Card className="w-[250px] aspect-video p-4 flex flex-col justify-between">
      <span className="text-5xl font-semibold flex-1 flex gap-1 items-center">
        <FaPlus size={16} />
        {value}
      </span>
      <CardTitle className="flex gap-2 text-sm items-center text-gray-700 font-normal">
        {icon} {label}
      </CardTitle>
    </Card>
  );
};

export default StatsItem;
