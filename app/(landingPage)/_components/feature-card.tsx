import React from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};
const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="flex gap-3 items-center mb-4">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div className="">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
