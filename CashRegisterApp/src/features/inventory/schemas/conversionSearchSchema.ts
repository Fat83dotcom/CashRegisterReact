import { z } from "zod";

export const conversionSearchSchema = z.object({
  unitId: z.string().optional(),
});

export type ConversionSearchFormData = z.infer<typeof conversionSearchSchema>;
