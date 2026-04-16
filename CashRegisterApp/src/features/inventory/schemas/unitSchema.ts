import { z } from "zod";

export const unitSchema = z.object({
  symbol: z.string().trim().min(1, "A sigla é obrigatória (ex: KG, UN)").max(5, "A sigla deve ter no máximo 5 caracteres"),
  name: z.string().trim().min(1, "O nome da unidade é obrigatório"),
  description: z.string().optional(),
});

export type UnitFormData = z.infer<typeof unitSchema>;
