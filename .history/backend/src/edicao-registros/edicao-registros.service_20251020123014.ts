import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import prisma from '../lib/prisma.client';
import { Category, Emotion } from '../../generated/prisma';

type UpdateReflexaoPayload = {
  title?: string;
  category?: Category;
  content?: string;
  emotion?: Emotion;
};

@Injectable()
export class EdicaoRegistrosService {
  private prisma = prisma;

  // Algoritmo para editar uma reflexão existente
  async updateReflexao(
    reflexaoId: string,
    userId: string,
    updateData: UpdateReflexaoPayload,
  ): Promise<any> {
    try {
      if (!reflexaoId || !userId) {
        throw new BadRequestException(
          'ID da reflexão e ID do usuário são obrigatórios.',
        );
      }

      console.log('Editando reflexão:', reflexaoId, 'para usuário:', userId);
      console.log('Dados para atualização:', updateData);

      // Verifica se a reflexão existe e pertence ao usuário
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexaoExistente = await this.prisma.reflection.findFirst({
        where: {
          id: reflexaoId,
          userId, // Garante que só pode editar reflexões próprias
        },
      });

      if (!reflexaoExistente) {
        throw new NotFoundException(
          'Reflexão não encontrada ou não pertence ao usuário.',
        );
      }

      // Remove campos undefined/null do objeto de atualização
      const dadosLimpos = Object.fromEntries(
        Object.entries(updateData).filter(
          ([_, value]) => value !== undefined && value !== null,
        ),
      );

      if (Object.keys(dadosLimpos).length === 0) {
        throw new BadRequestException(
          'Pelo menos um campo deve ser fornecido para atualização.',
        );
      }

      // Atualiza a reflexão
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexaoAtualizada = await this.prisma.reflection.update({
        where: {
          id: reflexaoId,
        },
        data: {
          ...dadosLimpos,
          updatedAt: new Date(), // Atualiza timestamp
        },
      });

      console.log('Reflexão atualizada com sucesso:', reflexaoAtualizada);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return reflexaoAtualizada;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      console.error('Erro ao editar reflexão:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    }
  }

  // Algoritmo para excluir uma reflexão existente
  async deleteReflexao(reflexaoId: string, userId: string): Promise<void> {
    try {
      if (!reflexaoId || !userId) {
        throw new BadRequestException(
          'ID da reflexão e ID do usuário são obrigatórios.',
        );
      }

      console.log('Excluindo reflexão:', reflexaoId, 'do usuário:', userId);

      // Verifica se a reflexão existe e pertence ao usuário
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexaoExistente = await this.prisma.reflection.findFirst({
        where: {
          id: reflexaoId,
          userId, // Garante que só pode excluir reflexões próprias
        },
      });

      if (!reflexaoExistente) {
        throw new NotFoundException(
          'Reflexão não encontrada ou não pertence ao usuário.',
        );
      }

      // Exclui a reflexão
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.prisma.reflection.delete({
        where: {
          id: reflexaoId,
        },
      });

      console.log('Reflexão excluída com sucesso:', reflexaoId);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      console.error('Erro ao excluir reflexão:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    }
  }

  // Algoritmo para excluir múltiplas reflexões
  async deleteMultipleReflexoes(
    reflexaoIds: string[],
    userId: string,
  ): Promise<{ deletedCount: number; notFound: string[] }> {
    try {
      if (!reflexaoIds || reflexaoIds.length === 0 || !userId) {
        throw new BadRequestException(
          'Lista de IDs das reflexões e ID do usuário são obrigatórios.',
        );
      }

      console.log(
        'Excluindo múltiplas reflexões:',
        reflexaoIds,
        'do usuário:',
        userId,
      );

      // Verifica quais reflexões existem e pertencem ao usuário
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexoesExistentes = await this.prisma.reflection.findMany({
        where: {
          id: { in: reflexaoIds },
          userId, // Garante que só pode excluir reflexões próprias
        },
        select: { id: true },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const idsEncontrados = reflexoesExistentes.map((r: any) => r.id);
      const idsNaoEncontrados = reflexaoIds.filter(
        (id) => !idsEncontrados.includes(id),
      );

      // Exclui as reflexões encontradas
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const resultado = await this.prisma.reflection.deleteMany({
        where: {
          id: { in: idsEncontrados },
          userId,
        },
      });

      console.log(
        'Reflexões excluídas:',
        resultado.count,
        'Não encontradas:',
        idsNaoEncontrados,
      );

      return {
        deletedCount: resultado.count,
        notFound: idsNaoEncontrados,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Erro ao excluir múltiplas reflexões:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    }
  }

  // Algoritmo para edição em lote (múltiplas reflexões)
  async updateMultipleReflexoes(
    reflexaoIds: string[],
    userId: string,
    updateData: UpdateReflexaoPayload,
  ): Promise<{ updatedCount: number; notFound: string[] }> {
    try {
      if (!reflexaoIds || reflexaoIds.length === 0 || !userId) {
        throw new BadRequestException(
          'Lista de IDs das reflexões e ID do usuário são obrigatórios.',
        );
      }

      // Remove campos undefined/null do objeto de atualização
      const dadosLimpos = Object.fromEntries(
        Object.entries(updateData).filter(
          ([_, value]) => value !== undefined && value !== null,
        ),
      );

      if (Object.keys(dadosLimpos).length === 0) {
        throw new BadRequestException(
          'Pelo menos um campo deve ser fornecido para atualização.',
        );
      }

      console.log(
        'Editando múltiplas reflexões:',
        reflexaoIds,
        'do usuário:',
        userId,
      );
      console.log('Dados para atualização:', dadosLimpos);

      // Verifica quais reflexões existem e pertencem ao usuário
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexoesExistentes = await this.prisma.reflection.findMany({
        where: {
          id: { in: reflexaoIds },
          userId, // Garante que só pode editar reflexões próprias
        },
        select: { id: true },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const idsEncontrados = reflexoesExistentes.map((r: any) => r.id);
      const idsNaoEncontrados = reflexaoIds.filter(
        (id) => !idsEncontrados.includes(id),
      );

      // Atualiza as reflexões encontradas
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const resultado = await this.prisma.reflection.updateMany({
        where: {
          id: { in: idsEncontrados },
          userId,
        },
        data: {
          ...dadosLimpos,
          updatedAt: new Date(),
        },
      });

      console.log(
        'Reflexões atualizadas:',
        resultado.count,
        'Não encontradas:',
        idsNaoEncontrados,
      );

      return {
        updatedCount: resultado.count,
        notFound: idsNaoEncontrados,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Erro ao editar múltiplas reflexões:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    }
  }
}
