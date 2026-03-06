const BASE_URL = "http://localhost:5294/api";

// 1. A Função Base que faz o trabalho sujo
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Aqui você pode buscar o token do localStorage, por exemplo:
  // const token = localStorage.getItem("auth_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    // "Authorization": token ? `Bearer ${token}` : "",
    ...options?.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Tratamento de Erros Genérico
  if (!response.ok) {
    // Aqui você pode disparar notificações globais de erro, deslogar o usuário se for 401, etc.
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Erro HTTP: ${response.status}`);
  }

  // Se a resposta for vazia (ex: um DELETE 204 No Content), evitamos o erro de parse do JSON
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

// 2. Os Métodos Expostos (O Mecanismo Genérico)
export const apiClient = {
  // GET: T é o tipo do retorno esperado
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  // POST: T é o retorno, U é o corpo (body) enviado
  post: <T, U>(endpoint: string, body: U, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  // PUT: T é o retorno, U é o corpo (body) enviado
  put: <T, U>(endpoint: string, body: U, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  // DELETE: T é o retorno (geralmente void ou boolean)
  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
