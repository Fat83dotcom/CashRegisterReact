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

    let formattedMessage = `Ocorreu um erro inesperado (HTTP ${response.status}).`;

    // Suporte ao novo formato de notificações (Flunt/Custom)
    if (errorData?.errors && Array.isArray(errorData.errors)) {
      formattedMessage = errorData.errors
        .map((e: any) => {
          // Tenta extrair a propriedade e a mensagem suportando PascalCase e camelCase
          const property = e.property || e.Property || e.key || e.Key;
          const message = e.message || e.Message || e.text || e.Text;

          if (message) {
            return property ? `${property}: ${message}` : message;
          }
          
          // Fallback para strings simples ou objetos desconhecidos
          return typeof e === 'string' ? e : JSON.stringify(e);
        })
        .join(" \n ");
    } 
    // Suporte ao formato legado de exceções (FluentValidation/Custom)
    else if (errorData?.Errors && Array.isArray(errorData.Errors)) {
      formattedMessage = errorData.Errors.map((e: any) => {
        const message = e.text || e.ErrorMessage || e.Message || e;
        return typeof message === 'string' ? message : JSON.stringify(message);
      }).join(" \n ");
    } else if (errorData?.Message || errorData?.message) {
      formattedMessage = errorData.Message || errorData.message;
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
