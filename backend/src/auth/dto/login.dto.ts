import { generateDto } from '@/common/dto/dto-generator';
import { LoginSchema } from '../schemas/auth.schema';

export default class LoginDto extends generateDto(LoginSchema) {}
