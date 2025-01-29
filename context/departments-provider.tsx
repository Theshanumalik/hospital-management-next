"use client";

import { DepartmentType } from "@/types";
import axios from "axios";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

type DepartmentContextType = {
  departments: DepartmentType[];
  isFetching: boolean;
};

const departmentContext = createContext<DepartmentContextType | undefined>(
  undefined
);

export const useDepartments = () => {
  const context = useContext(departmentContext);
  if (context === undefined) {
    throw new Error("useDepartments must be used within a DepartmentProvider");
  }
  return context;
};

export const DepartmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isFetching } = useQuery(["departments"], async () => {
    const res = await axios.get("/api/department");
    return res.data as DepartmentType[];
  });
  return (
    <departmentContext.Provider value={{ departments: data || [], isFetching }}>
      {children}
    </departmentContext.Provider>
  );
};
