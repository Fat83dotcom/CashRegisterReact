import { z } from "zod";

export const transactionSearchSchema = z.object({
  referenceDocument: z.string().optional(),
  dateRange: z.tuple([z.date().nullable(), z.date().nullable()]).optional().nullable(),
});

export type TransactionSearchFormData = z.infer<typeof transactionSearchSchema>;
