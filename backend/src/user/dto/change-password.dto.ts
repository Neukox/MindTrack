import { generateDto } from '@/common/dto/dto-generator';
import { z } from 'zod';

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Senha atual é obrigatória' }),
    newPassword: z
      .string()
      .min(8, { message: 'Nova senha deve ter no mínimo 8 caracteres' }),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Confirmação de senha deve ter no mínimo 8 caracteres',
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'A nova senha e a confirmação de senha devem ser iguais',
    path: ['confirmPassword'],
  });

export default class ChangePasswordDto extends generateDto(
  changePasswordSchema,
) {}
