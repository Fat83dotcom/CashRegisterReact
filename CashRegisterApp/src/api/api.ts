import { notifications } from "@mantine/notifications";
import { IconExclamationCircle } from "@tabler/icons-react";
import React from "react";

const BASE_URL = "http://localhost:5294/api";

export interface ApiRequestOptions extends RequestInit {
  silent?: boolean;
}

async function request<T>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    const title = errorData?.Message || "Erro na requisição";

    let formattedMessage = `Ocorreu um erro inesperado (HTTP ${response.statusText}).`;

    if (
      errorData?.Errors &&
      Array.isArray(errorData.Errors) &&
      errorData.Errors.length > 0
    ) {
      formattedMessage = errorData.Errors.map(
        (e: any) => e.text || e.ErrorMessage || e,
      ).join(" \n ");
    } else if (errorData?.Message) {
      formattedMessage = errorData.Message;
    }
    if (!options?.silent) {
      notifications.show({
        title: title,
        message: formattedMessage,
        color: "red",
        autoClose: 5000,
        icon: React.createElement(IconExclamationCircle),
      });
    }
  }
  const text = await response.text();

  const data = text ? JSON.parse(text) : {};

  return data as T;
}

// 2. Os Métodos Expostos (O Mecanismo Genérico)
export const apiClient = {
  // GET: T é o tipo do retorno esperado
  get: <T>(endpoint: string, options?: ApiRequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  // POST: T é o retorno, U é o corpo (body) enviado
  post: <T, U>(endpoint: string, body: U, options?: ApiRequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  // PUT: T é o retorno, U é o corpo (body) enviado
  put: <T, U>(endpoint: string, body: U, options?: ApiRequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  // DELETE: T é o retorno (geralmente void ou boolean)
  delete: <T>(endpoint: string, options?: ApiRequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
