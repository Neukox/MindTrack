import {
  Controller,
  Body,
  Post,
  Get,
  Query,
  Param,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
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
    summary: 'Obter reflexões do usuário atual',
    description:
      'Retorna as reflexões do usuário autenticado baseado no token JWT.',
  })
  @ApiResponse({
    status: 200,
    description: 'Reflexões obtidas com sucesso.',
  })
  @Get('minhas-reflexoes')
  @UseGuards(JwtAuthGuard)
  async getMinhasReflexoes(
    @Query() filters: ReflectionFiltersDto,
    @Request() req: any,
  ) {
    const userId: string = req.user?.sub;

    if (!userId) {
      throw new BadRequestException(
        'Token inválido: usuário não identificado.',
      );
    }

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
  @UseGuards(JwtAuthGuard)
  async createReflexao(
    @Body() createRefelctionDto: CreateReflectionDto,
    @Request() req: any,
  ) {
    // Extrair userId do token JWT
    const userId: string = req.user?.sub;

    if (!userId) {
      throw new BadRequestException(
        'Token inválido: usuário não identificado.',
      );
    }

    // Adicionar userId ao DTO
    const reflexaoData = {
      ...createRefelctionDto,
      userId,
    };

    await this.reflexaoService.create(reflexaoData);

    return {
      message: 'Reflexão criada com sucesso.',
    };
  }

  @ApiOperation({
    summary: 'Obter frequência semanal de registros',
    description: 'Retorna a frequência de registros criados por semana.',
  })
  @ApiResponse({
    status: 200,
    description: 'Frequência semanal obtida com sucesso.',
  })
  @Get('frequencia-semanal')
  @UseGuards(JwtAuthGuard)
  async getFrequenciaSemanal(@Request() req: any) {
    const userId: string = req.user?.sub;

    if (!userId) {
      throw new BadRequestException(
        'Token inválido: usuário não identificado.',
      );
    }

    const frequencia = await this.reflexaoService.getFrequenciaSemanal(userId);
    return frequencia;
  }

  @ApiOperation({
    summary: 'Obter estatísticas de categorias',
    description: 'Retorna estatísticas sobre as categorias mais usadas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas de categorias obtidas com sucesso.',
  })
  @Get('categorias-estatisticas')
  @UseGuards(JwtAuthGuard)
  async getCategoriasEstatisticas(@Request() req: any) {
    const userId: string = req.user?.sub;

    if (!userId) {
      throw new BadRequestException(
        'Token inválido: usuário não identificado.',
      );
    }

    const categorias =
      await this.reflexaoService.getCategoriasEstatisticas(userId);
    return categorias;
  }

  @ApiOperation({
    summary: 'Obter estatísticas de emoções',
    description: 'Retorna estatísticas sobre as emoções mais registradas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas de emoções obtidas com sucesso.',
  })
  @Get('emocoes-estatisticas')
  @UseGuards(JwtAuthGuard)
  async getEmocoesEstatisticas(@Request() req: any) {
    const userId: string = req.user?.sub;

    if (!userId) {
      throw new BadRequestException(
        'Token inválido: usuário não identificado.',
      );
    }

    const emocoes = await this.reflexaoService.getEmocoesEstatisticas(userId);
    return emocoes;
  }
}
