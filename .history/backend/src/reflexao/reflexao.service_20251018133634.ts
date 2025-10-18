import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { Category, Emotion } from '../../generated/prisma';

type ReflexaoPayload = {
  title: string;
  category: Category;
  content: string;
  emotion: Emotion;
  userId: string;
};

@Injectable()
export class ReflexaoService {
  private prisma = new PrismaClient();

  async createReflexao(payload: ReflexaoPayload): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { title, category, content, emotion, userId } = payload;

    try {
      // Validações básicas
      if (!title || !category || !content || !emotion || !userId) {
        throw new BadRequestException('Todos os campos são obrigatórios.');
      }

      // Valida se o usuário existe
      const userExists = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        throw new BadRequestException('Usuário não encontrado.');
      }

      // Cria a reflexão
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexaoCreated = await this.prisma.reflection.create({
        data: {
          title,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          category: category as Category,
          content,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          emotion: emotion as Emotion,
          userId,
        },
      });

      console.log('Reflexão criada:', reflexaoCreated);
    } catch (error) {
      // Se for uma BadRequestException, re-lança para o NestJS tratar
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Para outros erros, loga e lança uma exceção genérica
      console.error('Erro ao criar reflexão:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    } finally {
      // Fecha a conexão do Prisma para evitar vazamentos de memória
      await this.prisma.$disconnect();
    }
  }

  async getReflexoesByUser(userId: string): Promise<any[]> {
    try {
      if (!userId) {
        throw new BadRequestException('ID do usuário é obrigatório.');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const reflexoes = await this.prisma.reflection.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

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
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
