import React from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("authToken");
  return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
