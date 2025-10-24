import {
  Controller,
  Get,
  Req,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RegistrosEssaSemanaService } from './registros-essa-semana.service';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    username: string;
    email: string;
  };
}

@Controller('registros-essa-semana')
@UseGuards(JwtAuthGuard)
export class RegistrosEssaSemanaController {
  constructor(
    private readonly registrosEssaSemanaService: RegistrosEssaSemanaService,
  ) {}

  /**
   * GET /registros-essa-semana
   * Retorna todos os registros da semana atual do usuário autenticado
   */
  @Get()
  async getRegistrosEssaSemana(@Req() req: AuthenticatedRequest) {
    try {
      const userId = req.user.sub;
      const result =
        await this.registrosEssaSemanaService.getRegistrosEssaSemana(userId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Registros da semana atual recuperados com sucesso',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro interno do servidor ao buscar registros da semana',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /registros-essa-semana/estatisticas
   * Retorna estatísticas resumidas dos registros da semana atual
   */
  @Get('estatisticas')
  async getEstatisticasEssaSemana(@Req() req: AuthenticatedRequest) {
    try {
      const userId = req.user.sub;
      const result =
        await this.registrosEssaSemanaService.getEstatisticasEssaSemana(userId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Estatísticas da semana atual recuperadas com sucesso',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro interno do servidor ao buscar estatísticas da semana',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
