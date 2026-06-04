import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().trim().min(1, "O nome da tag é obrigatório").max(50, "O nome deve ter no máximo 50 caracteres"),
  colorHex: z.string()
    .trim()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Cor inválida. Use o formato hexadecimal (ex: #FF0000)")
    .optional()
    .nullable(),
  isActive: z.string().default("true"),
});

export type TagFormData = z.infer<typeof tagSchema>;
