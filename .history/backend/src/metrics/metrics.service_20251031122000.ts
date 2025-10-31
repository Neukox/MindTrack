import DateUtils from '@/common/date.util';
import { ReflexaoService } from '@/reflexao/reflexao.service';
import { Reflection } from '@generated/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsService {
  constructor(private readonly reflexaoService: ReflexaoService) {}

  /**
   * Filtra reflexões por um intervalo de datas (inclusive)
   */
  async filterReflectionsByDateRange(
    reflections: Reflection[],
    startDate: Date,
    endDate: Date,
  ) {
    return reflections.filter((ref) => {
      const createdAt = new Date(ref.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });
  }

  /**
   * Gera estatísticas de contagem/porcentagem por tipo (category | emotion)
   */
  async getStatsByType(
    reflections: Reflection[],
    type: 'category' | 'emotion',
    mappedKeys?: Record<string, string>,
  ) {
    console.log(
      `Calculando estatísticas para ${type} com ${reflections.length} reflexões`,
    );
    console.log('MappedKeys:', mappedKeys);

    const stats: Record<string, Record<string, number>> = {};

    reflections.forEach((reflection) => {
      const originalKey = reflection[type];
      const key =
        mappedKeys && mappedKeys[reflection[type]]
          ? mappedKeys[reflection[type]]
          : reflection[type];

      console.log(`Reflection ${type}: ${originalKey} -> ${key}`);

      stats[key] = stats[key] || { count: 0 };
      stats[key]['count'] = (stats[key]['count'] as number) + 1;
    });

    const total = reflections.length;

    for (const key in stats) {
      const count = stats[key]['count'] as number;
      const percentage = total > 0 ? (count / total) * 100 : 0;
      stats[key]['total'] = total;
      stats[key]['percentage'] = parseFloat(percentage.toFixed(2));
    }

    console.log(`Estatísticas finais para ${type}:`, stats);
    return stats;
  }

  /**
   * Retorna total e variação do semestre corrente comparado ao semestre anterior.
   */
  async getTotalReflectionsThisSemester(userId: string) {
    const now = new Date();
    const { start, end } = DateUtils.getSemesterRange(now);

    const reflections = await this.reflexaoService.findAllByUser(userId, {});

    const filteredReflections = await this.filterReflectionsByDateRange(
      reflections,
      start,
      end,
    );

    const total = filteredReflections.length;

    const lastSemesterStart = new Date(start);
    lastSemesterStart.setMonth(lastSemesterStart.getMonth() - 6);
    const lastSemesterEnd = new Date(end);
    lastSemesterEnd.setMonth(lastSemesterEnd.getMonth() - 6);

    const lastSemesterReflections = await this.filterReflectionsByDateRange(
      reflections,
      lastSemesterStart,
      lastSemesterEnd,
    );

    const lastTotal = lastSemesterReflections.length;

    const difference = total - lastTotal;
    const percentageChange =
      lastTotal === 0
        ? total === 0
          ? 0
          : 100
        : (difference / lastTotal) * 100;

    return {
      registrosEsseSemestre: total,
      registrosSemestreAnterior: lastTotal,
      crescimentoPercentual: percentageChange,
      semesterStart: start,
      semesterEnd: end,
    };
  }

  /**
   * Estatísticas por categoria
   */
  async getReflectionsCategoryMetrics(userId: string) {
    const reflections = await this.reflexaoService.findAllByUser(userId, {});
    const categoryStats = await this.getStatsByType(reflections, 'category');

    return categoryStats;
  }

  /**
   * Estatísticas por emoção
   */
  async getReflectionsEmotionMetrics(userId: string) {
    const reflections = await this.reflexaoService.findAllByUser(userId, {});
    const emotionStats = await this.getStatsByType(reflections, 'emotion');

    return emotionStats;
  }

  /**
   * Métricas por semana (semana atual x semana anterior)
   */
  async getReflectionsPerWeekMetrics(userId: string) {
    const { start, end } = DateUtils.getWeekRange(new Date());

    const reflections = await this.reflexaoService.findAllByUser(userId, {});

    const weeklyReflections = await this.filterReflectionsByDateRange(
      reflections,
      start,
      end,
    );

    const count = weeklyReflections.length;

    const lastWeekRange = DateUtils.getWeekRange(new Date(start.getTime() - 1));

    const lastWeekReflections = await this.filterReflectionsByDateRange(
      reflections,
      lastWeekRange.start,
      lastWeekRange.end,
    );

    const lastWeekCount = lastWeekReflections.length;

    const difference = count - lastWeekCount;
    const percentageChange =
      lastWeekCount === 0
        ? count === 0
          ? 0
          : 100
        : (difference / lastWeekCount) * 100;

    return {
      registrosEssaSemana: count,
      registrosSemanaAnterior: lastWeekCount,
      crescimentoPercentual: percentageChange,
      weekStart: start,
      weekEnd: end,
    };
  }

  /**
   * Frequência de reflexõe das ultimas 5 semanas
   */
  async getFrequencyPerWeeks(userId: string) {
    const reflections = await this.reflexaoService.findAllByUser(userId, {});

    const frequencyMap: Record<number, number> = {};
    const periodMap: Record<number, string> = {};

    for (let i = 4; i >= 0; i--) {
      const weekRange = DateUtils.getWeekRange(
        new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000),
      );
      const weeklyReflections = await this.filterReflectionsByDateRange(
        reflections,
        weekRange.start,
        weekRange.end,
      );
      const weekLabel = i + 1;
      frequencyMap[weekLabel] = weeklyReflections.length;
      periodMap[weekLabel] =
        `${DateUtils.formatToPtBr(weekRange.start)} á ${DateUtils.formatToPtBr(
          weekRange.end,
        )}`;
    }

    const frequencyArray = Object.keys(frequencyMap).map((week) => ({
      week: parseInt(week),
      count: frequencyMap[week],
      period: periodMap[week],
    }));

    return frequencyArray;
  }
}
