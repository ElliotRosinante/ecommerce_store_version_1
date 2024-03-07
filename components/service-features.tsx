import React from "react";
import {
  BusIcon,
  Clock,
  ArrowDownLeftFromCircle,
  BanknoteIcon,
} from "lucide-react";

const ServiceFeatures = () => {
  const features = [
    {
      title: "Free Shipping",
      icon: <BusIcon />,
    },
    {
      title: "24/7 Support",
      icon: <Clock />,
    },
    {
      title: "100% Secure Payment",
      icon: <BanknoteIcon />,
    },
    {
      title: "30 Days Return",
      icon: <ArrowDownLeftFromCircle />,
    },
  ];

  return (
    <div className="w-full bg-gray-100  py-6">
      <div className="flex justify-around w-full h-full px-6 sm:px-8 lg:px-10">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center px-4">
            <div className="flex items-center justify-center rounded-full w-20 h-20 bg-gray-200 p-2 mb-2">
              {feature.icon}
            </div>
            <span className="text-sm font-bold">{feature.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFeatures;
