import { useState, useCallback, useEffect } from "react";

export interface IPagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SearchParams {
  page: number;
  pageSize: number;
}

export function useSearch<T, TFilters>(
  searchFn: (params: TFilters & SearchParams) => Promise<IPagedResponse<T>>,
  initialFilters: TFilters
) {
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [pagedData, setPagedData] = useState<IPagedResponse<T>>({
    items: [],
    totalCount: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const handleSearch = useCallback(
    async (filters: TFilters, page = 1, pageSize = pagedData.pageSize) => {
      setLoading(true);
      try {
        const response = await searchFn({ ...filters, page, pageSize } as TFilters & SearchParams);
        setPagedData(response);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    },
    [searchFn, pagedData.pageSize]
  );

  // Busca inicial automática
  useEffect(() => {
    handleSearch(initialFilters);
  }, []);

  return {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
  };
}
