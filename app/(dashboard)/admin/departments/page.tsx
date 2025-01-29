"use client";
import React, { useEffect, useState } from "react";
import DepartmentForm from "../_components/forms/department-form";
import axios from "axios";
import DepartmentCard from "../_components/department-card";
import { z } from "zod";
import { departmentSchema } from "@/lib/schema";
import toast from "react-hot-toast";
import RolePass from "@/components/layout/RolePass";

type DepartmentListType = {
  _id: string;
  name: string;
  avatar: string;
};

const DepartmentsPage = () => {
  const [departmentList, setDepartmentList] = useState<DepartmentListType[]>(
    []
  );

  useEffect(() => {
    axios.get<DepartmentListType[]>("/api/department").then((res) => {
      setDepartmentList(res.data);
    });
  }, []);

  const onSubmit = (data: z.infer<typeof departmentSchema>) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post<DepartmentListType>("/api/department", data)
        .then((res) => {
          setDepartmentList((prev) => [...prev, res.data]);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(promise, {
      loading: "Creating Department...",
      success: "Department created successfully!",
      error: "Failed to create department!",
    });
  };
  return (
    <RolePass role="admin">
      <div className="p-3 bg-white max-w-2xl mx-auto rounded-lg px-4">
        <h1 className="font-semibold my-4">Departments</h1>
        <DepartmentForm onSubmit={onSubmit} />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {departmentList.map((department) => (
            <DepartmentCard key={department._id} {...department} />
          ))}
        </div>
      </div>
    </RolePass>
  );
};

export default DepartmentsPage;
