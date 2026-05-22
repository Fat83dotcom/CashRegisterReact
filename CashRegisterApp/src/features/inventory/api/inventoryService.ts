import { notifications } from "@mantine/notifications";
import type { IPagedResponse, SearchParams } from "../../../hooks/useSearch";
import { apiClient } from "../../../lib/api";
import type { ICreateResponse } from "../../../shared/ICreateResponse";
import type {
  ICategoryRequest,
  ICategoryResponse,
  IConversionResponse,
  ICreateConversionRequest,
  ICreateProductRequest,
  ICreateTagRequest,
  IGetAllUnitsResponse,
  IProductResponse,
  ITagResponse,
  IUnitRequest,
  IUnitResponse,
} from "../interfaces";
import type { IWarehouseResponse } from "../interfaces/IWarehouseResponse";
import React from "react";
import { IconCheck } from "@tabler/icons-react";

export const InventoryService = {
  // Warehouses
  searchWarehouses: async (
    params: SearchParams & { searchTerm?: string },
  ): Promise<IPagedResponse<IWarehouseResponse>> => {
    console.log("Searching Warehouses API:", params);
    return {
      items: [],
      totalCount: 0,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: 0,
    };
  },
  deactivateWarehouse: async (id: string | number): Promise<void> => {
    console.log("Deactivating Warehouse API:", id);
  },

  // Products
  createProduct: async (
    request: ICreateProductRequest,
    resetForms: () => void,
  ) => {
    apiClient
      .post<ICreateResponse, ICreateProductRequest>("/product", request)
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Produto criado com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
          resetForms();
        }
      });
  },

  searchProducts: async (
    params: SearchParams & { searchTerm?: string; categoryId?: string },
  ): Promise<IPagedResponse<IProductResponse>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.searchTerm) {
      queryParams.append("Term", params.searchTerm);
    }
    if (params.categoryId) {
      queryParams.append("CategoryId", params.categoryId);
    }

    return apiClient.get<IPagedResponse<IProductResponse>>(
      `/product/search?${queryParams.toString()}`,
    );
  },

  deactivateProduct: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/product/${id}/deactivate`, {});
  },

  // Tags
  createTag: async (request: ICreateTagRequest, resetForms: () => void) => {
    apiClient
      .post<ICreateResponse, ICreateTagRequest>("/tag", request)
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Tag criada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
          resetForms();
        }
      });
  },

  searchTags: async (
    params: SearchParams & { searchTerm?: string },
  ): Promise<IPagedResponse<ITagResponse>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.searchTerm) {
      queryParams.append("Term", params.searchTerm);
    }

    return apiClient.get<IPagedResponse<ITagResponse>>(
      `/tag/search?${queryParams.toString()}`,
    );
  },

  deactivateTag: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/tag/${id}/deactivate`, {});
  },

  // Categories
  createCategory: async (request: ICategoryRequest, resetForms: () => void) => {
    apiClient
      .post<ICreateResponse, ICategoryRequest>("/category", request)
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Categoria criada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
          resetForms();
        }
      });
  },

  searchCategories: async (
    params: SearchParams & { name?: string },
  ): Promise<IPagedResponse<ICategoryResponse>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.name) {
      queryParams.append("Term", params.name);
    }

    return apiClient.get<IPagedResponse<ICategoryResponse>>(
      `/category/search?${queryParams.toString()}`,
    );
  },

  deactivateCategory: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/category/${id}/deactivate`, {});
  },

  // Units
  createUnit: async (request: IUnitRequest, resetForms: () => void) => {
    apiClient
      .post<ICreateResponse, IUnitRequest>("/UnitOfMeasure", request)
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Unidade de medida criada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
          resetForms();
        }
      });
  },

  GetAllUnits: async () => {
    apiClient.get<IGetAllUnitsResponse[]>("UnitOfMeasure").then((resṕonse) => {
      console.log(resṕonse);

      return resṕonse;
    });
  },

  searchUnits: async (
    params: SearchParams & { searchTerm?: string },
  ): Promise<IPagedResponse<IUnitResponse>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.searchTerm) {
      queryParams.append("Term", params.searchTerm);
    }

    return apiClient.get<IPagedResponse<IUnitResponse>>(
      `/UnitOfMeasure/search?${queryParams.toString()}`,
    );
  },

  deactivateUnit: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/UnitOfMeasure/${id}/deactivate`, {});
  },

  // Conversions
  createConversion: async (
    request: ICreateConversionRequest,
    resetForms: () => void,
  ) => {
    apiClient
      .post<
        ICreateResponse,
        ICreateConversionRequest
      >("/UomConversion", request)
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Regra de conversão criada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
          resetForms();
        }
      });
  },

  searchConversions: async (
    params: SearchParams & { searchTerm?: string },
  ): Promise<IPagedResponse<IConversionResponse>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.searchTerm) {
      queryParams.append("Term", params.searchTerm);
    }

    return apiClient.get<IPagedResponse<IConversionResponse>>(
      `/UomConversion/search?${queryParams.toString()}`,
    );
  },

  deactivateConversion: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/UomConversion/${id}/deactivate`, {});
  },
};
