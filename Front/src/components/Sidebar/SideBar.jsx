import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaRegUser, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../routes/router";
import { GrTasks } from "react-icons/gr";
import { FaHome } from "react-icons/fa";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsAuthOpen(false); 
  };

  const toggleAuthDropdown = () => {
    setIsAuthOpen(!isAuthOpen);
  };

  return (
    <div
      className={`d-flex flex-column ${isCollapsed ? "sidebar-collapsed" : ""}`}
      style={{
        width: isCollapsed ? "60px" : "170px",
        transition: "width 0.3s",
        height: "100vh",
        background: "#051158"
      }}
    >
      
      <button
        className="btn btn-success p-2"
        onClick={toggleSidebar}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          border: "none",
          background: "transparent",
          zIndex: 1000, 
        }}
      >
        <FaBars size={30} className="me-2"/>
        {!isCollapsed && <span className="ms-2 text-white">Task Manager</span>}
      </button>

      <ul className="list-unstyled m-0 p-0">
        
        <li className="sidebar-item">
          <Link to={PrivateRoutes.HOME} className="sidebar-link d-flex align-items-center p-3" style={{textDecoration:"none"}}>
            <FaHome size={20} color="#8e94f3"/>
            {!isCollapsed && <span className="ms-2 text-white">Dashboard</span>}
          </Link>
        </li>

        <li className="sidebar-item">
          <div
            className="sidebar-link d-flex align-items-center p-3"
            onClick={toggleAuthDropdown} 
            style={{ cursor: "pointer" }}
          >
            <GrTasks size={20} color="#8e94f3"/>
            {!isCollapsed && <span className="ms-2 text-white">Tareas</span>}
            {isAuthOpen ? (
              <FaCaretUp size={20} color="#8e94f3" className="ms-auto"/>
            ) : (
              <FaCaretDown size={20} color="#8e94f3" className="ms-auto"/>
            )}
          </div>
          
          <ul
            id="authDropdown"
            className={`collapse ms-3 list-unstyled ${isAuthOpen ? "show" : ""}`} 
            style={{
              opacity: isAuthOpen ? 1 : 0.8, 
              transition: "opacity 0.3s ease, box-shadow 0.3s ease", 
              boxShadow: isAuthOpen ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none", 
            }}
          >
            <li
              style={{
                backgroundColor: "#1e2b4a", 
                transition: "background-color 0.3s ease", 
              }}
              className="p-2"
            >
              <Link to={PrivateRoutes.NEWTASK} className="sidebar-link ms-4 text-white" style={{textDecoration:"none"}}>
                Crear Tarea
              </Link>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li><hr className="dropdown-divider" /></li>

            <li
              style={{
                backgroundColor: "#1e2b4a", 
                transition: "background-color 0.3s ease", 
              }}
              className="p-2"
            >
              <Link to={PrivateRoutes.LOGOUT} className="sidebar-link ms-4 text-white" style={{textDecoration:"none"}}>
                Vencidas
              </Link>
            </li>
          </ul>
        </li>

        <li className="sidebar-item">
          <div
            className="sidebar-link d-flex align-items-center p-3"
            onClick={toggleAuthDropdown} 
            style={{ cursor: "pointer" }}
          >
            <FaRegUser size={20} color="#8e94f3"/>
            {!isCollapsed && <span className="ms-2 text-white">Profile</span>}
            {isAuthOpen ? (
              <FaCaretUp size={20} color="#8e94f3" className="ms-auto"/>
            ) : (
              <FaCaretDown size={20} color="#8e94f3" className="ms-auto"/>
            )}
          </div>
          <ul
            id="authDropdown"
            className={`collapse ms-3 list-unstyled ${isAuthOpen ? "show" : ""}`} 
            style={{
              opacity: isAuthOpen ? 1 : 0.8, 
              transition: "opacity 0.3s ease, box-shadow 0.3s ease", 
              boxShadow: isAuthOpen ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none", 
            }}
          >
            <li
              style={{
                backgroundColor: "#1e2b4a", 
                transition: "background-color 0.3s ease", 
              }}
              className="p-2"
            >
              <Link to={PrivateRoutes.USERINFO} className="sidebar-link ms-4 text-white" style={{textDecoration:"none"}}>
                Personal Info
              </Link>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li><hr className="dropdown-divider" /></li>

            <li
              style={{
                backgroundColor: "#1e2b4a", 
                transition: "background-color 0.3s ease", 
              }}
              className="p-2"
            >
              <Link to={PrivateRoutes.LOGOUT} className="sidebar-link ms-4 text-white" style={{textDecoration:"none"}}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>

    </div>
  );
};

export default SideBar;