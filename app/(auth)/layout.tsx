import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Hospital Management",
  description: "Register for a new account in Hospital Management system",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 hidden md:block w-1/2 h-screen">
        <h2>Hospital Management</h2>
      </div>
      <div className="h-screen w-full md:w-1/2 relative">
        <div className="absolute -translate-x-1/2 p-4 -translate-y-1/2 top-1/2 left-1/2 max-w-md w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
