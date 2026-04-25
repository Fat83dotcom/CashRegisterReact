export interface IWarehouseRequest {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
  createdAt: string;
}

export interface ICategoryRequest {
  id: number;
  name: string;
  parentCategoryId?: number | null;
  parentCategoryName?: string | null;
  isActive: boolean;
}

export interface IUnitRequest {
  code: string;
  name: string;
  allowDecimals: boolean;
}

export interface IProductRequest {
  id: number;
  sku: string;
  name: string;
  description?: string | null;
  ncmCode?: string | null;
  categoryName: string;
  categoryId: number;
  uomSymbol: string;
  baseUomId: number;
  averageCost: number;
  isActive: boolean;
}

export interface IConversionRequest {
  id: number;
  fromUomId: number;
  fromUnitSymbol: string;
  toUomId: number;
  toUnitSymbol: string;
  multiplier: number;
  productId?: number | null;
  productName?: string | null;
  isActive: boolean;
}

export interface ICreateConversionRequest {
  fromUomId: number;
  toUomId: number;
  multiplier: number;
  productId?: number | null;
}

//Responses

export interface IProductResponse {
  id?: number;
  name?: string;
  sku?: string;
  categoryName?: string;
  uomSymbol?: string;
  averageCost?: number;
  isActive?: boolean;
}
export interface ICategoryResponse {
  id?: number;
  name?: string;
  parentCategoryName?: string;
  isActive?: boolean;
}
export interface IUnitResponse {
  id?: number;
  code: string;
  name: string;
  allowDecimals: boolean;
}
export interface IConversionResponse {
  id?: number;
  fromUnitSymbol?: string;
  multiplier?: number;
  toUnitSymbol?: string;
  productName?: string;
  isActive?: boolean;
}

export interface IGetAllUnitsResponse {
  code: string;
  name: string;
  allowDecimals: boolean;
}
