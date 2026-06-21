import os
import re

# Fix inventoryTransactionSchema.ts
path = "src/features/inventory/schemas/inventoryTransactionSchema.ts"
with open(path, "r") as f:
    c = f.read()
c = c.replace("}).superRefine((data, ctx) => {", "}).superRefine(() => {")
c = c.replace('required_error: "O tipo de transação é obrigatório",', 'errorMap: () => ({ message: "O tipo de transação é obrigatório" }),')
with open(path, "w") as f:
    f.write(c)

# Fix inventoryService.ts (fromUnitId -> fromUomId, toUnitId -> toUomId)
path = "src/features/inventory/api/inventoryService.ts"
with open(path, "r") as f:
    c = f.read()
c = c.replace("fromUnitId", "fromUomId")
c = c.replace("toUnitId", "toUomId")
c = c.replace("import {\n  ICategoryRequest", "import type {\n  ICategoryRequest")
with open(path, "w") as f:
    f.write(c)

# Fix settings index.tsx
path = "src/features/settings/pages/index.tsx"
with open(path, "r") as f:
    c = f.read()
c = c.replace("{user ? `${user.userName.firstName} ${user.userName.lastName}` : \"Usuário\"}", "{user ? user.userName : \"Usuário\"}")
with open(path, "w") as f:
    f.write(c)

# Fix UpdateCategoryForm.tsx
path = "src/features/inventory/components/UpdateCategoryForm.tsx"
with open(path, "r") as f:
    c = f.read()
c = c.replace("type CategoryFormData,", "")
c = c.replace("IUpdateCategoryRequest", "ICategoryRequest")
with open(path, "w") as f:
    f.write(c)

# Fix UpdateTagForm.tsx
path = "src/features/inventory/components/UpdateTagForm.tsx"
with open(path, "r") as f:
    c = f.read()
c = c.replace(", type TagFormData", "")
with open(path, "w") as f:
    f.write(c)

# Fix CreateTagForm.tsx
path = "src/features/inventory/components/CreateTagForm.tsx"
with open(path, "r") as f:
    c = f.read()
c = c.replace("colorHex: \"#228be6\",", "colorHex: \"#228be6\",\n    isActive: \"true\",")
with open(path, "w") as f:
    f.write(c)

