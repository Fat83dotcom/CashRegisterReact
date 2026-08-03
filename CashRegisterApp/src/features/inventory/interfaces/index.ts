export interface IWarehouseRequest {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
  isPrincipal: boolean;
  createdAt: string;
}

export interface ICreateWarehouseRequest {
  name: string;
  type: string;
  isPrincipal: boolean;
}

export interface IUpdateWarehouseRequest {
  name: string;
  type: string;
  isActive: boolean;
  isPrincipal: boolean;
}

export interface ICreateInventoryTransactionItemRequest {
  productId: number;
  uomId: number;
  transactionQuantity: number;
  baseQuantity: number;
  sourceWarehouseId?: number;
  destinationWarehouseId?: number;
}

export interface ICreateInventoryTransactionRequest {
  userId?: number;
  transactionType: "PurchaseEntry" | "Transfer" | "RequisitionExit" | "Reversal" | "InventoryAdjustmentEntry" | "InventoryAdjustmentExit";
  referenceDocument?: string;
  name?: string;
  description?: string;
  items: ICreateInventoryTransactionItemRequest[];
}

export interface ICategoryRequest {
  name: string;
  parentCategoryId?: number | null;
}

export interface IUpdateCategoryRequest extends ICategoryRequest {
  isActive: boolean;
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

export interface IGetUomConversionRuleRequest {
  fromUomId: number;
  toUomId: number;
  productId?: number | null;
}

export interface IGetUomConversionRuleResponse {
  id: number;
  multiplier: number;
  isActive: boolean;
}

//Responses

export interface ITagResponse {
  id: number;
  name: string;
  colorHex?: string | null;
  isActive: boolean;
}

export interface IWarehouseResponse {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
  isPrincipal: boolean;
  createdAt: string;
}

export interface IProductResponse {
  id: number;
  name: string;
  sku: string;
  category: string;
  uomSymbol: string;
  baseUomId: number;
  isActive: boolean;
  stockQuantity: number;
  warehouseName?: string;
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

export interface IInventoryTransactionItemResponse {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  uomSymbol: string;
  uomName: string;
  sourceWarehouseId?: number | null;
  sourceWarehouseName?: string | null;
  destinationWarehouseId?: number | null;
  destinationWarehouseName?: string | null;
}

export interface IProductConversionItemResponse {
  uomId: number;
  uomSymbol: string;
  multiplier: number;
  ruleType: "Base" | "ProductSpecific" | "Global";
}

export interface IInventoryTransactionDetailsResponse {
  id: number;
  transactionType: string;
  referenceDocument?: string | null;
  name?: string | null;
  description?: string | null;
  notes?: string | null;
  createdAt: string;
  transactionStatus: string;
  items: IInventoryTransactionItemResponse[];
}

export interface StockBalanceResponse {
  id: number;
  productId: number;
  productSku: string;
  productName: string;
  warehouseId: number;
  warehouseName: string;
  physicalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
}

export interface InventoryTransactionResponse {
  id: number;
  transactionType: string;
  referenceDocument: string | null;
  name: string | null;
  description: string | null;
  transactionDate: string;
  transactionStatus: string;
}

export interface InventoryRequisitionItem {
  id?: number;
  productId: number;
  productName?: string;
  quantity: number;
}

export type RequisitionStatus = "Pending" | "Fulfilled" | "Canceled";

export interface InventoryRequisition {
  id: number;
  originModule: string;
  requestedByUserId: number;
  requestedByUserName?: string;
  status?: RequisitionStatus;
  notes?: string;
  createdAt: string;
  fulfilledAt?: string;
  items?: InventoryRequisitionItem[];
  isActive: boolean;
}

export interface CreateInventoryRequisitionRequest {
  originModule: string;
  notes?: string;
  items: { productId: number; quantity: number }[];
}

export interface SearchInventoryRequisitionRequest {
  page: number;
  pageSize: number;
  originModule?: string;
  status?: RequisitionStatus;
  startDate?: string;
  endDate?: string;
}

export interface ICreateSupplierRequest {
  personId?: number;
  person?: {
    personType?: string;
    firstName: string;
    lastName: string;
    taxId?: string;
    birthdate?: string;
    email?: string;
    tradeName?: string;
    stateRegistration?: string;
    municipalRegistration?: string;
    cellPhone?: string;
    phone?: string;
    gender?: string;
  };
}

export interface IUpdateSupplierRequest {
  isActive: boolean;
  person?: {
    personType?: string;
    firstName: string;
    lastName: string;
    taxId?: string;
    birthdate?: string;
    email?: string;
    tradeName?: string;
    stateRegistration?: string;
    municipalRegistration?: string;
    cellPhone?: string;
    phone?: string;
    gender?: string;
  };
}

export interface IGetSupplierByIdResponse {
  id: number;
  personId: number;
  name: {
    firstName: string;
    lastName: string;
  };
  taxId?: string;
  isActive: boolean;
}

export interface IGetSearchSupplierResponse {
  id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  taxId?: string;
  isActive: boolean;
}
