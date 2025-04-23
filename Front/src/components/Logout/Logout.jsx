import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { PublicRutes } from "../../routes/router";


const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to={PublicRutes.LOGIN} />;
};
export default Logout;