import React from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar className={"hidden lg:block py-4"} />
        <div className="flex-1 p-2 bg-gray-100 min-h-full overflow-x-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
