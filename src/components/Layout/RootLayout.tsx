import Image from "next/image";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  name: string | string[];
}
const RootLayout: React.FC<LayoutProps> = ({ children, name }) => {
  return (
    <div className="">
      <div className="flex justify-between bg-black/90 h-[80px] items-center px-10">
        <div className="text-4xl text-white">
          <Image
            src="/assets/logo_white.png"
            alt="logo"
            height={30}
            width={300}
            className="w-[100px]"
          />
        </div>
        <div className="text-xl text-white capitalize">{name}</div>
      </div>

      {children}

      <div className="text-white bg-black py-12 px-5 md:px-16">
        ©2024 Capsulemedia Crop. All rights reserved,
      </div>
    </div>
  );
};

export default RootLayout;
