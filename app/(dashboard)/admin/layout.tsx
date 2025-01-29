import RolePass from "@/components/layout/RolePass";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <RolePass role="admin">{children}</RolePass>
    </>
  );
};

export default layout;
