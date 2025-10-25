import { User } from '@/auth/decorators/user.decorator';
import { ReflexaoService } from '@/reflexao/reflexao.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import JwtAuthGuard from '@/auth/guards/jwt-auth.guard';
import StreakMetricService from './streak-metric.service';

@UseGuards(JwtAuthGuard)
@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly reflexaoService: ReflexaoService,
    private readonly streakMetricService: StreakMetricService,
  ) {}

  @Get('summary')
  async getSummary(@User('sub') userId: string) {
    const reflections = await this.reflexaoService.findAllByUser(userId, {});

    const totalReflections = reflections.length;

    const categoryStats = await this.metricsService.getStatsByType(
      reflections,
      'category',
    );

    const emotionStats = await this.metricsService.getStatsByType(
      reflections,
      'emotion',
    );

    const totalThisSemester =
      await this.metricsService.getTotalReflectionsThisSemester(userId);

    return {
      total: totalReflections,
      categorias: categoryStats,
      emocoes: emotionStats,
      semestre: totalThisSemester.registrosEsseSemestre,
    };
  }

  @Get('emotion')
  async getEmotionMetrics(@User('sub') userId: string) {
    return this.metricsService.getReflectionsEmotionMetrics(userId);
  }

  @Get('category')
  async getCategoryMetrics(@User('sub') userId: string) {
    return this.metricsService.getReflectionsCategoryMetrics(userId);
  }

  @Get('week')
  async getWeeklyMetrics(@User('sub') userId: string) {
    return this.metricsService.getReflectionsPerWeekMetrics(userId);
  }

  @Get('semester')
  async getSemesterMetrics(@User('sub') userId: string) {
    return this.metricsService.getTotalReflectionsThisSemester(userId);
  }

  @Get('streak')
  async getStreakMetrics(@User('sub') userId: string) {
    return this.streakMetricService.getConsecutiveDaysDetailed(userId);
  }
}
