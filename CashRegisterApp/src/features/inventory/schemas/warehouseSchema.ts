import { z } from "zod";

export const warehouseSchema = z.object({
  name: z.string().trim().min(1, "O nome do almoxarifado é obrigatório").max(100, "O nome deve ter no máximo 100 caracteres"),
  type: z.string().trim().min(1, "O tipo do almoxarifado é obrigatório"),
});

export type WarehouseFormData = z.infer<typeof warehouseSchema>;
