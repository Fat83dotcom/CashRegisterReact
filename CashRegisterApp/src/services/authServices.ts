import { notifications } from "@mantine/notifications";
import { apiClient } from "../api/api";
import type { ILoginProps } from "../pages/Login";
import React from "react";
import { IconCheck } from "@tabler/icons-react";
import type { ILoginResponse } from "../contexts/AuthContext";

export const AuthService = {
  login: async ({ email, password }: ILoginProps) =>
    apiClient
      .post<ILoginResponse, ILoginProps>("/auth", { email, password })
      .then((response) => {
        localStorage.setItem("user_data", JSON.stringify(response));
        notifications.show({
          title: "Sucesso",
          message: "Login efetuado com sucesso.",
          color: "green",
          autoClose: 5000,
          icon: React.createElement(IconCheck),
        });
        return response;
      }),
  logout: async () => {
    await apiClient.post("/auth/logout", {}, { silent: true }).catch(() => {
      console.warn("O cookie já estava expirado ou o backend inacessível.");
    });
    localStorage.removeItem("user_data");
  },
  verify: async () => {
    await apiClient.get<Response>("/auth/verify", { silent: true });
    return true;
  },
};
