import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

const DashboardLayout = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row">
        {/* Sidebar con posición fija */}
        <div
          className="col-3 col-md-2 p-0"
          style={{
            position: "fixed",   
            height: "100vh",      // Fija el sidebar para que ocupe toda la altura
            top: 0,               // Alineación superior
            left: 0,              // Alineación izquierda
            zIndex: 1000         // Asegura que el sidebar esté por encima del contenido
          }}
        >
          <SideBar />
        </div>

        {/* Contenido principal */}
        <div
          className="col-9 col-md-10 p-0"
          style={{
            marginLeft: "10%",    // Deja espacio para el sidebar (25% ya que el sidebar ocupa 25% del ancho)
          }}
        >
          <Outlet />  {/* Este es el espacio donde se renderizan las páginas hijas */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
