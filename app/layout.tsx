import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth-context";
import { AppointmentProvider } from "@/context/appointmentContext";
import ProgressProvider from "@/components/layout/ProgressProvider";
import ReactQueryProvider from "@/context/react-query-context";
import { DepartmentProvider } from "@/context/departments-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Management Site",
  description: "Hospital Management made easy.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <DepartmentProvider>
            <AppointmentProvider>
              <AuthProvider>
                <ProgressProvider>
                  {children}
                  <Toaster />
                </ProgressProvider>
              </AuthProvider>
            </AppointmentProvider>
          </DepartmentProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
