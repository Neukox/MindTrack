import { User } from '@/auth/decorators/user.decorator';
import { ReflexaoService } from '@/reflexao/reflexao.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import JwtAuthGuard from '@/auth/guards/jwt-auth.guard';
import StreakMetricService from './streak-metric.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly reflexaoService: ReflexaoService,
    private readonly streakMetricService: StreakMetricService,
  ) {}

  @ApiOperation({
    summary: 'Obter resumo das métricas de reflexões do usuário',
    description:
      'Retorna um resumo das métricas relacionadas às reflexões do usuário, incluindo totais, categorias, emoções e registros do semestre atual.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
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
  
  @ApiOperation({
    summary: 'Obter métricas de emoções das reflexões do usuário',
    description:
      'Retorna métricas detalhadas sobre as emoções expressas nas reflexões do usuário.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  @Get('emotion')
  async getEmotionMetrics(@User('sub') userId: string) {
    return this.metricsService.getReflectionsEmotionMetrics(userId);
  }
  
  @ApiOperation({
    summary: 'Obter métricas de categorias das reflexões do usuário',
    description:
      'Retorna métricas detalhadas sobre as categorias das reflexões do usuário.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  @Get('category')
  async getCategoryMetrics(@User('sub') userId: string) {
    return this.metricsService.getReflectionsCategoryMetrics(userId);
  }
  
  @ApiOperation({
    summary: 'Obter métricas semanais das reflexões do usuário',
    description:
      'Retorna métricas detalhadas sobre as reflexões do usuário na última semana.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  @Get('week')
  async getWeeklyMetrics(@User('sub') userId: string) {
    return this.metricsService.getReflectionsPerWeekMetrics(userId);
  }
  
  @Get('week/frequency')
  @ApiOperation({
    summary: 'Obter frequência semanal de reflexões do usuário',
    description:
      'Retorna a frequência de reflexões feitas pelo usuário nas últimas 5 semanas.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  async getWeeklyFrequency(@User('sub') userId: string) {
    return this.metricsService.getFrequencyPerWeeks(userId);
  }
  
  @ApiOperation({
    summary: 'Obter métricas semestrais das reflexões do usuário',
    description:
      'Retorna métricas detalhadas sobre as reflexões do usuário no semestre atual.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  }) 
  @Get('semester')
  async getSemesterMetrics(@User('sub') userId: string) {
    return this.metricsService.getTotalReflectionsThisSemester(userId);
  }
  
  @ApiOperation({
    summary: 'Obter métricas de streaks do usuário',
    description:
      'Retorna métricas detalhadas sobre os dias consecutivos em que o usuário fez reflexões.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado',
  })
  @Get('streak')
  async getStreakMetrics(@User('sub') userId: string) {
    return this.streakMetricService.getConsecutiveDaysDetailed(userId);
  }
}
