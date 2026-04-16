import { z } from "zod";

export const personSchema = z.object({
  personType: z.coerce.number().min(1).max(2).default(1),
  firstName: z.string().trim().min(1, "Nome é obrigatório."),
  lastName: z.string().trim().min(1, "Sobrenome é obrigatório."),
  taxId: z.string().min(11, "Documento deve ter no mínimo 11 dígitos."),
  birthdate: z.date({
    required_error: "Data de nascimento/fundação é obrigatória.",
    invalid_type_error: "Data inválida.",
  }),
  email: z.string().email("E-mail inválido."),
  tradeName: z.string().optional(),
  stateRegistration: z.string().optional(),
  municipalRegistration: z.string().optional(),
  cellPhone: z.string().optional().refine(val => !val || val.length >= 10, "Celular inválido."),
  phone: z.string().optional().refine(val => !val || val.length >= 10, "Telefone inválido."),
  gender: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.personType === 2 && (!data.tradeName || data.tradeName.trim().length === 0)) {
    ctx.addIssue({
      code: 'custom',
      message: "Nome Fantasia é obrigatório para Pessoa Jurídica.",
      path: ["tradeName"],
    });
  }
});

export type PersonFormData = z.infer<typeof personSchema>;
