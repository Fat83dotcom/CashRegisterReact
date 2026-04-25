import { z } from "zod";

export const productSchema = z.object({
  sku: z.string().trim().min(1, "O SKU é obrigatório").max(50, "O SKU deve ter no máximo 50 caracteres"),
  name: z.string().trim().min(1, "O nome do produto é obrigatório").max(200, "O nome deve ter no máximo 200 caracteres"),
  description: z.string().optional().nullable(),
  ncmCode: z.string().optional().nullable(),
  categoryId: z.coerce.number().min(1, "Selecione uma categoria"),
  baseUomId: z.coerce.number().min(1, "Selecione uma unidade de medida"),
  averageCost: z.coerce.number().min(0, "O custo médio deve ser maior ou igual a zero"),
});

export type ProductFormData = z.infer<typeof productSchema>;
