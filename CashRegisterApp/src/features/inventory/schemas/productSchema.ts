import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "O nome do produto é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  sku: z
    .string()
    .trim()
    .min(1, "O SKU é obrigatório")
    .max(50, "O SKU deve ter no máximo 50 caracteres"),
  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .optional()
    .nullable(),
  ncmCode: z
    .string()
    .max(8, "O NCM deve ter no máximo 8 caracteres")
    .optional()
    .nullable(),
  categoryId: z.preprocess(
    (value) => {
      return value === null || value === undefined ? "0" : value;
    },
    z.coerce.number().min(1, "A categoria é obrigatória"),
  ),

  baseUomId: z.preprocess(
    (value) => {
      return value === null || value === undefined ? "0" : value;
    },
    z.coerce.number().min(1, "A unidade de medida é obrigatória"),
  ),
  tagIds: z.array(z.string()).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
