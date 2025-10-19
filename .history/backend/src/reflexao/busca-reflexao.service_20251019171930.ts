import { Injectable, BadRequestException } from '@nestjs/common';
import prisma from '../lib/prisma.client';

@Injectable()
export class BuscaReflexaoService {
  private prisma = prisma;

  async getReflexoesByUser(userId: string): Promise<any[]> {
    try {
      if (!userId) {
        throw new BadRequestException('ID do usuário é obrigatório.');
      }

      console.log('Buscando reflexões para userId:', userId);

      // Busca todas as reflexões do usuário ordenadas por data de criação
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexoes = await this.prisma.reflection.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      console.log('Reflexões encontradas:', reflexoes);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log('Quantidade de reflexões:', reflexoes?.length || 0);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return reflexoes;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Erro ao buscar reflexões:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    }
  }

  async getReflexaoById(id: string, userId: string): Promise<any> {
    try {
      if (!id || !userId) {
        throw new BadRequestException(
          'ID da reflexão e do usuário são obrigatórios.',
        );
      }

      // Busca uma reflexão específica garantindo que pertence ao usuário
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexao = await this.prisma.reflection.findFirst({
        where: {
          id,
          userId, // Garante que só pode buscar reflexões próprias
        },
      });

      if (!reflexao) {
        throw new BadRequestException(
          'Reflexão não encontrada ou não pertence ao usuário.',
        );
      }

      // Retorna a reflexão encontrada
      return reflexao;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Erro ao buscar reflexão:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    }
  }

  async getReflexoesByCategory(
    userId: string,
    category: string,
  ): Promise<any[]> {
    try {
      if (!userId || !category) {
        throw new BadRequestException(
          'ID do usuário e categoria são obrigatórios.',
        );
      }

      // Busca reflexões por categoria específica do usuário
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexoes = await this.prisma.reflection.findMany({
        where: {
          userId,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          category: category as any, // Converte para enum Category
        },
        orderBy: { createdAt: 'desc' },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return reflexoes;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Erro ao buscar reflexões por categoria:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    }
  }
}
