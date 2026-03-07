// src/services/userService.ts
import { apiClient } from "../api/api";
import type { ICreateUserResponse } from "../pages/User/Interfaces/ICreateUserResponse";
// Importamos a interface que criamos anteriormente
import type { ICreateUserRequest } from "../pages/User/Interfaces/ICreateUserRequest";
import type { IGetAllUsersResponse } from "../pages/User/Interfaces/IGetAllUsersResponse";

export const UserService = {
  getAll: () => apiClient.get<IGetAllUsersResponse[]>("/user"),

  getById: (id: number) => apiClient.get<IGetAllUsersResponse>(`/user/${id}`),

  create: (data: ICreateUserRequest) =>
    apiClient.post<ICreateUserResponse, typeof data>("/user", data),

  delete: (id: number) => apiClient.delete<void>(`/user/${id}`),
};
