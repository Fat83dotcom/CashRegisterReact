import { z } from "zod";

export const unitSearchSchema = z.object({
  searchTerm: z.string().optional(),
});

export type UnitSearchFormData = z.infer<typeof unitSearchSchema>;
