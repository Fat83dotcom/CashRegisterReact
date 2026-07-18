import dayjs from "dayjs";
import { notifications } from "@mantine/notifications";
import type { IPagedResponse, SearchParams } from "../../../hooks/useSearch";
import { apiClient } from "../../../lib/api";
import type { ICreateResponse } from "../../../shared/ICreateResponse";
import type {
  ICategoryRequest,
  IUpdateCategoryRequest,
  ICategoryResponse,
  ICreateProductRequest,
  ICreateTagRequest,
  ICreateUnitRequest,
  IGetProductByIdResponse,
  IGetUnitByIdResponse,
  IProductResponse,
  ITagResponse,
  IUnitResponse,
  IUpdateConversionRequest,
  IUpdateProductRequest,
  IUpdateTagRequest,
  IUpdateUnitRequest,
  ICreateConversionRequest,
  IConversionResponse,
  IUpdateConversionResponse,
  IGetAllUnitsResponse,
  ICreateWarehouseRequest,
  IUpdateWarehouseRequest,
  ICreateInventoryTransactionRequest,
  IInventoryTransactionDetailsResponse,
  IWarehouseResponse,
  InventoryRequisition,
  CreateInventoryRequisitionRequest,
  SearchInventoryRequisitionRequest,
  ICreateSupplierRequest,
  IUpdateSupplierRequest,
  IGetSupplierByIdResponse,
  IGetSearchSupplierResponse,
} from "../interfaces";
import React from "react";
import { IconCheck } from "@tabler/icons-react";
import type { IUpdateResponse } from "../../../shared/IUpdateResponse";

