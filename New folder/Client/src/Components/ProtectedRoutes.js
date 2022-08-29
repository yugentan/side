import { Navigate, Outlet } from "react-router-dom";
import React from "react";
const useAuth = () => {
  const user = { isLoggedIn: Boolean(sessionStorage.getItem("JWT")) };
  return user && user.isLoggedIn;
};
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
