import { z } from "zod";

export const warehouseSearchSchema = z.object({
  searchTerm: z.string().optional(),
});

export type WarehouseSearchFormData = z.infer<typeof warehouseSearchSchema>;
