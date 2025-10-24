import { Controller, Body, Post, Get, Query, Param, UseGuards, Request } from '@nestjs/common';
import { ReflexaoService } from './reflexao.service';
import CreateReflectionDto from './dtos/create-reflection.dto';
import ReflectionFiltersDto from './dtos/reflection-flilters.dto';
import { ParamIdPipe } from '@/common/pipes/param-id.pipe';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import JwtAuthGuard from '@/auth/guards/jwt-auth.guard';

@Controller('reflexao')
export class ReflexaoController {
  constructor(private readonly reflexaoService: ReflexaoService) {}

  @ApiOperation({
    summary: 'Obter reflexões por usuário com filtros opcionais',
    description:
      'Retorna uma lista de reflexões associadas a um usuário específico, aplicando filtros opcionais como data e palavras-chave.',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID do usuário cujas reflexões serão obtidas',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 400,
    description: 'ID de usuário inválido',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @Get('usuario/:userId')
  @UseGuards(JwtAuthGuard)
  async getReflexoesByUser(
    @Query() filters: ReflectionFiltersDto,
    @Param('userId', ParamIdPipe) userId: string,
  ) {
    const reflexoes = await this.reflexaoService.findAllByUser(userId, filters);
    return reflexoes;
  }

  @ApiOperation({
    summary: 'Obter reflexão por ID',
    description: 'Retorna uma reflexão específica com base no ID fornecido.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da reflexão a ser obtida',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 400,
    description: 'ID de reflexão inválido',
  })
  @ApiResponse({
    status: 404,
    description: 'Reflexão não encontrada',
  })
  @Get(':id')
  async getReflexaoById(@Param('id', ParamIdPipe) id: string) {
    const reflexao = await this.reflexaoService.findOne(id);
    return reflexao;
  }

  @ApiOperation({
    summary: 'Criar uma nova reflexão',
    description:
      'Cria uma nova reflexão com os dados fornecidos no corpo da requisição.',
  })
  @ApiBody({ type: CreateReflectionDto })
  @ApiResponse({
    status: 201,
    description: 'Reflexão criada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @Post()
  async createReflexao(@Body() createRefelctionDto: CreateReflectionDto) {
    await this.reflexaoService.create(createRefelctionDto);

    return {
      message: 'Reflexão criada com sucesso.',
    };
  }
}
