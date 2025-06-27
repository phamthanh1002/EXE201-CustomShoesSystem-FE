// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  const isInitialized = useSelector((state) => state.auth.isInitialized);

  if (!isInitialized) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.roleName)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
