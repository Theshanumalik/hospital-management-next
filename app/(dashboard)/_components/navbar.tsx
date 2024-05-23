"use client";
import React from "react";
import Wrapper from "@/components/layout/Wrapper";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa6";
import UserNav from "./user-nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";

const Navbar = () => {
  const [mount, setMount] = React.useState(false);
  React.useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <header>
      <Wrapper className="w-full px-6 max-w-none flex justify-between h-[70px] items-center border-b">
        <h1>Admin Panel</h1>
        <nav className="flex">
          <UserNav />
          <Sheet>
            <SheetTrigger>
              <Button variant={"ghost"} className="lg:hidden">
                <FaBars />
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <Sidebar className={"w-auto border-r-0 mt-3"} />
            </SheetContent>
          </Sheet>
        </nav>
      </Wrapper>
    </header>
  );
};

export default Navbar;
