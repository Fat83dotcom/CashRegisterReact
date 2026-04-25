import { notifications } from "@mantine/notifications";
import { apiClient } from "../../../lib/api";

import React from "react";
import { IconCheck } from "@tabler/icons-react";
import type { ILoginResponse } from "../contexts/AuthContext";
import type { LoginFormData } from "../schemas/loginSchema";

export const AuthService = {
  login: async ({ userName, password }: LoginFormData) =>
    apiClient
      .post<ILoginResponse, LoginFormData>("/auth", { userName, password })
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
