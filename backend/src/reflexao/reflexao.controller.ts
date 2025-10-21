import { Controller, Body, Post, Get, Query, Param } from '@nestjs/common';
import { ReflexaoService } from './reflexao.service';
import CreateReflectionDto from './dtos/create-reflection.dto';
import ReflectionFiltersDto from './dtos/reflection-flilters.dto';

@Controller('reflexao')
export class ReflexaoController {
  constructor(private readonly reflexaoService: ReflexaoService) {}

  @Get('usuario/:userId')
  async getReflexoesByUser(
    @Query() filters: ReflectionFiltersDto,
    @Param('userId') userId: string,
  ) {
    const reflexoes = await this.reflexaoService.findAllByUser(userId, filters);
    return reflexoes;
  }

  @Post()
  async createReflexao(@Body() createRefelctionDto: CreateReflectionDto) {
    await this.reflexaoService.create(createRefelctionDto);

    return {
      message: 'Reflexão criada com sucesso.',
    };
  }
}
