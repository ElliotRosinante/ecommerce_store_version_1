import React from "react";
import {
  LocateIcon,
  PhoneCallIcon,
  MailIcon,
  LocateFixedIcon,
} from "lucide-react";
import Link from "next/link";

const TopNav = () => {
  const infos = [
    {
      label: "Location",
      value: "KNUST Kumasi Campus, Ghana",
      icon: <LocateFixedIcon size={14} />,
    },
    {
      label: "Phone",
      value: "+233 (0) 554223970",
      icon: <PhoneCallIcon size={14} />,
    },
    {
      label: "Email",
      value: "ernestakuoku12@gmail.com",
      icon: <MailIcon size={14} />,
    },
  ];

  return (
    <div className="w-full h-8 bg-black">
      <div className="flex justify-between items-center w-full h-full px-6 sm:px-8 lg:px-10">
        {infos.map((info) => (
          <Link
            key={info.label}
            href={info.label}
            className={
              "text-xs font-medium transition-colors text-white flex flex-row items-center"
            }
          >
            <span className="mr-2">{info.icon}</span>
            {info.value}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
