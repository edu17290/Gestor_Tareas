import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";

const DashboardLayout = () => {

  const [showExpired, setShowExpired] = useState(false)

  return (
    <div className="container-fluid p-0"
      style={{
        backgroundImage: 'url(/assets/bg_dashboard.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed', 
        minHeight: '100vh',
        width: "100vw" 
      }}
    >
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
          <SideBar setShowExpired={setShowExpired}/>
        </div>

        <div
          className="col-9 col-md-10 p-0"
          style={{
            marginLeft: "10%",    
          }}
        >
          <Outlet context={{ showExpired, setShowExpired }}/>  
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
