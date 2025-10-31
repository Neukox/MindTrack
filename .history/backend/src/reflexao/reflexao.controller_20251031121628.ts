import {
  Controller,
  Body,
  Post,
  Get,
  Query,
  Param,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { ReflexaoService } from './reflexao.service';
import CreateReflectionDto from './dtos/create-reflection.dto';
import UpdateReflectionDto from './dtos/update-reflection.dto';
import ReflectionFiltersDto from './dtos/reflection-flilters.dto';
import { ParamIdPipe } from '@/common/pipes/param-id.pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import JwtAuthGuard from '@/auth/guards/jwt-auth.guard';
import ReflectionOwnerGuard from './guards/reflection-owner.guard';
import { User } from '@/auth/decorators/user.decorator';
import type { Response } from 'express';

@Controller('reflexao')
export class ReflexaoController {
  constructor(private readonly reflexaoService: ReflexaoService) {}

  @ApiOperation({
    summary: 'Obter reflexões por usuário com filtros opcionais',
    description:
      'Retorna uma lista de reflexões associadas a um usuário específico, aplicando filtros opcionais como data e palavras-chave.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 400,
    description: 'ID de usuário inválido',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @Get('')
  @UseGuards(JwtAuthGuard)
  async getReflexoesByUser(
    @Query() filters: ReflectionFiltersDto,
    @User('sub') userId: string,
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 400,
    description: 'ID de reflexão inválido',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  @ApiResponse({
    status: 404,
    description: 'Reflexão não encontrada',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Reflexão criada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createReflexao(
    @Body() createRefelctionDto: CreateReflectionDto,
    @User('sub') userId: string,
  ) {
    await this.reflexaoService.create(createRefelctionDto, userId);

    return {
      message: 'Reflexão criada com sucesso.',
    };
  }

  @ApiOperation({
    summary: 'Atualizar uma reflexão existente',
    description:
      'Atualiza uma reflexão existente com os dados fornecidos no corpo da requisição.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da reflexão a ser atualizada',
  })
  @ApiBody({ type: CreateReflectionDto })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Reflexão atualizada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado. Você não é o proprietário desta reflexão.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reflexão não encontrada.',
  })
  @Put(':id')
  @UseGuards(JwtAuthGuard, ReflectionOwnerGuard)
  async updateReflexao(
    @Body() updateReflectionDto: any, // Temporariamente mudando para any
    @Param('id', ParamIdPipe) id: string,
  ) {
    console.log('Dados recebidos para update:', updateReflectionDto);
    console.log('Tipo dos dados:', typeof updateReflectionDto);
    console.log('Keys:', Object.keys(updateReflectionDto));
    console.log('ID da reflexão:', id);

    // Validação manual temporária
    const { title, category, content, emotion } = updateReflectionDto;
    console.log('Campos extraídos:', { title, category, content, emotion });

    try {
      const result = await this.reflexaoService.update(id, updateReflectionDto);
      console.log('Reflexão atualizada:', result);

      return {
        message: 'Reflexão atualizada com sucesso.',
      };
    } catch (error) {
      console.error('Erro no controller:', error);
      throw error;
    }
  }

  @ApiOperation({
    summary: 'Deletar uma reflexão existente',
    description: 'Deleta uma reflexão existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da reflexão a ser deletada',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Reflexão deletada com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado. Você não é o proprietário desta reflexão.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reflexão não encontrada.',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard, ReflectionOwnerGuard)
  async deleteReflexao(@Param('id', ParamIdPipe) id: string) {
    await this.reflexaoService.delete(id);

    return {
      message: 'Reflexão deletada com sucesso.',
    };
  }
}
