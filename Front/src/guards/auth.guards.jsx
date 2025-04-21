import { Navigate, Outlet } from "react-router-dom";

import { useContext } from "react";
import { PublicRutes } from "../routes/router";
import { AuthContext } from "../context/auth.context";

export const AuthGuard = ({ privateValidation }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    privateValidation ? (
      <Outlet />
    ) : (
      <Navigate replace to="" />
    )
  ) : (
    <Navigate replace to={PublicRutes.LOGIN} />
  );
};

export default AuthGuard;