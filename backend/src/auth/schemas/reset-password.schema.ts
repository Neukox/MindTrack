import { z } from 'zod';

export const RecoveryPasswordSchema = z.object({
  email: z
    .email({ message: 'E-mail inválido' })
    .nonempty({ message: 'E-mail é obrigatório' }),
});

export const ResetPasswordSchema = z.object({
  token: z.string().nonempty({ message: 'Token é obrigatório' }),
  new_password: z
    .string()
    .min(8, { message: 'A nova senha deve ter pelo menos 8 caracteres' })
    .nonempty({ message: 'A nova senha é obrigatória' }),
});
