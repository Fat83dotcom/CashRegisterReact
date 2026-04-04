import { IconCheck } from "@tabler/icons-react";
import { apiClient } from "../api/api";
import type { ICreatePersonRequest } from "../Components/Person/Interfaces/ICreatePersonRequest";
import type { ICreatePersonResponse } from "../Components/Person/Interfaces/ICreatePersonResponse";
import { notifications } from "@mantine/notifications";
import React from "react";

export const PersonService = {
  create: (data: ICreatePersonRequest, resetForm?: () => void) =>
    apiClient
      .post<ICreatePersonResponse, typeof data>("/person", data)
      .then((response) => {
        if (response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Pessoa cadastrada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
          if (resetForm) resetForm();
        }
        return response;
      }),

  getByEmail: (email: string) => apiClient.get<any>(`/person/email/${email}`),
  getByDocument: (document: string) => apiClient.get<any>(`/person/document/${document}`),
};
