import { z } from "zod";

export const searchUserSchema = z.object({
  name: z.string().optional(),
  taxId: z.string().optional(),
  birthDate: z.date().nullable().optional(),
});

export type SearchUserFormData = z.infer<typeof searchUserSchema>;
