import { z } from "zod";

export const adjustStockSchema = z.object({
  adjustmentType: z.enum(["InventoryAdjustmentEntry", "InventoryAdjustmentExit"], {
    message: "Tipo de ajuste inválido ou não informado",
  }),
  quantity: z.number().min(1, "A quantidade deve ser maior que zero"),
  baseQuantity: z.number().min(1, "Erro ao calcular base"),
  uomId: z.string().min(1, "A unidade de medida é obrigatória"),
  reason: z.string().min(3, "Informe um motivo válido para o ajuste"),
});

export type AdjustStockFormData = z.infer<typeof adjustStockSchema>;
