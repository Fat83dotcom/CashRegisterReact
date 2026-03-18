import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth(); // Lê o estado em tempo real

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
