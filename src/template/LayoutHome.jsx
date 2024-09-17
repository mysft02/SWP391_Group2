import React from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "../components/Guest-HomePage/Guest-Header/GuestHeader";

const LayoutHome = () => {
  return (
    <div>
      <GuestHeader />
      <Outlet />
    </div>
  );
};

export default LayoutHome;
