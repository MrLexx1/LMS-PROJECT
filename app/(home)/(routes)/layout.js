import React from "react";
import SideBarNav from "./../_components/SideBarNav";
import Header from "./../_components/Header";

function homeLayout({ children }) {
  return (
    <div>
      <div className="h-full w-64 flex flex-col fixed inset-y-0 z-50 ">
        <SideBarNav />
      </div>
      <Header />
      <div className="ml-64 p-5">{children}</div>
    </div>
  );
}

export default homeLayout;
