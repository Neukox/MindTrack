import { generateDto } from '@/common/dto/dto-generator';
import { ReflectionSchema } from '../schemas/reflection.schema';

export default class UpdateReflectionDto extends generateDto(
  ReflectionSchema.partial(),
) {}
