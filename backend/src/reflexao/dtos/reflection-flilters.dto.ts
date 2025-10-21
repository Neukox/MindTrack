import { generateDto } from '@/common/dto/dto-generator';
import { ReflectionFilterSchema } from '../schemas/reflection.schema';

export default class ReflectionFiltersDto extends generateDto(
  ReflectionFilterSchema,
) {}
