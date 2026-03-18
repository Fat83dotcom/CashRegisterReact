import { createContext, useState, useContext, type ReactNode } from "react";
import { AuthService } from "../services/loginService";
import type { ILoginProps } from "../pages/Login";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: ILoginProps) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicia como falso, pois não sabemos se há um cookie válido ainda
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials: ILoginProps) => {
    // Se a chamada da API (que você configurou no AuthService) der sucesso,
    // o cookie HttpOnly será salvo automaticamente pelo navegador.
    await AuthService.login(credentials);

    // Avisamos o React que o usuário agora está autenticado!
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Aqui você também chamaria um endpoint no backend para invalidar o Cookie
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para facilitar o uso
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};
