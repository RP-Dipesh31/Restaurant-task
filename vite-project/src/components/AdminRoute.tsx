import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  // Retrieve the user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // If no user is logged in or the role is not "admin", redirect
  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
