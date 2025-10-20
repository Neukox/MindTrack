import { Controller, Body, Post } from '@nestjs/common';
import { ReflexaoService } from './reflexao.service';
import CreateReflectionDto from './dtos/create-reflection.dto';

@Controller('reflexao')
export class ReflexaoController {
  constructor(private readonly reflexaoService: ReflexaoService) {}

  @Post()
  async createReflexao(@Body() createRefelctionDto: CreateReflectionDto) {
    await this.reflexaoService.create(createRefelctionDto);

    return {
      message: 'Reflexão criada com sucesso.',
    };
  }
}
