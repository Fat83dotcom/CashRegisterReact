import type { LoaderFunctionArgs } from "react-router-dom";

/**
 * Fábrica genérica para Loaders de busca do React Router.
 * Extrai automaticamente 'page', 'pageSize' e outros filtros da URL.
 */
export function createSearchLoader<TFilters>(
  searchServiceFn: (params: TFilters & { page: number; pageSize: number }) => Promise<unknown>
) {
  return async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = Number(url.searchParams.get("pageSize") || 10);
    
    const filters: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      if (key !== "page" && key !== "pageSize") {
        filters[key] = value;
      }
    });

    return searchServiceFn({
      page,
      pageSize,
      ...filters,
    } as unknown as (TFilters & { page: number; pageSize: number }));
  };
}
