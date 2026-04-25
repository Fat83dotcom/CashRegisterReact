import { z } from "zod";

export const unitSchema = z.object({
  code: z.string().trim().min(1, "O código é obrigatório").max(10, "O código deve ter no máximo 10 caracteres"),
  name: z.string().trim().min(1, "O nome da unidade é obrigatório").max(50, "O nome deve ter no máximo 50 caracteres"),
  allowDecimals: z.boolean().default(false),
});

export type UnitFormData = z.infer<typeof unitSchema>;
