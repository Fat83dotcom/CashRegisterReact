import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Center, Loader } from "@mantine/core";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

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

  return children;
};
