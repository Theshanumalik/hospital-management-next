"use client";
import { useSession } from "next-auth/react";
import Welcome from "../_components/welcome";
import StatsList from "../_components/stats";

const DashboardPage = () => {
  const { data } = useSession();
  return (
    <div>
      <Welcome username={data?.user?.name} />
      <StatsList />
    </div>
  );
};

export default DashboardPage;
