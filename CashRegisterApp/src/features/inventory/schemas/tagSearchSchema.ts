import { z } from "zod";

export const tagSearchSchema = z.object({
  searchTerm: z.string().optional(),
});

export type TagSearchFormData = z.infer<typeof tagSearchSchema>;
