import { generateDto } from '@/common/dto/dto-generator';
import { ResetPasswordSchema } from '../schemas/reset-password.schema';

export default class ResetPasswordDto extends generateDto(
  ResetPasswordSchema,
) {}
