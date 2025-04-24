import React, { useState } from "react";
import { FaBars, FaRegUser, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../routes/router";
import { GrTasks } from "react-icons/gr";
import { FaHome } from "react-icons/fa";

const SideBar = ({ setShowExpired }) => {
  const [isTareasOpen, setIsTareasOpen] = useState(false);  
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsTareasOpen(false);  
    setIsProfileOpen(false);
  };

  const toggleTareasDropdown = () => {
    setIsTareasOpen(!isTareasOpen);  
    setIsProfileOpen(false);  
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);  
    setIsTareasOpen(false); 
  };

  const handleExpired = () => {
    setShowExpired(true);
  };

  return (
    <div
      className={`d-flex flex-column ${isCollapsed ? "sidebar-collapsed" : ""}`}
      style={{
        width: isCollapsed ? "60px" : "170px",
        transition: "width 0.3s",
        height: "100vh",
        background: "#051158",
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
        <FaBars size={30} className="me-2" />
        {!isCollapsed && <span className="ms-2 text-white">Task Manager</span>}
      </button>

      <ul className="list-unstyled m-0 p-0">
        
        <li className="sidebar-item">
          <Link
            to={PrivateRoutes.HOME}
            className="sidebar-link d-flex align-items-center p-3"
            style={{ textDecoration: "none" }}
            onClick={() => setShowExpired(false)}
          >
            <FaHome size={20} color="#8e94f3" />
            {!isCollapsed && <span className="ms-2 text-white">Dashboard</span>}
          </Link>
        </li>

        {/* ITEMS DE TAREAS */}
        <li className="sidebar-item">
          <div
            className="sidebar-link d-flex align-items-center p-3"
            onClick={toggleTareasDropdown}
            style={{ cursor: "pointer" }}
          >
            <GrTasks size={20} color="#8e94f3" />
            {!isCollapsed && <span className="ms-2 text-white">Tareas</span>}
            {isTareasOpen ? (
              <FaCaretUp size={20} color="#8e94f3" className="ms-auto" />
            ) : (
              <FaCaretDown size={20} color="#8e94f3" className="ms-auto" />
            )}
          </div>

          <ul
            id="authDropdown"
            className={`collapse ms-3 list-unstyled ${isTareasOpen ? "show" : ""}`}
            style={{
              opacity: isTareasOpen ? 1 : 0.8,
              transition: "opacity 0.3s ease, box-shadow 0.3s ease",
              boxShadow: isTareasOpen ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
            }}
          >
            <li
              style={{
                backgroundColor: "#1e2b4a",
                transition: "background-color 0.3s ease",
              }}
              className="p-2"
            >
              <Link
                to={PrivateRoutes.NEWTASK}
                className="sidebar-link ms-4 text-white"
                style={{ textDecoration: "none" }}
              >
                Crear Tarea
              </Link>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li
              style={{
                backgroundColor: "#1e2b4a",
                transition: "background-color 0.3s ease",
              }}
              className="p-2"
            >
              <Link
                to={PrivateRoutes.HOME}
                className="sidebar-link ms-4 text-white"
                style={{ textDecoration: "none" }}
                onClick={handleExpired}
              >
                Vencidas
              </Link>
            </li>
          </ul>
        </li>

        {/* ITEMS DE PERFIL */}
        <li className="sidebar-item">
          <div
            className="sidebar-link d-flex align-items-center p-3"
            onClick={toggleProfileDropdown}
            style={{ cursor: "pointer" }}
          >
            <FaRegUser size={20} color="#8e94f3" />
            {!isCollapsed && <span className="ms-2 text-white">Perfil</span>}
            {isProfileOpen ? (
              <FaCaretUp size={20} color="#8e94f3" className="ms-auto" />
            ) : (
              <FaCaretDown size={20} color="#8e94f3" className="ms-auto" />
            )}
          </div>

          <ul
            id="authDropdown"
            className={`collapse ms-3 list-unstyled ${isProfileOpen ? "show" : ""}`}
            style={{
              opacity: isProfileOpen ? 1 : 0.8,
              transition: "opacity 0.3s ease, box-shadow 0.3s ease",
              boxShadow: isProfileOpen ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
            }}
          >
            <li
              style={{
                backgroundColor: "#1e2b4a",
                transition: "background-color 0.3s ease",
              }}
              className="p-2"
            >
              <Link
                to={PrivateRoutes.USERINFO}
                className="sidebar-link ms-4 text-white"
                style={{ textDecoration: "none" }}
              >
                Personal Info
              </Link>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li
              style={{
                backgroundColor: "#1e2b4a",
                transition: "background-color 0.3s ease",
              }}
              className="p-2"
            >
              <Link
                to={PrivateRoutes.LOGOUT}
                className="sidebar-link ms-4 text-white"
                style={{ textDecoration: "none" }}
              >
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
