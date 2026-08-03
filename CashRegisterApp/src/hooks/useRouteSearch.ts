import { useState, useCallback } from "react";
import {
  useLoaderData,
  useSearchParams,
  useNavigation,
  useRevalidator,
} from "react-router-dom";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import React from "react";
import type { IPagedResponse, DeactivateOptions } from "./useSearch";

export function useRouteSearch<T, TFilters>(
  deactivateOptions?: DeactivateOptions<T>,
) {
  // Dados são injetados diretamente da rota (carregados via Loader)
  const pagedData = useLoaderData() as IPagedResponse<T>;

  // Controle de estado baseado 100% na URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Para saber se o React Router está buscando novos dados (transição de tela)
  const navigation = useNavigation();

  const [isDeactivating, setIsDeactivating] = useState(false);

  const loading = navigation.state === "loading" || isDeactivating;

  // Para forçar a atualização dos dados sem mudar a URL (após CRUD)
  const revalidator = useRevalidator();

  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  // Extrai currentFilters a partir da URL para repopular os forms de busca caso necessário
  const currentFilters = Object.fromEntries(
    searchParams.entries(),
  ) as unknown as TFilters;

  const handleSearch = useCallback(
    (filters: TFilters, page?: number, pageSize?: number) => {
      const newParams = new URLSearchParams(searchParams);

      if (page) {
        newParams.set("page", String(page));
      } else {
        newParams.set("page", "1");
      }

      if (pageSize) {
        newParams.set("pageSize", String(pageSize));
      }

      // Mesclamos os novos filtros na URL (limpando valores vazios)
      Object.entries(filters as any).forEach(([key, value]) => {
        if (key === "page" || key === "pageSize") return;

        if (value === undefined || value === null || value === "") {
          newParams.delete(key);
        } else if (Array.isArray(value)) {
          const strValue = value.map(v => v instanceof Date ? v.toISOString() : (v ? String(v) : "")).join(",");
          if (strValue && strValue !== ",") {
            newParams.set(key, strValue);
          } else {
            newParams.delete(key);
          }
        } else if (value instanceof Date) {
          newParams.set(key, value.toISOString());
        } else {
          newParams.set(key, String(value));
        }
      });

      setSearchParams(newParams);
      setSelectedId(null);
    },
    [searchParams, setSearchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", String(page));
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handlePageSizeChange = useCallback(
    (pageSize: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("pageSize", pageSize);
      newParams.set("page", "1");
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const refresh = useCallback(() => {
    // Essa função é vital. Ela faz o React Router disparar o Loader novamente
    // e pegar os dados frescos do banco de dados, sem mudar de página ou piscar a tela.
    revalidator.revalidate();
  }, [revalidator]);

  const performDeactivate = useCallback(
    async (id: string | number) => {
      if (!deactivateOptions) return;
      setIsDeactivating(true);
      try {
        await deactivateOptions.action(id);

        notifications.show({
          title: "Sucesso",
          message:
            deactivateOptions.successMessage ||
            "Registro desativado com sucesso.",
          color: "green",
          autoClose: 5000,
          icon: React.createElement(IconCheck),
        });

        refresh();
        setSelectedId(null);
      } catch (error) {
        console.error("Erro ao desativar registro:", error);
      } finally {
        setIsDeactivating(false);
      }
    },
    [deactivateOptions, refresh],
  );

  const handleDeactivate = useCallback(
    (id: string | number) => {
      if (!deactivateOptions || !pagedData?.items) return;

      const item = pagedData.items.find(
        (i) => (i as any).id === id || (i as any).Id === id,
      );
      if (!item) return;

      modals.openConfirmModal({
        title: deactivateOptions.title || "Confirmar Ação",
        centered: true,
        children: deactivateOptions.renderContent(item),
        labels: {
          confirm: deactivateOptions.confirmLabel || "Confirmar Desativação",
          cancel: "Cancelar",
        },
        confirmProps: { color: deactivateOptions.color || "yellow" },
        onConfirm: () => performDeactivate(id),
      });
    },
    [deactivateOptions, pagedData, performDeactivate],
  );

  return {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    handleDeactivate,
    handlePageChange,
    handlePageSizeChange,
    currentFilters,
    refresh,
  };
}
