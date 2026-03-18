import type React from "react";
import { Navigate } from "react-router-dom";

// Você pode colocar esse código em um arquivo separado, ex: src/components/ProtectedRoute.tsx
export const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  // Aqui você deve colocar a sua lógica real de verificação.
  // Pode ser checando o localStorage, um Context API, ou Redux.
  const token = localStorage.getItem("meu_token_jwt");
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    // Se não estiver logado, manda pro login e substitui o histórico (replace)
    // para o usuário não conseguir voltar clicando no botão de "Voltar" do navegador.
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza as rotas filhas normalmente
  return children;
};

interface IProtectedRouteProps {
  children: React.ReactNode;
}
