import { generateDto } from '@/common/dto/dto-generator';
import { RecoveryPasswordSchema } from '../schemas/reset-password.schema';

export default class RecoverPasswordDto extends generateDto(
  RecoveryPasswordSchema,
) {}
