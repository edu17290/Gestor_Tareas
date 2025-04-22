import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <>
    <div 
      className="d-flex text-white align-items-center justify-content-between rounded-top-4 p-2" 
      style={{ background: "#07145f", width: "100%"}}
    >
      <h1 className="m-1">Manage Your Tasks</h1>
      <FaUserCircle size={60} color="#8e94f3" className="m-1"/>
    </div>
    </>
  )
}
export default Header