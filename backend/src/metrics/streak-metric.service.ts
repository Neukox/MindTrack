import { Injectable } from '@nestjs/common';
import DateUtils from '@/common/date.util';
import { ReflexaoService } from '@/reflexao/reflexao.service';
import { Reflection } from '@generated/prisma';

@Injectable()
export default class StreakMetricService {
  constructor(private readonly reflexaoService: ReflexaoService) {}
  /**
   * Agrupa reflexões por dia (retorna array de Date únicos representando dias),
   * ordenado do mais recente para o mais antigo.
   */
  async groupReflectionsByDay(reflections: Reflection[]): Promise<Date[]> {
    const uniqueDays = new Set<string>();

    reflections.forEach((ref) => {
      const day = DateUtils.normalizeToStartOfDay(new Date(ref.createdAt));
      uniqueDays.add(day.toISOString());
    });

    return Array.from(uniqueDays)
      .map((s) => new Date(s))
      .sort((a, b) => b.getTime() - a.getTime()); // mais recente primeiro
  }

  /**
   * Calcula a sequência consecutiva atual a partir de um array de dias ordenado (mais recente primeiro).
   * Retorna o número de dias consecutivos. Se a última reflexão foi há mais de 1 dia, retorna 0.
   */

  calculateCurrentStreakFromDays(dias: Date[]): number {
    if (!dias || dias.length === 0) return 0;

    const hoje = DateUtils.normalizeToStartOfDay(new Date());
    const ultimoDia = DateUtils.normalizeToStartOfDay(new Date(dias[0]));

    const diffToToday = Math.floor(
      (hoje.getTime() - ultimoDia.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffToToday > 1) return 0;

    let streak = 1;
    if (dias.length === 1) return streak;

    for (let i = 0; i < dias.length - 1; i++) {
      const diaAtual = DateUtils.normalizeToStartOfDay(new Date(dias[i]));
      const proximoDia = DateUtils.normalizeToStartOfDay(new Date(dias[i + 1]));
      const diffDays = Math.floor(
        (diaAtual.getTime() - proximoDia.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Calcula a maior sequência histórica a partir de um array de dias ordenado (mais recente primeiro).
   */
  calculateLongestStreakFromDays(dias: Date[]): number {
    if (!dias || dias.length === 0) return 0;

    let longest = 1;
    let current = 1;

    for (let i = 0; i < dias.length - 1; i++) {
      const diaAtual = DateUtils.normalizeToStartOfDay(new Date(dias[i]));
      const proximoDia = DateUtils.normalizeToStartOfDay(new Date(dias[i + 1]));
      const diffDays = Math.floor(
        (diaAtual.getTime() - proximoDia.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 1;
      }
    }

    return longest;
  }

  /**
   * Calcula percentual de dias ativos nos últimos N dias (default 30).
   * Recebe os dias únicos com reflexões já normalizados.
   */
  calculateActiveDaysPercentageFromDays(
    diasComReflexoes: Date[],
    periodoDias = 30,
  ): number {
    const hoje = DateUtils.normalizeToStartOfDay(new Date());
    const periodoInicio = new Date(hoje);
    periodoInicio.setDate(hoje.getDate() - periodoDias);

    const diasNoPeriodo = diasComReflexoes.filter((dia) => {
      const d = DateUtils.normalizeToStartOfDay(new Date(dia));
      return d >= periodoInicio && d <= hoje;
    });

    return Math.round((diasNoPeriodo.length / periodoDias) * 100);
  }

  /**
   * Gera um resumo dos últimos N dias (data string YYYY-MM-DD, temReflexao, quantidadeReflexoes)
   */
  generateLastNDaysSummary(reflections: Reflection[], numeroDias: number) {
    const hoje = DateUtils.normalizeToStartOfDay(new Date());
    const resultado: Array<{
      data: string;
      temReflexao: boolean;
      quantidadeReflexoes: number;
    }> = [];

    for (let i = 0; i < numeroDias; i++) {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() - i);

      const reflexoesNoDia = reflections.filter((r) => {
        const dataRef = DateUtils.normalizeToStartOfDay(new Date(r.createdAt));
        return dataRef.getTime() === dia.getTime();
      });

      resultado.push({
        data: dia.toISOString().split('T')[0],
        temReflexao: reflexoesNoDia.length > 0,
        quantidadeReflexoes: reflexoesNoDia.length,
      });
    }

    return resultado;
  }

  /**
   * Retorna dados básicos da sequência atual de dias consecutivos do usuário.
   * Useful for simple "streak" display.
   */
  async getConsecutiveDays(reflections: Reflection[]): Promise<{
    diasConsecutivos: number;
    dataUltimaReflexao: Date | null;
    sequenciaAtual: boolean;
  }> {
    if (!reflections || reflections.length === 0) {
      return {
        diasConsecutivos: 0,
        dataUltimaReflexao: null,
        sequenciaAtual: false,
      };
    }

    // ordenar por createdAt desc se necessário (algumas implementações do findAllByUser já ordenam)
    const sorted = [...reflections].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const diasComReflexoes = await this.groupReflectionsByDay(sorted);

    const diasConsecutivos =
      this.calculateCurrentStreakFromDays(diasComReflexoes);

    const dataUltimaReflexao = new Date(sorted[0].createdAt);
    const hoje = DateUtils.normalizeToStartOfDay(new Date());
    const ultimoDiaComReflexao = DateUtils.normalizeToStartOfDay(
      new Date(diasComReflexoes[0]),
    );

    const diferencaDias = Math.floor(
      (hoje.getTime() - ultimoDiaComReflexao.getTime()) / (1000 * 60 * 60 * 24),
    );
    const sequenciaAtual = diferencaDias <= 1;

    return {
      diasConsecutivos,
      dataUltimaReflexao,
      sequenciaAtual,
    };
  }

  /**
   * Retorna estatísticas detalhadas relacionadas a dias consecutivos e atividade do usuário.
   * Estrutura compatível com o que DiasConsecutivosService.obterEstatisticasDetalhadas espera como conteudo.data
   */
  async getConsecutiveDaysDetailed(userId: string): Promise<{
    diasConsecutivosAtual: number;
    maiorSequencia: number;
    totalDiasComReflexoes: number;
    percentualDiasAtivos: number;
    ultimosDias: Array<{
      data: string;
      temReflexao: boolean;
      quantidadeReflexoes: number;
    }>;
  }> {
    // Busca todas reflexões com createdAt
    const allReflections = await this.reflexaoService.findAllByUser(userId, {});
    
    // Pega informações básicas de sequência
    const consecutive = await this.getConsecutiveDays(allReflections);

    const diasComReflexoes = await this.groupReflectionsByDay(allReflections);
    const totalDiasComReflexoes = diasComReflexoes.length;
    const maiorSequencia =
      this.calculateLongestStreakFromDays(diasComReflexoes);
    const percentualDiasAtivos = this.calculateActiveDaysPercentageFromDays(
      diasComReflexoes,
      30,
    );
    const ultimosDias = this.generateLastNDaysSummary(allReflections, 7);

    return {
      diasConsecutivosAtual: consecutive.diasConsecutivos,
      maiorSequencia,
      totalDiasComReflexoes,
      percentualDiasAtivos,
      ultimosDias,
    };
  }
}
