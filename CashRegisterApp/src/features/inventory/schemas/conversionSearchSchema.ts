import { z } from "zod";

export const conversionSearchSchema = z.object({
  searchTerm: z.string().optional(),
});

export type ConversionSearchFormData = z.infer<typeof conversionSearchSchema>;
