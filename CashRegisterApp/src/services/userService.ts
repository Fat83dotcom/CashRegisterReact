// src/services/userService.ts
import { apiClient } from "../api/api";
// Importamos a interface que criamos anteriormente
// Importamos a interface que criamos anteriormente
import type { IGetAllUsersResponse } from "../pages/User/Interfaces/IGetAllUsersResponse";

export const UserService = {
  // O TypeScript agora sabe magicamente que getAll vai retornar um array de GetAllUsersResponse
  getAll: () => apiClient.get<IGetAllUsersResponse[]>("/User"),

  // Exemplo para pegar um usuário por ID
  getById: (id: number) => apiClient.get<IGetAllUsersResponse>(`/users/${id}`),

  // Exemplo de criação (Note que omitimos o 'id' na criação)
  create: (data: Omit<IGetAllUsersResponse, "id">) =>
    apiClient.post<IGetAllUsersResponse, typeof data>("/users", data),

  // Exemplo de exclusão
  delete: (id: number) => apiClient.delete<void>(`/users/${id}`),
};
