"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { FaSortDown, FaUserLarge } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";

const UserNav = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();

  console.log(session);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="border rounded-md flex gap-2 items-center"
        >
          <FaUserLarge />
          Hi, Shanu
          <FaSortDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 py-4 px-2">
        <DropdownMenuLabel>view profile</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/logout">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
