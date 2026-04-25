import { z } from "zod";

export const conversionSchema = z.object({
  fromUomId: z.coerce.number().min(1, "Unidade de origem é obrigatória"),
  toUomId: z.coerce.number().min(1, "Unidade de destino é obrigatória"),
  multiplier: z.coerce.number().gt(0, "O multiplicador deve ser maior que zero"),
  productId: z.coerce.number().optional().nullable(),
});

export type ConversionFormData = z.infer<typeof conversionSchema>;
