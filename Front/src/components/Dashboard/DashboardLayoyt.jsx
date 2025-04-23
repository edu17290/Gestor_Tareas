import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

const DashboardLayout = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div
          className="col-3 col-md-2 p-0"
          style={{
            position: "fixed",   
            height: "100vh",      
            top: 0,               
            left: 0,              
            zIndex: 1000         
          }}
        >
          <SideBar />
        </div>

        <div
          className="col-9 col-md-10 p-0"
          style={{
            marginLeft: "10%",    
          }}
        >
          <Outlet />  
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
