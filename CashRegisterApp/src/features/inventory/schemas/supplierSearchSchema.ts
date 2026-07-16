import { z } from "zod";

export const supplierSearchSchema = z.object({
  name: z.string().optional(),
  taxId: z.string().optional(),
});

export type SupplierSearchFormData = z.infer<typeof supplierSearchSchema>;
