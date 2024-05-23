"use client";
import { cn } from "@/lib/utils";
import { DashboardIcon } from "@radix-ui/react-icons";
import { ClassValue } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaPeopleGroup, FaStethoscope, FaUserDoctor } from "react-icons/fa6";

type SidebarItemProps = {
  href: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
};
const SidebarItem = ({ href, icon, label }: SidebarItemProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-4 py-3 transition-colors hover:bg-gray-100 rounded-full my-2",
        {
          "bg-gray-100 text-blue-500": pathname.startsWith(href),
        }
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

const Sidebar = ({ className }: { className?: ClassValue }) => {
  const sidebarItems: SidebarItemProps[] = [
    {
      href: "/dashboard",
      icon: <DashboardIcon />,
      label: "Dashboard",
    },
    {
      href: "/admin/doctors",
      icon: <FaUserDoctor />,
      label: "doctors",
    },
    {
      href: "/admin/departments",
      icon: <FaUserDoctor />,
      label: "departments",
    },
    {
      href: "/dashboard/appointments",
      icon: <FaStethoscope />,
      label: "Appointments",
    },
    {
      href: "/admin/users",
      icon: <FaPeopleGroup />,
      label: "Users",
    },
  ];
  return (
    <aside className={cn("w-72 border-r p-2", className)}>
      <div className="my-4 px-2">
        {sidebarItems.map((data) => (
          <SidebarItem {...data} key={data.href} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
