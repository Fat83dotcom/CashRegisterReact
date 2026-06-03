import { z } from "zod";

export const conversionSchema = z.object({
  fromUomId: z.string().min(1, "Unidade de origem é obrigatória"),
  toUomId: z.string().min(1, "Unidade de destino é obrigatória"),
  multiplier: z.coerce.number().gt(0, "O multiplicador deve ser maior que zero"),
  productId: z.string().nullable().default(null),
  isActive: z.string().default("true"),
});

export type ConversionFormData = z.infer<typeof conversionSchema>;
