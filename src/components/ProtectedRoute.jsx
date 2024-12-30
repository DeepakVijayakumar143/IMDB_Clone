import React from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie"; // Or any cookie library you use

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("authToken"); // Replace 'authToken' with your cookie key
  return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
