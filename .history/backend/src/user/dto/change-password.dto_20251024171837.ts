import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(1, { message: 'Senha atual é obrigatória' })
  currentPassword: string;

  @IsString()
  @MinLength(8, { message: 'Nova senha deve ter no mínimo 8 caracteres' })
  newPassword: string;

  @IsString()
  @MinLength(8, { message: 'Confirmação de senha deve ter no mínimo 8 caracteres' })
  confirmPassword: string;
}