import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UpcomingAppointments = () => {
  // Sample data - in a real app, this would come from an API
  const appointments = [
    {
      id: 1,
      patient: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah.jpg",
        initials: "SJ",
        age: 32,
        gender: "Female",
      },
      date: "2023-11-15",
      time: "09:30",
      duration: "30 min",
      reason: "Annual Checkup",
      status: "confirmed",
    },
    {
      id: 2,
      patient: {
        name: "Michael Chen",
        avatar: "/avatars/michael.jpg",
        initials: "MC",
        age: 45,
        gender: "Male",
      },
      date: "2023-11-15",
      time: "10:15",
      duration: "45 min",
      reason: "Diabetes Follow-up",
      status: "confirmed",
    },
    {
      id: 3,
      patient: {
        name: "Emily Rodriguez",
        avatar: "/avatars/emily.jpg",
        initials: "ER",
        age: 28,
        gender: "Female",
      },
      date: "2023-11-15",
      time: "11:30",
      duration: "30 min",
      reason: "Vaccination",
      status: "pending",
    },
    {
      id: 4,
      patient: {
        name: "David Wilson",
        avatar: "/avatars/david.jpg",
        initials: "DW",
        age: 60,
        gender: "Male",
      },
      date: "2023-11-16",
      time: "08:45",
      duration: "60 min",
      reason: "Hypertension Consultation",
      status: "confirmed",
    },
    {
      id: 5,
      patient: {
        name: "Jessica Lee",
        avatar: "/avatars/jessica.jpg",
        initials: "JL",
        age: 38,
        gender: "Female",
      },
      date: "2023-11-16",
      time: "14:00",
      duration: "30 min",
      reason: "Prescription Refill",
      status: "confirmed",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={appointment.patient.avatar} />
                      <AvatarFallback>
                        {appointment.patient.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{appointment.patient.name}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.patient.age} • {appointment.patient.gender}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-500">{appointment.time}</p>
                  </div>
                </TableCell>
                <TableCell>{appointment.duration}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                <TableCell className="text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Reschedule
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
