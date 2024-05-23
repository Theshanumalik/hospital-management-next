"use client";

import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
type DepartmentType = {
  _id: string;
  name: string;
};

type DoctorType = {
  _id: string;
  firstname: string;
};

type ScheduleType = {
  _id: string;
  days: number[];
  timeslots: {
    _id: string;
    startTime: string;
    endTime: string;
  }[];
};

type AppointmentContextType = {
  departmentList: DepartmentType[];
  doctorList: DoctorType[];
  scheduleList: ScheduleType;
  setAppointmentDate: (date: string) => void;
  setSelectedDepartment: (departmentId: string) => void;
  setSelectedDoctor: (doctorId: string) => void;
};

const appointmentContext = createContext<AppointmentContextType | null>(null);

const AppointmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [departmentList, setDepartmentList] = useState<DepartmentType[]>([]);
  const [doctorList, setDoctorList] = useState<DoctorType[]>([]);
  const [scheduleList, setScheduleList] = useState<ScheduleType>({
    days: [],
    timeslots: [],
    _id: "",
  });
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    axios.get("/api/department").then((res) => {
      setDepartmentList(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      axios
        .get("/api/appointment/doctor", {
          params: { department: selectedDepartment },
        })
        .then((res) => {
          setDoctorList(res.data);
        });
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (appointmentDate && selectedDoctor) {
      axios
        .get("/api/appointment/slots", {
          params: { doctorId: selectedDoctor, appointmentDate },
        })
        .then((res) => {
          setScheduleList(res.data);
        });
    }
  }, [appointmentDate, selectedDoctor]);

  return (
    <appointmentContext.Provider
      value={{
        departmentList,
        doctorList,
        scheduleList,
        setAppointmentDate,
        setSelectedDepartment,
        setSelectedDoctor,
      }}
    >
      {children}
    </appointmentContext.Provider>
  );
};

const useAppointment = () => {
  const context = useContext(appointmentContext);
  if (!context) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider"
    );
  }
  return context;
};

export { appointmentContext, AppointmentProvider, useAppointment };
