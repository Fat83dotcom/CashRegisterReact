import { z } from "zod";

export const CreateInventoryTransactionItemSchema = z.object({
  productId: z.number().min(1, "Produto é obrigatório"),
  uomId: z.number().min(1, "Unidade de Medida é obrigatória"),
  transactionQuantity: z.number().min(0.01, "A quantidade deve ser maior que zero"),
  baseQuantity: z.number().min(0.01, "A quantidade base deve ser maior que zero"),
  sourceWarehouseId: z.number().optional(),
  destinationWarehouseId: z.number().optional(),
}).superRefine(() => {
  // This will be validated along with the main transactionType context inside the form or component if needed
});

export const CreateInventoryTransactionSchema = z.object({
  userId: z.number(),
  transactionType: z.enum(["PurchaseEntry", "Transfer", "RequisitionExit", "Reversal"]),
  referenceDocument: z.string().optional(),
  items: z.array(CreateInventoryTransactionItemSchema).min(1, "É necessário adicionar pelo menos um item"),
}).superRefine((data, ctx) => {
  const type = data.transactionType;

  data.items.forEach((item, index) => {
    if (type === "PurchaseEntry" && !item.destinationWarehouseId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O Almoxarifado de destino é obrigatório para Entradas.",
        path: ["items", index, "destinationWarehouseId"],
      });
    }

    if (type === "RequisitionExit" && !item.sourceWarehouseId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O Almoxarifado de origem é obrigatório para Saídas.",
        path: ["items", index, "sourceWarehouseId"],
      });
    }

    if (type === "Transfer") {
      if (!item.sourceWarehouseId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "A origem é obrigatória para Transferências.",
          path: ["items", index, "sourceWarehouseId"],
        });
      }
      if (!item.destinationWarehouseId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O destino é obrigatório para Transferências.",
          path: ["items", index, "destinationWarehouseId"],
        });
      }
    }
  });
});

export type CreateInventoryTransactionFormData = z.infer<typeof CreateInventoryTransactionSchema>;
