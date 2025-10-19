import {
  Controller,
  Get,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { BuscaReflexaoService } from './busca-reflexao.service';

@Controller('busca-reflexao')
export class BuscaReflexaoController {
  constructor(private readonly buscaReflexaoService: BuscaReflexaoService) {}

  @Get('usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async getReflexoesByUser(@Param('userId') userId: string): Promise<any[]> {
    return await this.buscaReflexaoService.getReflexoesByUser(userId);
  }

  @Get('reflexao/:id/usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async getReflexaoById(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<any> {
    return await this.buscaReflexaoService.getReflexaoById(id, userId);
  }

  @Get('categoria/:category/usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async getReflexoesByCategory(
    @Param('category') category: string,
    @Param('userId') userId: string,
  ): Promise<any[]> {
    return await this.buscaReflexaoService.getReflexoesByCategory(
      userId,
      category,
    );
  }

  @Get('emocao/:emotion/usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async getReflexoesByEmotion(
    @Param('emotion') emotion: string,
    @Param('userId') userId: string,
  ): Promise<any[]> {
    return await this.buscaReflexaoService.getReflexoesByEmotion(
      userId,
      emotion,
    );
  }

  @Get('periodo/:startDate/:endDate/usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async getReflexoesByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @Param('userId') userId: string,
  ): Promise<any[]> {
    return await this.buscaReflexaoService.getReflexoesByDateRange(
      userId,
      startDate,
      endDate,
    );
  }

  @Get('filtros/usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async getReflexoesWithFilters(
    @Param('userId') userId: string,
    @Query('category') category?: string,
    @Query('emotion') emotion?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<any[]> {
    return await this.buscaReflexaoService.getReflexoesWithFilters(userId, {
      category,
      emotion,
      startDate,
      endDate,
    });
  }
}
