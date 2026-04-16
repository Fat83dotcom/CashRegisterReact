import { z } from "zod";
import { personSchema } from "../../person/schemas/personSchema";

export const userSchema = z.object({
  personId: z.number().optional(),
  userName: z.string().trim().min(1, "O nome de usuário é obrigatório."),
  role: z.string().min(1, "O papel do usuário é obrigatório."),
  password: z.string().min(12, "A senha deve conter no mínimo 12 caracteres."),
  person: personSchema.optional(),
}).superRefine((data, ctx) => {
  if (!data.personId) {
    if (!data.person) {
      ctx.addIssue({ code: 'custom', message: "Dados da pessoa são obrigatórios", path: ["person"] });
    } else {
      const res = personSchema.safeParse(data.person);
      if (!res.success) {
        res.error.issues.forEach(issue => {
          ctx.addIssue({
            ...issue,
            path: ["person", ...issue.path]
          });
        });
      }
    }
  }
});

export type UserFormData = z.infer<typeof userSchema>;
