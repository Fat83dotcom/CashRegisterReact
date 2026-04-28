import { useState, useCallback, useEffect } from "react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import React from "react";

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

export interface DeactivateOptions<T> {
  action: (id: string | number) => Promise<any>;
  title?: string;
  confirmLabel?: string;
  color?: string;
  successMessage?: string;
  renderContent: (item: T) => React.ReactNode;
}

export function useSearch<T, TFilters>(
  searchFn: (params: TFilters & SearchParams) => Promise<IPagedResponse<T>>,
  initialFilters: TFilters,
  deactivateOptions?: DeactivateOptions<T>
) {
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  
  const [currentFilters, setCurrentFilters] = useState<TFilters>(initialFilters);

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
      setCurrentFilters(filters);
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

  const performDeactivate = useCallback(async (id: string | number) => {
    if (!deactivateOptions) return;
    setLoading(true);
    try {
      await deactivateOptions.action(id);
      
      notifications.show({
        title: "Sucesso",
        message: deactivateOptions.successMessage || "Registro desativado com sucesso.",
        color: "green",
        autoClose: 5000,
        icon: React.createElement(IconCheck),
      });

      await handleSearch(currentFilters, pagedData.page, pagedData.pageSize);
      setSelectedId(null);
    } catch (error) {
      console.error("Erro ao desativar registro:", error);
    } finally {
      setLoading(false);
    }
  }, [deactivateOptions, currentFilters, pagedData.page, pagedData.pageSize, handleSearch]);

  const handleDeactivate = useCallback(
    (id: string | number) => {
      if (!deactivateOptions) return;
      
      const item = pagedData.items.find(i => (i as any).id === id || (i as any).Id === id);
      if (!item) return;

      modals.openConfirmModal({
        title: deactivateOptions.title || "Confirmar Ação",
        centered: true,
        children: deactivateOptions.renderContent(item),
        labels: { confirm: deactivateOptions.confirmLabel || "Confirmar Desativação", cancel: "Cancelar" },
        confirmProps: { color: deactivateOptions.color || "yellow" },
        onConfirm: () => performDeactivate(id),
      });
    },
    [deactivateOptions, pagedData.items, performDeactivate]
  );

  // Busca inicial automática
  useEffect(() => {
    handleSearch(initialFilters);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    handleDeactivate,
  };
}
