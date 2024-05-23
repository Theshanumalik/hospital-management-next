"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  FaCircleDot,
  FaEllipsisVertical,
  FaPen,
  FaPlus,
  FaUserDoctor,
} from "react-icons/fa6";
import { useFetch } from "@/hooks/useFetch";
import { getFullName } from "@/lib/utils";
import Link from "next/link";

type Doctor = {
  _id: string;
  firstname: string;
  lastname?: string;
  department: string;
  role: string;
  email: string;
};

const AllDoctorsList = () => {
  const doctors = useFetch<Doctor[]>("/api/doctor");

  if (doctors.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 px-5 h-full">
      <header className="flex justify-between my-6">
        <h1 className="text-lg flex gap-2 items-center">
          <FaUserDoctor size={24} /> Doctors List
        </h1>
        <div>
          <Link
            href="/admin/doctors/new"
            className="bg-blue-500 flex text-white items-center gap-2 px-4 py-2 rounded-md ps-3 hover:bg-blue-600 transition-colors"
          >
            <FaPlus /> New Doctor
          </Link>
        </div>
      </header>
      <section>
        <Table>
          <TableCaption>Doctors Available in the Hospital</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors?.data?.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell>{doctor._id}</TableCell>
                <TableCell>
                  {getFullName(doctor.firstname, doctor.lastname)}
                </TableCell>
                <TableCell>{doctor.department}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="rounded-md h-10 w-10"
                      >
                        <FaEllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link
                            href={"/admin/doctors/edit/" + doctor._id}
                            className="flex items-center gap-2"
                          >
                            <FaPen /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button className="flex items-center gap-2">
                            <FaCircleDot className="text-green-500" /> Activate
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button className="flex items-center gap-2">
                            <FaCircleDot className="text-red-500" /> Deactivate
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <button className="flex items-center gap-2">
                            <FaCircleDot className="text-red-500" /> Delete
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default AllDoctorsList;
