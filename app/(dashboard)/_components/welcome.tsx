import { Button } from "@/components/ui/button";
import React from "react";
import { FaStethoscope } from "react-icons/fa6";

const Welcome = ({ username }: { username: string | null | undefined }) => {
  return (
    <section className="shadow-sm p-4 rounded-lg bg-blue-600 text-white">
      <div>
        <h1 className="text-2xl my-3">Hey, {username}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          exercitationem saepe iure nam nostrum quae? Blanditiis officia earum
          cumque sint adipisci sit expedita laborum, praesentium fugit quis,
          autem ipsam consectetur.
        </p>
        <div className="my-3">
          <Button
            size={"lg"}
            className="flex gap-2 text-black"
            variant={"outline"}
          >
            <FaStethoscope /> Book an appointment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
