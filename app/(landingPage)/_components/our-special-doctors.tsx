import Wrapper from "@/components/layout/Wrapper";
import React from "react";
import imageSrc from "@/assets/doctor.jpg";
import DoctorSlider from "./doctor-slider";

const OurSpecialDoctors = () => {
  const doctors = [
    {
      name: "Dr. John Doe",
      speciality: "Cardiologist",
      avatar: imageSrc,
    },
    {
      name: "Dr. Jane Doe",
      speciality: "Dermatologist",
      avatar: imageSrc,
    },
    {
      name: "Dr. James Doe",
      speciality: "Neurologist",
      avatar: imageSrc,
    },
    {
      name: "Dr. Jennifer Doe",
      speciality: "Pediatrician",
      avatar: imageSrc,
    },
    {
      name: "Dr. Joseph Doe",
      speciality: "Gynecologist",
      avatar: imageSrc,
    },
  ];
  return (
    <Wrapper>
      <section>
        <h3 className="text-3xl font-semibold my-3">Our Special Doctors</h3>
        <p className="text-gray-500 my-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
          soluta necessitatibus accusamus nemo totam modi, blanditiis hic
          assumenda voluptate qui tempore voluptatibus maiores fugiat
          praesentium doloremque, quo excepturi explicabo? Vel?
        </p>
        <div>
          <DoctorSlider doctors={doctors} />
        </div>
      </section>
    </Wrapper>
  );
};

export default OurSpecialDoctors;
