import React from "react";
import StatsItem, { StatsItemProps } from "./stats-item";
import { FaPeopleGroup, FaStethoscope, FaUserDoctor } from "react-icons/fa6";

const StatsList = () => {
  const stats: StatsItemProps[] = [
    {
      icon: <FaUserDoctor />,
      label: "Doctors",
      value: "10",
    },
    {
      icon: <FaStethoscope />,
      label: "Appointments",
      value: "20",
    },
    {
      icon: <FaPeopleGroup />,
      label: "Users",
      value: "30",
    },
  ];

  return (
    <div className="bg-white p-4 my-3 rounded-lg">
      <h2 className="text-2xl my-3">Stats</h2>
      <p>Some important stats</p>
      <div className="flex gap-3 my-3 flex-wrap">
        {stats.map((data) => (
          <StatsItem {...data} key={data.label} />
        ))}
      </div>
    </div>
  );
};

export default StatsList;
