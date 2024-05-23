"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";

type DepartmentCardProps = {
  _id: string;
  name: string;
  avatar?: string;
};

const DepartmentCard = ({ _id, name, avatar }: DepartmentCardProps) => {
  return (
    <div className="bg-white border rounded-lg p-4 relative aspect-square">
      <div className="flex flex-col items-center justify-center w-full h-full gap-3">
        <Image
          src={avatar || "/department.png"}
          width={70}
          height={70}
          alt="department"
          className="rounded-full object-cover aspect-square"
        />
        <div className="text-center">
          <Link href={`/admin/doctors?department=${_id}`}>
            <h2 className="text-base font-semibold capitalize">{name}</h2>
          </Link>
          <p className="text-gray-500 text-sm">Doctors: 5</p>
        </div>
      </div>
      <Button
        type="button"
        size={"icon"}
        variant={"destructive"}
        className="absolute top-1 right-1 p-1 rounded-full"
      >
        <FaTrash />
      </Button>
    </div>
  );
};

export default DepartmentCard;
