import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../routes/router";

const Header = () => {
  return (
    <>
    <div 
      className="d-flex text-white align-items-center justify-content-between rounded-top-4 p-2" 
      style={{ background: "#07145f", width: "100%"}}
    >
      <h1 className="m-1">Gestiona tus tareas</h1>
      <Link to={PrivateRoutes.USERINFO}>
        <FaUserCircle size={60} color="#8e94f3" className="m-1"/>
      </Link>
    </div>
    </>
  )
}
export default Header