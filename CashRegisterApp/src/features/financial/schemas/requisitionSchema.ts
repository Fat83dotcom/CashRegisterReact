import { z } from "zod";

export const requisitionSchema = z.object({
  notes: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.coerce.number().min(1, "Selecione um produto."),
      quantity: z.coerce.number().min(0.0001, "A quantidade deve ser maior que zero."),
    })
  ).min(1, "Adicione pelo menos um produto na requisição."),
});

export type RequisitionFormData = z.infer<typeof requisitionSchema>;
