import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "admin@gmail.com",
  },
  {
    name: "Cody Fisher",
    title: "Product Directives Officer",
    department: "Intranet",
    role: "Patient",
    email: "cody@mail.com",
  },
  {
    name: "Esther Howard",
    title: "Forward Response Developer",
    department: "Directives",
    role: "Doctor",
    email: "ester@mail.com",
  },
  {
    name: "Jenny Wilson",
    title: "Central Security Manager",
    department: "Program",
    role: "Admin",
    email: "jenny@mail.cm",
  },
  {
    name: "Kristin Watson",
    title: "Human Research Architect",
    department: "Directives",
    role: "Patient",
    email: "kristin@sm.com",
  },
];

export function UsersList() {
  return (
    <Table>
      <TableCaption>A list of users in your hospital.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.title}</TableCell>
            <TableCell>{user.department}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
