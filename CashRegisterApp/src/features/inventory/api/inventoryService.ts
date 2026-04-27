import { notifications } from "@mantine/notifications";
import type { IPagedResponse, SearchParams } from "../../../hooks/useSearch";
import { apiClient } from "../../../lib/api";
import type { ICreateResponse } from "../../../shared/ICreateResponse";
import type {
  ICategoryResponse,
  IConversionResponse,
  ICreateConversionRequest,
  IGetAllUnitsResponse,
  IProductResponse,
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
  searchProducts: async (
    params: SearchParams & { searchTerm?: string; categoryId?: string },
  ): Promise<IPagedResponse<IProductResponse>> => {
    console.log("Searching Products API:", params);
    return {
      items: [],
      totalCount: 0,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: 0,
    };
  },

  // Categories
  searchCategories: async (
    params: SearchParams & { name?: string },
  ): Promise<IPagedResponse<ICategoryResponse>> => {
    console.log("Searching Categories API:", params);
    return {
      items: [],
      totalCount: 0,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: 0,
    };
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
    
    return apiClient.get<IPagedResponse<IUnitResponse>>(`/UnitOfMeasure/search?${queryParams.toString()}`);
  },

  // Conversions
  createConversion: async (request: ICreateConversionRequest, resetForms: () => void) => {
    apiClient
      .post<ICreateResponse, ICreateConversionRequest>("/UomConversion", request)
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
    params: SearchParams & { unitId?: string },
  ): Promise<IPagedResponse<IConversionResponse>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.unitId) {
      queryParams.append("UnitId", params.unitId);
    }

    return apiClient.get<IPagedResponse<IConversionResponse>>(`/UomConversion/search?${queryParams.toString()}`);
  },
};
