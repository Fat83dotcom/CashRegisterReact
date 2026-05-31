import { z } from "zod";

export const productSearchSchema = z.object({
  searchTerm: z.string().optional(),
  categoryId: z
    .preprocess((value) => {
      return value === null || value === undefined ? "0" : value;
    }, z.string())
    .optional(),
});

export type ProductSearchFormData = z.infer<typeof productSearchSchema>;
