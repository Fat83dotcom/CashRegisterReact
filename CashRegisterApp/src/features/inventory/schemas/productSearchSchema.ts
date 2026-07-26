import { z } from "zod";

import { zSelectString } from "../../../lib/zodUtils";

export const productSearchSchema = z.object({
  searchTerm: z.string().optional(),
  categoryId: zSelectString.optional(),
  warehouseId: zSelectString.optional(),
});

export type ProductSearchFormData = z.infer<typeof productSearchSchema>;
