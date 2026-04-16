import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().trim().min(1, "O nome de usuário é obrigatório."),
  password: z.string().min(1, "A senha é obrigatória."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
