import { z } from "zod";
import { zSelectString } from "../../../lib/zodUtils";

export const fulfillRequisitionSchema = z.object({
  sourceWarehouseId: zSelectString.refine((val: string) => val.length > 0, "Obrigatório selecionar o almoxarifado"),
});

export type FulfillRequisitionFormData = z.infer<typeof fulfillRequisitionSchema>;
