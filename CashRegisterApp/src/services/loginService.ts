import { notifications } from "@mantine/notifications";
import { apiClient } from "../api/api";
import type { ILoginProps } from "../pages/Login";
import React from "react";
import { IconCheck } from "@tabler/icons-react";

export const AuthService = {
  login: ({ email, password }: ILoginProps) =>
    apiClient
      .post<Response, ILoginProps>("/auth", { email, password })
      .then((response) => {
        if (response.ok) {
          notifications.show({
            title: "Sucesso",
            message: "Login efetuado com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
          return response;
        }
      }),
};
