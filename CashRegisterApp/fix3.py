import os

path = "src/features/inventory/api/inventoryService.ts"
with open(path, "r") as f:
    c = f.read()

# Fix IUpdateCategoryRequest import
c = c.replace("import type {\n  ICategoryRequest", "import type {\n  ICategoryRequest,\n  IUpdateCategoryRequest")
c = c.replace("  IGetTagByIdResponse,\n", "")

# Fix createTransaction
old_trans = """  createTransaction: async (data: ICreateInventoryTransactionRequest): Promise<ICreateResponse> => {
    const response = await apiClient.post("/InventoryTransaction", data);
    return response.data;
  },"""
new_trans = """  createTransaction: async (data: ICreateInventoryTransactionRequest): Promise<ICreateResponse> => {
    return apiClient
      .post<ICreateResponse, any>("/InventoryTransaction", data)
      .then((response) => response || { id: 0 });
  },"""
c = c.replace(old_trans, new_trans)

with open(path, "w") as f:
    f.write(c)

