import React from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "../../components/Guest-HomePage/Guest-Header/GuestHeader";
import GuestFooter from "../../components/Guest-HomePage/Guest-Footer/GuestFooter";
import './LayoutHome.css'; // Nếu cần CSS

const LayoutHome = () => {
  return (
    <div className="layout-home">
      <GuestHeader />
      <div className="main-content">
        <Outlet />
      </div>
      <GuestFooter/>
    </div>
  );
};

export default LayoutHome;
