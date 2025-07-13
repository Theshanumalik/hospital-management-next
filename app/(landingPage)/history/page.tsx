"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

const AppointmentLookup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setSearched(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - in a real app, this would come from an API
      const mockAppointments = [
        {
          id: 1,
          date: "2023-10-15",
          time: "10:00 AM",
          doctor: {
            name: "Dr. Sarah Johnson",
            specialty: "General Practitioner",
            avatar: "/doctors/dr-johnson.jpg",
          },
          reason: "Annual Checkup",
          status: "completed",
          notes: "Patient in good health. Recommended annual blood work.",
        },
        {
          id: 2,
          date: "2023-07-22",
          time: "2:30 PM",
          doctor: {
            name: "Dr. Michael Chen",
            specialty: "Cardiologist",
            avatar: "/doctors/dr-chen.jpg",
          },
          reason: "Heart palpitations",
          status: "completed",
          notes: "EKG normal. Suggested reducing caffeine intake.",
        },
        {
          id: 3,
          date: "2023-04-10",
          time: "9:15 AM",
          doctor: {
            name: "Dr. Emily Rodriguez",
            specialty: "Dermatologist",
            avatar: "/doctors/dr-rodriguez.jpg",
          },
          reason: "Skin rash",
          status: "completed",
          notes:
            "Prescribed topical cream. Follow-up in 2 weeks if no improvement.",
        },
      ];

      setAppointments(mockAppointments);
    } catch (err) {
      setError("Failed to fetch appointments. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "upcoming":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Find Your Appointments</CardTitle>
          <CardDescription>
            Enter your email address to view your previous appointment history
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline">Clear</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Find Appointments"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {searched && !isLoading && (
        <Card className="w-full mt-6">
          <CardHeader>
            <CardTitle>Your Appointment History</CardTitle>
            <CardDescription>
              {appointments.length > 0
                ? `${appointments.length} appointment(s) found`
                : "No appointments found for this email"}
            </CardDescription>
          </CardHeader>

          {appointments.length > 0 && (
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {formatDate(appointment.date)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={appointment.doctor.avatar} />
                            <AvatarFallback>
                              {appointment.doctor.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {appointment.doctor.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.doctor.specialty}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.reason}</TableCell>
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs">
                        {appointment.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};

export default AppointmentLookup;
