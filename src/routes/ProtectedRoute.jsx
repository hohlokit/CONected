import { Navigate, Outlet } from "react-router-dom";
import { useAxiosInterceptors } from "../hooks/useAxiosInterceptors";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth_token");
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children ? children : <Outlet />;
};
