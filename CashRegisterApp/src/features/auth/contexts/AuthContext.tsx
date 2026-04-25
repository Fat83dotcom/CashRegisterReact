import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import { AuthService } from "../api/authServices";
import type { LoginFormData } from "../schemas/loginSchema";

interface IAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginFormData) => Promise<void>;
  logout: () => void;
  user: ILoginResponse | null;
}

export interface ILoginResponse {
  id: number;
  userName: { firstName: string; lastName: string };
  role: string;
}

const AuthContext = createContext<IAuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<ILoginResponse | null>(() => {
    const storedData = localStorage.getItem("user_data");
    return storedData ? JSON.parse(storedData) : null;
  });

  const checkSession = async () => {
    try {
      await AuthService.verify();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user_data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user_data");
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, []);

  const login = async (credentials: LoginFormData) => {
    await AuthService.login(credentials).then((response) => {
      setUser(response);
    });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
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
