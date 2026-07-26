import { z } from "zod";

import { zSelectString } from "../../../lib/zodUtils";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "O nome da categoria é obrigatório").max(100, "O nome deve ter no máximo 100 caracteres"),
  parentCategoryId: zSelectString.optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