export const InventoryService = {
  // Transactions
  createTransaction: async (
    data: ICreateInventoryTransactionRequest,
  ): Promise<ICreateResponse> => {
    return apiClient
      .post<ICreateResponse, any>("/InventoryTransaction", data)
      .then((response) => response || { id: 0 });
  },

  getTransactionById: async (
    id: number,
  ): Promise<IInventoryTransactionDetailsResponse> => {
    return apiClient.get<IInventoryTransactionDetailsResponse>(
      `/InventoryTransaction/${id}`,
    );
  },

  searchTransactions: async (params: any): Promise<IPagedResponse<any>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.referenceDocument) {
      queryParams.append("ReferenceDocument", params.referenceDocument);
    }

    if (params.dateRange) {
      if (params.dateRange[0]) {
        // Envia exatamente a data selecionada sem o offset de fuso (-03:00).
        // Assim, o .NET recebe (Unspecified) no mesmo dia, sem pular para o dia seguinte no model binder.
        const startStr = dayjs(params.dateRange[0]).format("YYYY-MM-DDT00:00:00");
        queryParams.append("StartDate", startStr);
      }
      if (params.dateRange[1]) {
        const endStr = dayjs(params.dateRange[1]).format("YYYY-MM-DDT23:59:59");
        queryParams.append("EndDate", endStr);
      }
    }

    if (params.transactionType) {
      queryParams.append("TransactionType", params.transactionType);
    }

    if (params.isActive !== undefined && params.isActive !== null && params.isActive !== "") {
      queryParams.append("IsActive", params.isActive);
    }

    return apiClient.get<IPagedResponse<any>>(`/InventoryTransaction/Search?${queryParams.toString()}`);
  },

  searchStockBalances: async (
    params: SearchParams & { searchTerm?: string; warehouseId?: string; categoryId?: string; tagIds?: string[]; hideEmpty?: boolean }
  ): Promise<IPagedResponse<any>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.searchTerm) {
      queryParams.append("Term", params.searchTerm);
    }
    if (params.warehouseId) {
      queryParams.append("WarehouseId", params.warehouseId);
    }
    if (params.categoryId) {
      queryParams.append("CategoryId", params.categoryId);
    }
    if (params.hideEmpty) {
      queryParams.append("HideEmpty", "true");
    }

    return apiClient.get<IPagedResponse<any>>(
      `/StockBalance/Search?${queryParams.toString()}`,
    );
  },

  getAvailableBalance: async (productId: number, warehouseId?: number | null): Promise<number> => {
    let url = `/StockBalance/GetAvailableBalance?productId=${productId}`;
    if (warehouseId) {
      url += `&warehouseId=${warehouseId}`;
    }
    return apiClient.get<number>(url);
  },

  // Warehouses
  searchWarehouses: async (
    params: SearchParams & { searchTerm?: string },
  ): Promise<IPagedResponse<IWarehouseResponse>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.searchTerm) {
      queryParams.append("Term", params.searchTerm);
    }

    return apiClient.get<IPagedResponse<IWarehouseResponse>>(
      `/warehouses/search?${queryParams.toString()}`,
    );
  },

  createWarehouse: async (
    request: ICreateWarehouseRequest,
  ): Promise<ICreateResponse> => {
    return apiClient
      .post<ICreateResponse, any>("/warehouses", {
        Name: request.name,
        Type: request.type,
        IsPrincipal: request.isPrincipal,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Almoxarifado criado com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  updateWarehouse: async (
    id: number,
    request: IUpdateWarehouseRequest,
  ): Promise<IUpdateResponse> => {
    return apiClient
      .put<IUpdateResponse, any>(`/warehouses/${id}/UpdateWarehouse`, {
        Name: request.name,
        Type: request.type,
        IsActive: request.isActive,
        IsPrincipal: request.isPrincipal,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Almoxarifado atualizado com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  getWarehouseById: async (id: number): Promise<IWarehouseResponse> => {
    return apiClient.get<IWarehouseResponse>(
      `/warehouses/${id}/GetWarehouseById`,
    );
  },

  deactivateWarehouse: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/warehouses/${id}/DeactivateWarehouse`, {});
  },

  // Products
  createProduct: async (
    request: ICreateProductRequest,
  ): Promise<ICreateResponse> => {
    return apiClient
      .post<ICreateResponse, any>("/product", {
        Sku: request.sku,
        Name: request.name,
        CategoryId: request.categoryId,
        BaseUomId: request.baseUomId,
        Description: request.description,
        NcmCode: request.ncmCode,
        TagIds: request.tagIds,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Produto criado com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  updateProduct: async (
    id: number,
    request: IUpdateProductRequest,
  ): Promise<IUpdateResponse> => {
    return apiClient
      .put<IUpdateResponse, any>(`/product/${id}/Update`, {
        Sku: request.sku,
        Name: request.name,
        CategoryId: request.categoryId,
        BaseUomId: request.baseUomId,
        Description: request.description,
        NcmCode: request.ncmCode,
        TagIds: request.tagIds,
        IsActive: request.isActive,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Produto atualizado com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  getProductById: async (id: number): Promise<IGetProductByIdResponse> => {
    return apiClient.get<IGetProductByIdResponse>(
      `/product/${id}/GetProductById`,
    );
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
      `/product/Search?${queryParams.toString()}`,
    );
  },

  deactivateProduct: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/product/${id}/Deactivate`, {});
  },

  // Tags
  createTag: async (request: ICreateTagRequest): Promise<ICreateResponse> => {
    return apiClient
      .post<ICreateResponse, any>("/Tag", {
        Name: request.name,
        ColorHex: request.colorHex,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Tag criada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  updateTag: async (
    id: number,
    request: IUpdateTagRequest,
  ): Promise<IUpdateResponse> => {
    return apiClient
      .put<IUpdateResponse, any>(`/Tag/${id}/Update`, {
        Name: request.name,
        ColorHex: request.colorHex,
        IsActive: request.isActive,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Tag atualizada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  getTagByIdResponse: async (id: number): Promise<ITagResponse> => {
    return apiClient.get<ITagResponse>(`/Tag/${id}/GetTagById`);
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
      `/Tag/Search?${queryParams.toString()}`,
    );
  },

  deactivateTag: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/Tag/${id}/Deactivate`, {});
  },

  // Categories
  createCategory: async (
    request: ICategoryRequest,
  ): Promise<ICreateResponse> => {
    return apiClient
      .post<ICreateResponse, any>("/Category", {
        Name: request.name,
        ParentCategoryId: request.parentCategoryId,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Categoria criada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
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
      `/Category/Search?${queryParams.toString()}`,
    );
  },

  getCategoryByIdResponse: async (id: number): Promise<ICategoryResponse> => {
    return apiClient.get<ICategoryResponse>(`/Category/${id}/GetCategoryById`);
  },

  updateCategory: async (
    id: number,
    request: IUpdateCategoryRequest,
  ): Promise<IUpdateResponse> => {
    return apiClient
      .put<IUpdateResponse, any>(`/Category/${id}/Update`, {
        Name: request.name,
        ParentCategoryId: request.parentCategoryId,
        IsActive: request.isActive,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Categoria atualizada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  deactivateCategory: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/Category/${id}/Deactivate`, {});
  },

  // Units
  createUnit: async (request: ICreateUnitRequest): Promise<ICreateResponse> => {
    return apiClient
      .post<ICreateResponse, any>("/UnitOfMeasure", {
        Code: request.code,
        Name: request.name,
        AllowDecimals: request.allowDecimals,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Unidade de medida criada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  updateUnit: async (
    id: number,
    request: IUpdateUnitRequest,
  ): Promise<IUpdateResponse> => {
    return apiClient
      .put<IUpdateResponse, any>(`/UnitOfMeasure/${id}/Update`, {
        Code: request.code,
        Name: request.name,
        AllowDecimals: request.allowDecimals,
        IsActive: request.isActive,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Unidade de medida atualizada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  getUnitById: async (id: number): Promise<IGetUnitByIdResponse> => {
    return apiClient.get<IGetUnitByIdResponse>(
      `/UnitOfMeasure/${id}/GetUnitById`,
    );
  },

  GetAllUnits: async () => {
    return apiClient.get<IGetAllUnitsResponse[]>("UnitOfMeasure");
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
      `/UnitOfMeasure/Search?${queryParams.toString()}`,
    );
  },

  deactivateUnit: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/UnitOfMeasure/${id}/Deactivate`, {});
  },

  // Conversions
  createConversion: async (
    request: ICreateConversionRequest,
  ): Promise<ICreateResponse> => {
    return apiClient
      .post<ICreateResponse, any>("/UomConversion", {
        FromUomId: request.fromUomId,
        ToUomId: request.toUomId,
        Multiplier: request.multiplier,
        ProductId: request.productId,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Regra de conversão criada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
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
      `/UomConversion/Search?${queryParams.toString()}`,
    );
  },

  updateConversion: async (
    id: number,
    request: IUpdateConversionRequest,
  ): Promise<IUpdateResponse> => {
    return apiClient
      .put<IUpdateResponse, any>(`/UomConversion/${id}/Update`, {
        FromUomId: request.fromUomId,
        ToUomId: request.toUomId,
        Multiplier: request.multiplier,
        ProductId: request.productId,
        IsActive: request.isActive,
      })
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Regra de conversão atualizada com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  getConversionById: async (id: number): Promise<IUpdateConversionResponse> => {
    return apiClient.get<IUpdateConversionResponse>(
      `/UomConversion/${id}/GetConversionById`,
    );
  },

  deactivateConversion: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/UomConversion/${id}/Deactivate`, {});
  },

  // Requisitions
  createRequisition: async (request: CreateInventoryRequisitionRequest) => {
    const response = await apiClient.post<{ id: number }, CreateInventoryRequisitionRequest>('/inventoryrequisitions', request);
    return response;
  },

  createFinancialRequisition: async (request: CreateInventoryRequisitionRequest) => {
    const response = await apiClient.post<{ id: number }, CreateInventoryRequisitionRequest>('/inventoryrequisitions/financial', request);
    return response;
  },

  searchRequisitions: async (request: SearchInventoryRequisitionRequest) => {
    const queryParams = new URLSearchParams();
    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    const response = await apiClient.get<IPagedResponse<InventoryRequisition>>(`/inventoryrequisitions?${queryParams.toString()}`);
    return response;
  },

  getRequisitionById: async (id: number) => {
    const response = await apiClient.get<InventoryRequisition>(`/inventoryrequisitions/${id}`);
    return response;
  },

  fulfillRequisition: async (id: number, payload: { sourceWarehouseId: number }) => {
    const response = await apiClient.put<{ id: number }, { sourceWarehouseId: number }>(`/inventoryrequisitions/${id}/fulfill`, payload);
    return response;
  },

  cancelRequisition: async (id: number) => {
    const response = await apiClient.put<{ id: number }, {}>(`/inventoryrequisitions/${id}/cancel`, {});
    return response;
  },

  // Suppliers
  createSupplier: async (
    request: ICreateSupplierRequest,
  ): Promise<ICreateResponse> => {
    return apiClient
      .post<ICreateResponse, any>("/Supplier", request)
      .then((response) => {
        if (response && response.id > 0) {
          notifications.show({
            title: "Sucesso",
            message: "Fornecedor criado com sucesso.",
            color: "green",
            autoClose: 5000,
            icon: React.createElement(IconCheck),
          });
        }
        return response;
      });
  },

  updateSupplier: async (
    id: number,
    request: IUpdateSupplierRequest,
  ): Promise<IUpdateResponse> => {
    return apiClient
      .put<IUpdateResponse, any>(`/Supplier/${id}`, request)
      .then((response) => {
        notifications.show({
          title: "Sucesso",
          message: "Fornecedor atualizado com sucesso.",
          color: "green",
          autoClose: 5000,
          icon: React.createElement(IconCheck),
        });
        return response;
      });
  },

  getSupplierById: async (id: number): Promise<IGetSupplierByIdResponse> => {
    return apiClient.get<IGetSupplierByIdResponse>(`/Supplier/${id}`);
  },

  searchSuppliers: async (
    params: SearchParams & { name?: string; taxId?: string },
  ): Promise<IPagedResponse<IGetSearchSupplierResponse>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("Page", params.page.toString());
    queryParams.append("PageSize", params.pageSize.toString());

    if (params.name) {
      queryParams.append("Name", params.name);
    }
    if (params.taxId) {
      queryParams.append("TaxId", params.taxId);
    }

    return apiClient.get<IPagedResponse<IGetSearchSupplierResponse>>(
      `/Supplier/Search?${queryParams.toString()}`,
    );
  },

  deactivateSupplier: async (id: string | number): Promise<void> => {
    return apiClient.put<void, {}>(`/Supplier/${id}/deactivate`, {});
  },
};
