import { IconCheck } from "@tabler/icons-react";
import { apiClient } from "../../../lib/api";
import type { ICreateUserResponse } from "../pages/Interfaces/ICreateUserResponse";
import type { ICreateUserRequest } from "../pages/Interfaces/ICreateUserRequest";
import type { ICreatePersonRequest } from "../../person/components/Interfaces/ICreatePersonRequest";
import type { IGetAllUsersResponse } from "../pages/Interfaces/IGetAllUsersResponse";
import type { IChangePasswordRequest } from "../../settings/pages/Interfaces/IChangePasswordRequest";
import { notifications } from "@mantine/notifications";
import React from "react";

export interface ISearchUserRequest {
  name?: string;
  taxId?: string;
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

export interface ICreateUserPayload {
  userRequest: ICreateUserRequest;
  personRequest?: ICreatePersonRequest;
}

export const UserService = {
  getAll: () => apiClient.get<IGetAllUsersResponse[]>("/user"),

  search: (params: ISearchUserRequest) => {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append("Name", params.name);
    if (params.taxId) queryParams.append("TaxId", params.taxId);
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

  create: (payload: ICreateUserPayload, resetForms: () => void) =>
    apiClient
      .post<ICreateUserResponse, ICreateUserPayload>("/user", payload)
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Usuário criado com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
          resetForms();
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
