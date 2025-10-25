import { generateDto } from '@/common/dto/dto-generator';
import { z } from 'zod';

const username = z.object({
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
    .nonempty('Nome de usuário é obrigatório'),
});

export default class UpdateProfileDto extends generateDto(username) {}
