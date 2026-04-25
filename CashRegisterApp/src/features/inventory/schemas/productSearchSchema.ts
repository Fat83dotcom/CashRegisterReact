import { z } from "zod";

export const productSearchSchema = z.object({
  searchTerm: z.string().optional(),
  categoryId: z.string().optional(),
});

export type ProductSearchFormData = z.infer<typeof productSearchSchema>;
