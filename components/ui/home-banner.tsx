import React from "react";
import Button from "./button";

const HomeBanner = () => {
  return (
    <div
      className="w-full flex relative px-4 sm:px-6 lg:px-8 bg-cover bg-no-repeat bg-center  z-0"
      style={{
        height: "calc(100vh - 64px)",
        backgroundImage: `url(https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
    >
      <div className=" w-full h-full flex flex-col justify-center items-center">
        <h1 className="font-Urbanist font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-transparent bg-clip-text text-center">
          Elevate Your Tech Experience
        </h1>
        <h1 className="font-Urbanist font-bold text-gray-100 text-center">
          Choose from a world of laptops!
        </h1>
        <Button className="flex items-center rounded-full bg-black px-10 py-4 mt-2">
          Shop now
        </Button>
      </div>
    </div>
  );
};

export default HomeBanner;
