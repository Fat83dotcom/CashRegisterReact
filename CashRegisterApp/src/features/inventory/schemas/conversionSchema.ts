import { z } from "zod";

import { zSelectString } from "../../../lib/zodUtils";

export const conversionSchema = z.object({
  fromUomId: zSelectString.refine((val) => val.length > 0, "Unidade de origem é obrigatória"),
  toUomId: zSelectString.refine((val) => val.length > 0, "Unidade de destino é obrigatória"),
  multiplier: z.coerce.number().gt(0, "O multiplicador deve ser maior que zero"),
  productId: zSelectString.optional(),
  isActive: z.string().default("true"),
});

export type ConversionFormData = z.infer<typeof conversionSchema>;
