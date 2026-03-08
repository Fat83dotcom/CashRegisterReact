import { IconCheck } from "@tabler/icons-react";
import { apiClient } from "../api/api";
import type { ICreateUserResponse } from "../pages/User/Interfaces/ICreateUserResponse";
// Importamos a interface que criamos anteriormente
import type { ICreateUserRequest } from "../pages/User/Interfaces/ICreateUserRequest";
import type { IGetAllUsersResponse } from "../pages/User/Interfaces/IGetAllUsersResponse";
import { notifications } from "@mantine/notifications";
import React from "react";

export const UserService = {
  getAll: () => apiClient.get<IGetAllUsersResponse[]>("/user"),

  getById: (id: number) => apiClient.get<IGetAllUsersResponse>(`/user/${id}`),

  create: (data: ICreateUserRequest) =>
    apiClient
      .post<ICreateUserResponse, typeof data>("/user", data)
      .then((response) => {
        if (response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Usuário criado com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
      }),

  delete: (id: number) => apiClient.delete<void>(`/user/${id}`),
};
