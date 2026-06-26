import { z } from "zod";

export const stockBalanceSearchSchema = z.object({
  searchTerm: z.string().optional(),
  warehouseId: z.string().optional(),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  hideEmpty: z.boolean().optional(),
});

export type StockBalanceSearchFormData = z.infer<typeof stockBalanceSearchSchema>;
