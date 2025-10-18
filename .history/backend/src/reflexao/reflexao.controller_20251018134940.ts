import { Controller,B, Body, Post } from '@nestjs/common';
import { ReflexaoService } from './reflexao.service';
@Controller('reflexao')
export class ReflexaoController {
  constructor(private readonly reflexaoService: ReflexaoService) {}

}
