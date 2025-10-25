import { Injectable } from '@nestjs/common';
import { MetricsService } from '@/metrics/metrics.service';

@Injectable()
export class DiasConsecutivosService {
  constructor(private readonly metricsService: MetricsService) {}

  /**
   * Calcula quantos dias consecutivos o usuário tem criado reflexões.
   * Agora delega toda a lógica para MetricsService.
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
      const result = await this.metricsService.getConsecutiveDays(userId);

      return {
        success: true,
        data: {
          diasConsecutivos: result.diasConsecutivos,
          dataUltimaReflexao: result.dataUltimaReflexao,
          sequenciaAtual: result.sequenciaAtual,
        },
      };
    } catch (error) {
      throw new Error(`Erro ao calcular dias consecutivos: ${error.message}`);
    }
  }

  /**
   * Obtém estatísticas detalhadas sobre dias consecutivos.
   * Delegado para MetricsService.getConsecutiveDaysDetailed
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
      const stats =
        await this.metricsService.getConsecutiveDaysDetailed(userId);

      return {
        success: true,
        data: {
          diasConsecutivosAtual: stats.diasConsecutivosAtual,
          maiorSequencia: stats.maiorSequencia,
          totalDiasComReflexoes: stats.totalDiasComReflexoes,
          percentualDiasAtivos: stats.percentualDiasAtivos,
          ultimosDias: stats.ultimosDias,
        },
      };
    } catch (error) {
      throw new Error(
        `Erro ao obter estatísticas detalhadas: ${error.message}`,
      );
    }
  }
}
