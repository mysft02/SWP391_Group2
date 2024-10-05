import React from "react";
import { Outlet } from "react-router-dom";
import CustomerFooter from "../../components/Customer-Page/Customer-Footer/CustomerFooter";
import CustomerHeader from "../../components/Customer-Page/Customer-Header/CustomerHeader";


const MemeberLayout = () => {
  return (
    <div className="layout-home">
      <CustomerHeader/>
      <div className="main-content">
        <Outlet />
      </div>
      <CustomerFooter/>
    </div>
  );
};

export default MemeberLayout;
