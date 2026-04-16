import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "O nome da categoria é obrigatório"),
  description: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
