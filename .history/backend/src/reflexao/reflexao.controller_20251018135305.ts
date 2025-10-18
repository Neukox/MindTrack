import { Controller, Body, Post } from '@nestjs/common';
import { ReflexaoService } from './reflexao.service';

@Controller('reflexao')
export class ReflexaoController {
  constructor(private readonly reflexaoService: ReflexaoService) {}

  @Post()
  async createReflexao(@Body() payload: CreateReflexaoDto) {
    return this.reflexaoService.createReflexao(payload);
  }
}
