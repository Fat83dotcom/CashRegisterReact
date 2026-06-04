export interface IWarehouseRequest {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
  createdAt: string;
}

export interface ICreateWarehouseRequest {
  name: string;
  type: string;
}

export interface IUpdateWarehouseRequest {
  name: string;
  type: string;
  isActive: boolean;
}

export interface ICategoryRequest {
  name: string;
  parentCategoryId?: number | null;
}

export interface ICreateUnitRequest {
  code: string;
  name: string;
  allowDecimals: boolean;
}

export interface IUpdateUnitRequest {
  code: string;
  name: string;
  allowDecimals: boolean;
  isActive: boolean;
}

export interface ICreateProductRequest {
  name: string;
  sku: string;
  description?: string | null;
  ncmCode?: string | null;
  categoryId: number;
  baseUomId: number;
  tagIds?: number[];
  isActive: boolean;
}

export interface IUpdateProductRequest {
  name: string;
  sku: string;
  description?: string | null;
  ncmCode?: string | null;
  categoryId: number;
  baseUomId: number;
  tagIds?: number[];
  isActive: boolean;
}

export interface ICreateTagRequest {
  name: string;
  colorHex?: string | null;
}

export interface IUpdateTagRequest extends ICreateTagRequest {
  isActive: boolean;
}

export interface ITagRequest {
  id: number;
  name: string;
  colorHex?: string | null;
}

export interface IGetTagByIdResponse {
  id: number;
  name: string;
  colorHex?: string | null;
  isActive: boolean;
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

export interface IUpdateConversionRequest extends ICreateConversionRequest {
  isActive: boolean;
}

//Responses

export interface ITagResponse {
  id: number;
  name: string;
  colorHex?: string | null;
  isActive: boolean;
}

export interface IProductResponse {
  id: number;
  name: string;
  sku: string;
  category: string;
  uomSymbol: string;
  isActive: boolean;
}

export interface IGetProductByIdResponse {
  id: number;
  name: string;
  sku: string;
  description: string | null;
  ncmCode: string | null;
  categoryId: number;
  baseUomId: number;
  isActive: boolean;
  tagIds: number[];
}

export interface IGetUnitByIdResponse {
  id: number;
  code: string;
  name: string;
  allowDecimals: boolean;
  isActive: boolean;
}

export interface IUpdateConversionResponse {
  id: number;
  fromUomId: number;
  toUomId: number;
  multiplier: number;
  productId: number | null;
  isActive: boolean;
}

export interface ICategoryResponse {
  id?: number;
  name?: string;
  parentCategoryName?: string;
  parentCategoryId: number;
  isActive?: boolean;
}
export interface IUnitResponse {
  id?: number;
  code: string;
  name: string;
  allowDecimals: boolean;
  isActive: boolean;
}
export interface IConversionResponse {
  id: number;
  fromUnitSymbolId: number;
  fromUnitSymbol?: string | null;
  fromUnitName?: string | null;
  toUnitSymbolId: number;
  toUnitSymbol?: string | null;
  toUnitName?: string | null;
  multiplier: number;
  productId?: number | null;
  productName?: string | null;
  isActive: boolean;
}

export interface IGetAllUnitsResponse {
  code: string;
  name: string;
  allowDecimals: boolean;
}
