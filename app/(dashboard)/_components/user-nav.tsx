"use client";
import Link from "next/link";
import { useState } from "react";
import { LogOut, UserIcon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const UserNav = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();

  const navLinks = [
    { name: "Profile", href: "/dashboard/profile" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  if (session.status === "unauthenticated" || session.status === "loading") {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border flex items-center gap-2 rounded-lg px-3 py-2">
        <UserIcon />
        Hi, {session.data?.user.name || session.data?.user.email}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 py-4 px-2">
        {navLinks.map((link) => (
          <DropdownMenuItem key={link.name} className="cursor-pointer">
            <Link href={link.href} key={link.name}>
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant={"link"}
            onClick={() => signOut({ callbackUrl: "/sign-in", redirect: true })}
            className="flex gap-2 hover:no-underline w-full justify-start text-left"
            size={"icon"}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
