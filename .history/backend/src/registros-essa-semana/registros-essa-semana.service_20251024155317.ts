import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegistrosEssaSemanaService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca todos os registros (reflexões) da semana atual para um usuário específico
   * @param userId - ID do usuário
   * @returns Promise com array de reflexões da semana atual
   */
  async getRegistrosEssaSemana(userId: string) {
    const now = new Date();
    
    // Calcula o início da semana (domingo)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Calcula o fim da semana (sábado)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    try {
      const registros = await this.prisma.reflection.findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfWeek,
            lte: endOfWeek,
          },
        },
        select: {
          id: true,
          title: true,
          category: true,
          emotion: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        success: true,
        data: registros,
        meta: {
          total: registros.length,
          weekStart: startOfWeek,
          weekEnd: endOfWeek,
        },
      };
    } catch (error) {
      throw new Error(`Erro ao buscar registros da semana: ${error.message}`);
    }
  }

  /**
   * Busca estatísticas resumidas dos registros da semana atual
   * @param userId - ID do usuário
   * @returns Promise com estatísticas da semana
   */
  async getEstatisticasEssaSemana(userId: string) {
    const now = new Date();
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    try {
      // Busca registros da semana atual
      const registrosEssaSemana = await this.prisma.reflection.count({
        where: {
          userId,
          createdAt: {
            gte: startOfWeek,
            lte: endOfWeek,
          },
        },
      });

      // Busca registros da semana anterior para comparação
      const startOfLastWeek = new Date(startOfWeek);
      startOfLastWeek.setDate(startOfWeek.getDate() - 7);
      
      const endOfLastWeek = new Date(startOfWeek);
      endOfLastWeek.setTime(startOfWeek.getTime() - 1);

      const registrosSemanaAnterior = await this.prisma.reflection.count({
        where: {
          userId,
          createdAt: {
            gte: startOfLastWeek,
            lte: endOfLastWeek,
          },
        },
      });

      // Calcula crescimento percentual
      const crescimento = registrosSemanaAnterior > 0 
        ? ((registrosEssaSemana - registrosSemanaAnterior) / registrosSemanaAnterior) * 100
        : registrosEssaSemana > 0 ? 100 : 0;

      return {
        success: true,
        data: {
          registrosEssaSemana,
          registrosSemanaAnterior,
          crescimentoPercentual: Math.round(crescimento * 100) / 100,
          weekStart: startOfWeek,
          weekEnd: endOfWeek,
        },
      };
    } catch (error) {
      throw new Error(`Erro ao buscar estatísticas da semana: ${error.message}`);
    }
  }
}
