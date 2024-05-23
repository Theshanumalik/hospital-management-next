import Wrapper from "@/components/layout/Wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  return (
    <Wrapper className="h-28">
      <nav className="w-full h-full flex items-center justify-between">
        <h1>Manipal HM</h1>
        <nav className="hidden md:flex">
          <ul className="flex gap-3 text-gray-500">
            <Link href="#">
              <li>Home</li>
            </Link>
            <Link href="#">
              <li>About</li>
            </Link>
            <Link href="#">
              <li>Contact</li>
            </Link>
            <Link href="#">
              <li>Services</li>
            </Link>
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <Button size={"default"}>
            <Link href={"/appointment"}>Get Consultation</Link>
          </Button>
          <Button className="sm:hidden" size={"icon"} variant={"ghost"}>
            <FaBars size={20} />
          </Button>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;
