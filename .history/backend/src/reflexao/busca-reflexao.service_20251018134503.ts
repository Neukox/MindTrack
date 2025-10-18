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

      // Busca todas as reflexões do usuário ordenadas por data de criação
      // Suprime avisos de tipagem para operações do Prisma

      const reflexoes = await this.prisma.reflection.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      // Retorna as reflexões encontradas

      return reflexoes;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Erro ao buscar reflexões:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    } finally {
      // Fecha a conexão do Prisma para evitar vazamentos de memória
      await this.prisma.$disconnect();
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
      // Suprime avisos de tipagem para operações do Prisma

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
    } finally {
      // Fecha a conexão do Prisma para evitar vazamentos de memória
      await this.prisma.$disconnect();
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
      // Suprime avisos de tipagem para operações do Prisma

      const reflexoes = await this.prisma.reflection.findMany({
        where: {
          userId,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          category: category as any, // Converte para enum Category
        },
        orderBy: { createdAt: 'desc' },
      });

      // Retorna as reflexões encontradas

      return reflexoes;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Erro ao buscar reflexões por categoria:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    } finally {
      // Fecha a conexão do Prisma para evitar vazamentos de memória
      await this.prisma.$disconnect();
    }
  }
}
