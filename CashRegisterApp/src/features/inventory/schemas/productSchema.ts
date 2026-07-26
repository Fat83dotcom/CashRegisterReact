import { z } from "zod";
import { zSelectString, zMultiSelectArray } from "../../../lib/zodUtils";

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
    .nullable(),
  ncmCode: z
    .string()
    .max(8, "O NCM deve ter no máximo 8 caracteres")
    .nullable(),
  categoryId: zSelectString.refine((val) => val.length > 0, "A categoria é obrigatória"),
  baseUomId: zSelectString.refine((val) => val.length > 0, "A unidade de medida é obrigatória"),
  tagIds: zMultiSelectArray.optional(),
  isActive: z.string().default("true"),
});

export type ProductFormData = z.infer<typeof productSchema>;
