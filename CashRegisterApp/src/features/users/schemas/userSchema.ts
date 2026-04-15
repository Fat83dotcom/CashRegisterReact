import { z } from "zod";

export const userSchema = z.object({
  personId: z.number().optional(),
  userName: z.string().trim().min(1, "O nome de usuário é obrigatório."),
  role: z.string().min(1, "O papel do usuário é obrigatório."),
  password: z.string().min(12, "A senha deve conter no mínimo 12 caracteres."),
});

export type UserFormData = z.infer<typeof userSchema>;
