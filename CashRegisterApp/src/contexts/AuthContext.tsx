import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import { AuthService } from "../services/loginService";
import type { ILoginProps } from "../pages/Login";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // <-- NOVO
  login: (credentials: ILoginProps) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicia como falso, pois não sabemos se há um cookie válido ainda
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await AuthService.verify(); // Pergunta pro .NET
        setIsAuthenticated(true); // O cookie é válido!
      } catch {
        setIsAuthenticated(false); // O cookie expirou ou não existe
      } finally {
        setIsLoading(false); // Terminou a verificação, pode liberar a tela!
      }
    };

    checkSession();
  }, []);

  const login = async (credentials: ILoginProps) => {
    await AuthService.login(credentials);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
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
