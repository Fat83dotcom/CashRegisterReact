import { z } from "zod";

export const conversionSchema = z.object({
  fromUnitId: z.coerce.number().min(1, "Unidade de origem é obrigatória"),
  toUnitId: z.coerce.number().min(1, "Unidade de destino é obrigatória"),
  factor: z.coerce.number().gt(0, "O fator deve ser maior que zero"),
  description: z.string().optional(),
});

export type ConversionFormData = z.infer<typeof conversionSchema>;
