import { generateDto } from '@/common/dto/dto-generator';
import { RegisterSchema } from '../schemas/auth.schema';

export default class RegisterDto extends generateDto(RegisterSchema) {}