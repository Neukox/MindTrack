import { Controller, Get, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { BuscaReflexaoService } from './busca-reflexao.service';

@Controller('busca-reflexao')
export class BuscaReflexaoController {
  constructor(private readonly buscaReflexaoService: BuscaReflexaoService) {}

  // Endpoint de debug para verificar todas as reflexões
  @Get('debug/todas')
  @HttpCode(HttpStatus.OK)
  async getAllReflexoesDebug(): Promise<any[]> {
    return await this.buscaReflexaoService.getAllReflexoesDebug();
  }

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
}
