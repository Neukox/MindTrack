import {
  Controller,
  Get,
  Req,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { DiasConsecutivosService } from './dias-consecutivos.service';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    username: string;
    email: string;
  };
}

@Controller('dias-consecutivos')
@UseGuards(JwtAuthGuard)
export class DiasConsecutivosController {
  constructor(
    private readonly diasConsecutivosService: DiasConsecutivosService,
  ) {}

  /**
   * GET /dias-consecutivos
   * Retorna o número de dias consecutivos que o usuário tem criado reflexões
   */
  @Get()
  async getDiasConsecutivos(@Req() req: AuthenticatedRequest) {
    try {
      const userId = req.user.sub;
      const result =
        await this.diasConsecutivosService.calcularDiasConsecutivos(userId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Dias consecutivos calculados com sucesso',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro interno do servidor ao calcular dias consecutivos',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /dias-consecutivos/estatisticas
   * Retorna estatísticas detalhadas sobre dias consecutivos
   */
  @Get('estatisticas')
  async getEstatisticasDetalhadas(@Req() req: AuthenticatedRequest) {
    try {
      const userId = req.user.sub;
      const result =
        await this.diasConsecutivosService.obterEstatisticasDetalhadas(userId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Estatísticas detalhadas obtidas com sucesso',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro interno do servidor ao obter estatísticas detalhadas',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
