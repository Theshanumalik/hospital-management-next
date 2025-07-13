"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  SquareDashed,
  User2Icon,
  Stethoscope,
  GroupIcon,
  HospitalIcon,
  Calendar,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import RolePass from "@/components/layout/RolePass";
import { Role } from "@/types";

const SidebarNav = () => {
  const pathname = usePathname();
  const sidebarItems = [
    {
      href: "/dashboard",
      icon: SquareDashed,
      label: "Dashboard",
      role: "all",
    },
    {
      href: "/admin/doctors",
      icon: User2Icon,
      label: "doctors",
      role: "admin",
    },
    {
      href: "/admin/departments",
      icon: HospitalIcon,
      label: "departments",
      role: "admin",
    },
    {
      href: "/doctor/appointments",
      icon: Stethoscope,
      label: "Appointments",
      role: "doctor",
    },
    {
      href: "/admin/users",
      icon: GroupIcon,
      label: "Users",
      role: "admin",
    },
    {
      href: "/doctor/schedule",
      icon: Calendar,
      label: "Schedule",
      role: "admin",
    },
  ];
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <RolePass key={item.label} role={item.role as Role}>
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span className="capitalize">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </RolePass>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
