import { z } from "zod";

export const categorySearchSchema = z.object({
  name: z.string().optional(),
});

export type CategorySearchFormData = z.infer<typeof categorySearchSchema>;
