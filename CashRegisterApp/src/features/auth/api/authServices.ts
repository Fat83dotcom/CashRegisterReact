import { notifications } from "@mantine/notifications";
import { apiClient } from "../../../lib/api";

import React from "react";
import { IconCheck } from "@tabler/icons-react";
import type { ILoginResponse } from "../contexts/AuthContext";
import type { LoginFormData } from "../schemas/loginSchema";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  errors?: any[];
}

export const AuthService = {
  login: async ({ userName, password }: LoginFormData) => {
    const response = await apiClient.post<ApiResponse<ILoginResponse>, LoginFormData>("/auth", { userName, password });
    
    if (response.success) {
      notifications.show({
        title: "Sucesso",
        message: "Login efetuado com sucesso.",
        color: "green",
        autoClose: 5000,
        icon: React.createElement(IconCheck),
      });
      return response.data;
    }
    throw new Error("Falha ao realizar login.");
  },

  me: async () => {
    // Para o /me, precisamos verificar se a API também foi adaptada ou se retorna apenas o objeto.
    // Assumindo que a API também retorna ApiResponse<ILoginResponse>
    const response = await apiClient.get<ApiResponse<ILoginResponse>>("/user/me");
    if (response.success) {
      return response.data;
    }
    throw new Error("Falha ao buscar usuário.");
  },

  logout: async () => {
    await apiClient.post("/auth/logout", {}, { silent: true }).catch(() => {
      console.warn("O cookie já estava expirado ou o backend inacessível.");
    });
  },
  verify: async () => {
    await apiClient.get<Response>("/auth/verify", { silent: true });
    return true;
  },
};
