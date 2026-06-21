import { z } from "zod";

export const transactionSearchSchema = z.object({
  referenceDocument: z.string().optional(),
});

export type TransactionSearchFormData = z.infer<typeof transactionSearchSchema>;
