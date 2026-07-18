import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import { notifications } from "@mantine/notifications";
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
  userName: string;
  name: { firstName: string; lastName: string };
  role: string;
}

const AuthContext = createContext<IAuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<ILoginResponse | null>(null);

  const fetchUser = async () => {
    try {
      const response = await AuthService.me();
      if (response) {
        setUser(response);
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch {
      // Ignorar erros se o token já estiver inválido/expirado
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    // Listener Global para capturar 401s interceptados pelo apiClient
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, []);

  const login = async (credentials: LoginFormData) => {
    try {
      await AuthService.login(credentials);
      await fetchUser();
    } catch (error: any) {
      notifications.show({
        title: "Erro",
        message: error.response?.data?.message || "Falha ao realizar login.",
        color: "red",
        autoClose: 5000,
      });
      throw error;
    }
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
