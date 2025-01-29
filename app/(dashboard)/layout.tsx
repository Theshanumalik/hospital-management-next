import React from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <div className="h-[calc(100vh-70px)]">
            <Navbar />
            <div className="flex-1 p-3 bg-gray-50 min-h-full overflow-x-auto">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
