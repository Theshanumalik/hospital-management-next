import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { doctorSchema } from "@/lib/schema";
import { z } from "zod";
import { ClassValue } from "clsx";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import DoctorForm from "./forms/doctor-form";

type DoctorCardProps = {
  className?: ClassValue;
  _id: string;
  close: () => void;
};

type DoctorForm = z.infer<typeof doctorSchema>;

const DoctorTray = ({ _id, className, close }: DoctorCardProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["doctor", _id], async () => {
    const res = await axios.get(`/api/doctor/${_id}`);
    return res.data as DoctorForm;
  });
  const updateDoctor = useMutation({
    mutationKey: ["doctor", _id],
    mutationFn: async (values: DoctorForm) => {
      const res = await axios.put(`/api/doctor/${_id}`, values);
      return res.data as string;
    },
    onSuccess: (data, formData) => {
      queryClient.setQueryData(["doctor", _id], formData);
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
      toast.success(data as string);
    },
  });

  const handleClose = () => {
    close();
  };

  const handleUpdateForm = (values: DoctorForm) => {
    updateDoctor.mutate(values);
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <motion.div
      className={cn(
        "bg-white rounded-xl border shadow p-6 space-y-2 w-full",
        className
      )}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.1 }}
    >
      <div className="flex mb-6 items-center">
        <Button
          size={"icon"}
          variant={"secondary"}
          onClick={handleClose}
          className="rounded-full mr-2"
        >
          <ChevronLeft />
        </Button>
        <h3 className="text-lg grow">
          <span className="uppercase">Doctor Details</span>
        </h3>
      </div>

      {data && <DoctorForm data={data} onSubmit={handleUpdateForm} />}
    </motion.div>
  );
};

export default DoctorTray;
