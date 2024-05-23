import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

type TWrapper = {
  className?: ClassValue;
  children: React.ReactNode;
};

const Wrapper = ({ className, children }: TWrapper) => {
  return (
    <div>
      <div className={cn("mx-auto max-w-6xl p-2", className)}>{children}</div>
    </div>
  );
};

export default Wrapper;
