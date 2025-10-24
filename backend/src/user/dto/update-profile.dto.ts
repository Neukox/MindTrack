import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  username?: string;
}
