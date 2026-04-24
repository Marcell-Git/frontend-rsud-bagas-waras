import React from "react";
import { Navigate, Outlet } from "react-router";
import { getWithExpiry } from "../../utils/localStorageHelper";

const ProtectedRoute = () => {
  const token = getWithExpiry("token");
  const user = getWithExpiry("user");

  if (!token || !user) {
    // If no token or user info, redirect to login page
    return <Navigate to="/auth" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
