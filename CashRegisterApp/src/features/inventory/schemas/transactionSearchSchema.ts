import { z } from "zod";

export const transactionSearchSchema = z.object({
  referenceDocument: z.string().optional(),
  dateRange: z.any().optional().nullable(),
});

export type TransactionSearchFormData = z.infer<typeof transactionSearchSchema>;
