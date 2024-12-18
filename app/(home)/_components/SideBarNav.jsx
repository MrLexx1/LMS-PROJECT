"use client";
import { Layout, Mail, Search, Shield } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function SideBarNav() {
  const menuList = [
    {
      id: 1,
      name: "Browse",
      Icon: Search,
      path: "/browse",
    },
    {
      id: 2,
      name: "Dashboard",
      Icon: Layout,
      path: "/dashboard",
    },
    {
      id: 3,
      name: "Upgrade",
      Icon: Shield,
      path: "/upgrade",
    },
    {
      id: 4,
      name: "Newsletter",
      Icon: Mail,
      path: "/newsletter",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="h-full bg-white border-r flex-col overflow-y-auto shadow-md">
      <div className="p-5 border-b z-50">
        <Image src="logo.svg" width={170} height={100} alt="logo" />
      </div>
      <div className="flex flex-col">
        {menuList.map((item, index) => (
          <div
            key={index}
            className={`flex gap-2 items-center p-4 px-6 text-gray-500 hover:bg-gray-100 cursor-pointer ${
              activeIndex == index ? "bg-blue-50 text-blue-800" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <item.Icon />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBarNav;
