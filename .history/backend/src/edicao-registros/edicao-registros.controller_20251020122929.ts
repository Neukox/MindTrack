import { 
  Controller, 
  Put, 
  Delete, 
  Param, 
  Body, 
  HttpStatus, 
  HttpCode 
} from '@nestjs/common';
import { EdicaoRegistrosService } from './edicao-registros.service';
import { Category, Emotion } from '../../generated/prisma';

@Controller('edicao-registros')
export class EdicaoRegistrosController {
  constructor(private readonly edicaoRegistrosService: EdicaoRegistrosService) {}

  // Endpoint para editar uma reflexão específica
  @Put('reflexao/:id/usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async updateReflexao(
    @Param('id') reflexaoId: string,
    @Param('userId') userId: string,
    @Body() updateData: {
      title?: string;
      category?: Category;
      content?: string;
      emotion?: Emotion;
    },
  ): Promise<any> {
    return await this.edicaoRegistrosService.updateReflexao(
      reflexaoId,
      userId,
      updateData,
    );
  }

  // Endpoint para excluir uma reflexão específica
  @Delete('reflexao/:id/usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async deleteReflexao(
    @Param('id') reflexaoId: string,
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    await this.edicaoRegistrosService.deleteReflexao(reflexaoId, userId);
    return { message: 'Reflexão excluída com sucesso.' };
  }

  // Endpoint para excluir múltiplas reflexões
  @Delete('reflexoes/usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async deleteMultipleReflexoes(
    @Param('userId') userId: string,
    @Body() body: { reflexaoIds: string[] },
  ): Promise<{
    message: string;
    deletedCount: number;
    notFound: string[];
  }> {
    const resultado = await this.edicaoRegistrosService.deleteMultipleReflexoes(
      body.reflexaoIds,
      userId,
    );

    return {
      message: `${resultado.deletedCount} reflexão(ões) excluída(s) com sucesso.`,
      deletedCount: resultado.deletedCount,
      notFound: resultado.notFound,
    };
  }

  // Endpoint para editar múltiplas reflexões
  @Put('reflexoes/usuario/:userId')
  @HttpCode(HttpStatus.OK)
  async updateMultipleReflexoes(
    @Param('userId') userId: string,
    @Body() body: {
      reflexaoIds: string[];
      updateData: {
        title?: string;
        category?: Category;
        content?: string;
        emotion?: Emotion;
      };
    },
  ): Promise<{
    message: string;
    updatedCount: number;
    notFound: string[];
  }> {
    const resultado = await this.edicaoRegistrosService.updateMultipleReflexoes(
      body.reflexaoIds,
      userId,
      body.updateData,
    );

    return {
      message: `${resultado.updatedCount} reflexão(ões) atualizada(s) com sucesso.`,
      updatedCount: resultado.updatedCount,
      notFound: resultado.notFound,
    };
  }
}
