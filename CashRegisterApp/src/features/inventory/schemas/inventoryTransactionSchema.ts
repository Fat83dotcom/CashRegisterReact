import { z } from "zod";

const optionalNumber = z.preprocess(
  (val) => (val === "" || val == null ? undefined : Number(val)),
  z.number().optional()
);

export const CreateInventoryTransactionItemSchema = z.object({
  productId: z.coerce.number().min(1, "Produto é obrigatório"),
  uomId: z.coerce.number().min(1, "Unidade de Medida é obrigatória"),
  transactionQuantity: z.coerce.number().min(0.01, "A quantidade deve ser maior que zero"),
  baseQuantity: z.coerce.number().min(0.01, "A quantidade base deve ser maior que zero"),
  sourceWarehouseId: optionalNumber,
  destinationWarehouseId: optionalNumber,
}).superRefine(() => {
  // This will be validated along with the main transactionType context inside the form or component if needed
});

export const CreateInventoryTransactionSchema = z.object({
  transactionType: z.enum(["PurchaseEntry", "Transfer", "RequisitionExit", "Reversal"]),
  referenceDocument: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  globalSourceWarehouseId: optionalNumber,
  globalDestinationWarehouseId: optionalNumber,
  items: z.array(CreateInventoryTransactionItemSchema).min(1, "É necessário adicionar pelo menos um item"),
}).superRefine((data, ctx) => {
  const type = data.transactionType;

  if (type === "PurchaseEntry" && !data.globalDestinationWarehouseId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "O Almoxarifado de destino é obrigatório para Entradas.",
      path: ["globalDestinationWarehouseId"],
    });
  }

  if (type === "RequisitionExit" && !data.globalSourceWarehouseId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "O Almoxarifado de origem é obrigatório para Saídas.",
      path: ["globalSourceWarehouseId"],
    });
  }

  if (type === "Transfer") {
    if (!data.globalSourceWarehouseId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A origem é obrigatória para Transferências.",
        path: ["globalSourceWarehouseId"],
      });
    }
    if (!data.globalDestinationWarehouseId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O destino é obrigatório para Transferências.",
        path: ["globalDestinationWarehouseId"],
      });
    }
  }
});

export type CreateInventoryTransactionFormData = z.infer<typeof CreateInventoryTransactionSchema>;
