"use client";
import React from "react";
import Wrapper from "@/components/layout/Wrapper";
import UserNav from "./user-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = () => {
  const [mount, setMount] = React.useState(false);
  React.useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <header>
      <Wrapper className="w-full px-6 max-w-none flex justify-between h-[70px] items-center border-b bg-transparent">
        <SidebarTrigger />
        <UserNav />
      </Wrapper>
    </header>
  );
};

export default Navbar;
