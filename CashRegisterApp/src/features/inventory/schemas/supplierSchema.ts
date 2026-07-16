import { z } from "zod";
import { personSchema } from "../../person/schemas/personSchema";

export const supplierSchema = z.object({
  personId: z.number().optional(),
  person: personSchema.optional(),
  isActive: z.string().default("true"),
}).superRefine((data, ctx) => {
  if (!data.personId && !data.person) {
    ctx.addIssue({
      code: 'custom',
      message: "É necessário selecionar uma pessoa existente ou cadastrar uma nova.",
      path: ["personId"],
    });
  }
});

export type SupplierFormData = z.infer<typeof supplierSchema>;
