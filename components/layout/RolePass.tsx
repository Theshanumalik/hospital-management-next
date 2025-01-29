"use client";

import { useSession } from "next-auth/react";

type RolePassProps = {
  children: React.ReactNode;
  role: "moderator" | "admin" | "doctor" | "patient";
};

const RolePass = ({ children, role }: RolePassProps) => {
  const { data } = useSession();
  if (!data) return null;

  if (data.user.role === "admin") {
    return <>{children}</>;
  }
  if (data.user.role === role) {
    return <>{children}</>;
  }
  return null;
};

export default RolePass;
