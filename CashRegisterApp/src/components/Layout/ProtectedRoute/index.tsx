import { Navigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/contexts/AuthContext";
import { Center, Loader } from "@mantine/core";
import type { JSX } from "react";

export const ProtectedRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: string[];
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh" bg="gray.1">
        <Loader size="xl" type="bars" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
