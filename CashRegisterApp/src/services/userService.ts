import { IconCheck } from "@tabler/icons-react";
import { apiClient } from "../api/api";
import type { ICreateUserResponse } from "../pages/User/Interfaces/ICreateUserResponse";
import type { ICreateUserRequest } from "../pages/User/Interfaces/ICreateUserRequest";
import type { IGetAllUsersResponse } from "../pages/User/Interfaces/IGetAllUsersResponse";
import type { IChangePasswordRequest } from "../pages/Settings/Interfaces/IChangePasswordRequest";
import { notifications } from "@mantine/notifications";
import React from "react";

export interface ISearchUserRequest {
  name?: string;
  document?: string;
  birthDate?: string | Date;
  page?: number;
  pageSize?: number;
}

export interface IPagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const UserService = {
  getAll: () => apiClient.get<IGetAllUsersResponse[]>("/user"),

  search: (params: ISearchUserRequest) => {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append("Name", params.name);
    if (params.document) queryParams.append("Document", params.document);
    if (params.birthDate) {
      const date = params.birthDate instanceof Date 
        ? params.birthDate.toISOString() 
        : params.birthDate;
      queryParams.append("BirthDate", date);
    }
    if (params.page) queryParams.append("Page", params.page.toString());
    if (params.pageSize) queryParams.append("PageSize", params.pageSize.toString());

    return apiClient.get<IPagedResponse<IGetAllUsersResponse>>(`/user/search?${queryParams.toString()}`);
  },

  getById: (id: number) => apiClient.get<IGetAllUsersResponse>(`/user/${id}`),

  create: (data: ICreateUserRequest, resetForm: () => void) =>
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
          resetForm();
        }
      })
      .catch((e) => console.log(e)),

  delete: (id: number) => apiClient.delete<void>(`/user/${id}`),

  deactivate: (id: string | number) =>
    apiClient.put<number, {}>(`/user/disable/?userId=${id}`, {}),

  changePassword: (data: IChangePasswordRequest, resetForm: () => void) =>
    apiClient
      .put<void, typeof data>("/user/changePassword", data)
      .then(() => {
        notifications.show({
          title: "Sucesso",
          message: "Senha alterada com sucesso.",
          color: "green",
          autoClose: 5000,
          icon: React.createElement(IconCheck),
        });
        resetForm();
      })
      .catch((e) => console.log(e)),
};
