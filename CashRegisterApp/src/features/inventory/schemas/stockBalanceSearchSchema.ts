import { z } from "zod";

import { zSelectString, zMultiSelectArray } from "../../../lib/zodUtils";

export const stockBalanceSearchSchema = z.object({
  searchTerm: z.string().optional(),
  warehouseId: zSelectString.optional(),
  categoryId: zSelectString.optional(),
  tagIds: zMultiSelectArray.optional(),
  hideEmpty: z.boolean().optional(),
});

export type StockBalanceSearchFormData = z.infer<typeof stockBalanceSearchSchema>;
