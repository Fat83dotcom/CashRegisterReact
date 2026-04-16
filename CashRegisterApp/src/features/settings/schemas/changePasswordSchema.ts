import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Senha atual muito curta"),
  newPassword: z.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
