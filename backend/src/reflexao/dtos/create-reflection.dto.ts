import { generateDto } from '@/common/dto/dto-generator';
import { ReflectionSchema } from '../schemas/reflection.schema';

export default class CreateReflectionDto extends generateDto(
  ReflectionSchema,
) {}
