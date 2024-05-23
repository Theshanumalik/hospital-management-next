import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authContext";
import { AppointmentProvider } from "@/context/appointmentContext";
import ProgressProvider from "@/components/layout/ProgressProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Management Site",
  description: "Hospital Management made easy.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppointmentProvider>
          <AuthProvider>
            <ProgressProvider>
              {children}
              <Toaster />
            </ProgressProvider>
          </AuthProvider>
        </AppointmentProvider>
      </body>
    </html>
  );
};

export default RootLayout;
