import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DiasConsecutivosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Calcula quantos dias consecutivos o usuário tem criado reflexões
   * @param userId - ID do usuário
   * @returns Promise com número de dias consecutivos
   */
  async calcularDiasConsecutivos(userId: string): Promise<{
    success: boolean;
    data: {
      diasConsecutivos: number;
      dataUltimaReflexao: Date | null;
      sequenciaAtual: boolean;
    };
  }> {
    try {
      // Busca todas as reflexões do usuário ordenadas por data (mais recente primeiro)
      const reflexoes = await this.prisma.reflection.findMany({
        where: { userId },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (reflexoes.length === 0) {
        return {
          success: true,
          data: {
            diasConsecutivos: 0,
            dataUltimaReflexao: null,
            sequenciaAtual: false,
          },
        };
      }

      // Agrupa reflexões por dia (apenas a data, sem hora)
      const diasComReflexoes = this.agruparPorDia(reflexoes);
      
      // Calcula dias consecutivos
      const diasConsecutivos = this.calcularSequenciaConsecutiva(diasComReflexoes);
      
      const dataUltimaReflexao = reflexoes[0].createdAt;
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      const ultimoDiaComReflexao = new Date(dataUltimaReflexao);
      ultimoDiaComReflexao.setHours(0, 0, 0, 0);
      
      // Verifica se a sequência está ativa (reflexão hoje ou ontem)
      const diferencaDias = Math.floor((hoje.getTime() - ultimoDiaComReflexao.getTime()) / (1000 * 60 * 60 * 24));
      const sequenciaAtual = diferencaDias <= 1;

      return {
        success: true,
        data: {
          diasConsecutivos,
          dataUltimaReflexao,
          sequenciaAtual,
        },
      };
    } catch (error) {
      throw new Error(`Erro ao calcular dias consecutivos: ${error.message}`);
    }
  }

  /**
   * Agrupa reflexões por dia (remove hora/minuto/segundo)
   * @param reflexoes - Array de reflexões com createdAt
   * @returns Array de datas únicas (apenas dias)
   */
  private agruparPorDia(reflexoes: { createdAt: Date }[]): Date[] {
    const diasUnicos = new Set<string>();
    
    reflexoes.forEach(reflexao => {
      const data = new Date(reflexao.createdAt);
      data.setHours(0, 0, 0, 0);
      diasUnicos.add(data.toISOString());
    });

    return Array.from(diasUnicos)
      .map(dataStr => new Date(dataStr))
      .sort((a, b) => b.getTime() - a.getTime()); // Mais recente primeiro
  }

  /**
   * Calcula a sequência consecutiva de dias
   * @param dias - Array de datas ordenadas (mais recente primeiro)
   * @returns Número de dias consecutivos
   */
  private calcularSequenciaConsecutiva(dias: Date[]): number {
    if (dias.length === 0) return 0;
    if (dias.length === 1) return 1;

    let diasConsecutivos = 1;
    
    for (let i = 0; i < dias.length - 1; i++) {
      const diaAtual = new Date(dias[i]);
      const proximoDia = new Date(dias[i + 1]);
      
      // Calcula diferença em dias
      const diferencaDias = Math.floor(
        (diaAtual.getTime() - proximoDia.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Se a diferença é exatamente 1 dia, continua a sequência
      if (diferencaDias === 1) {
        diasConsecutivos++;
      } else {
        // Se não é consecutivo, para o cálculo
        break;
      }
    }

    return diasConsecutivos;
  }

  /**
   * Obtém estatísticas detalhadas sobre dias consecutivos
   * @param userId - ID do usuário
   * @returns Promise com estatísticas detalhadas
   */
  async obterEstatisticasDetalhadas(userId: string): Promise<{
    success: boolean;
    data: {
      diasConsecutivosAtual: number;
      maiorSequencia: number;
      totalDiasComReflexoes: number;
      percentualDiasAtivos: number;
      ultimosDias: Array<{
        data: string;
        temReflexao: boolean;
        quantidadeReflexoes: number;
      }>;
    };
  }> {
    try {
      // Calcula dias consecutivos atuais
      const { data: diasConsecutivosData } = await this.calcularDiasConsecutivos(userId);
      
      // Busca todas as reflexões para calcular estatísticas
      const todasReflexoes = await this.prisma.reflection.findMany({
        where: { userId },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Calcula total de dias únicos com reflexões
      const diasComReflexoes = this.agruparPorDia(todasReflexoes);
      const totalDiasComReflexoes = diasComReflexoes.length;

      // Calcula maior sequência histórica
      const maiorSequencia = this.calcularMaiorSequenciaHistorica(diasComReflexoes);

      // Calcula percentual de dias ativos (últimos 30 dias)
      const percentualDiasAtivos = this.calcularPercentualDiasAtivos(diasComReflexoes);

      // Gera dados dos últimos 7 dias
      const ultimosDias = this.gerarUltimosDias(todasReflexoes, 7);

      return {
        success: true,
        data: {
          diasConsecutivosAtual: diasConsecutivosData.diasConsecutivos,
          maiorSequencia,
          totalDiasComReflexoes,
          percentualDiasAtivos,
          ultimosDias,
        },
      };
    } catch (error) {
      throw new Error(`Erro ao obter estatísticas detalhadas: ${error.message}`);
    }
  }

  /**
   * Calcula a maior sequência consecutiva histórica
   */
  private calcularMaiorSequenciaHistorica(dias: Date[]): number {
    if (dias.length === 0) return 0;

    let maiorSequencia = 1;
    let sequenciaAtual = 1;

    for (let i = 0; i < dias.length - 1; i++) {
      const diaAtual = new Date(dias[i]);
      const proximoDia = new Date(dias[i + 1]);
      
      const diferencaDias = Math.floor(
        (diaAtual.getTime() - proximoDia.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (diferencaDias === 1) {
        sequenciaAtual++;
        maiorSequencia = Math.max(maiorSequencia, sequenciaAtual);
      } else {
        sequenciaAtual = 1;
      }
    }

    return maiorSequencia;
  }

  /**
   * Calcula percentual de dias ativos nos últimos 30 dias
   */
  private calcularPercentualDiasAtivos(diasComReflexoes: Date[]): number {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const trintaDiasAtras = new Date(hoje);
    trintaDiasAtras.setDate(hoje.getDate() - 30);
    
    const diasNoPeriodo = diasComReflexoes.filter(dia => dia >= trintaDiasAtras);
    
    return Math.round((diasNoPeriodo.length / 30) * 100);
  }

  /**
   * Gera dados dos últimos N dias
   */
  private gerarUltimosDias(reflexoes: { createdAt: Date }[], numeroDias: number): Array<{
    data: string;
    temReflexao: boolean;
    quantidadeReflexoes: number;
  }> {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const resultado: Array<{
      data: string;
      temReflexao: boolean;
      quantidadeReflexoes: number;
    }> = [];
    
    for (let i = 0; i < numeroDias; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() - i);
      
      const reflexoesNoDia = reflexoes.filter(reflexao => {
        const dataReflexao = new Date(reflexao.createdAt);
        dataReflexao.setHours(0, 0, 0, 0);
        return dataReflexao.getTime() === data.getTime();
      });
      
      resultado.push({
        data: data.toISOString().split('T')[0],
        temReflexao: reflexoesNoDia.length > 0,
        quantidadeReflexoes: reflexoesNoDia.length,
      });
    }
    
    return resultado;
  }
}
