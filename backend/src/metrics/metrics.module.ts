import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { ReflexaoModule } from '@/reflexao/reflexao.module';
import { MetricsController } from './metrics.controller';
import StreakMetricService from './streak-metric.service';

@Module({
  imports: [ReflexaoModule],
  providers: [MetricsService, StreakMetricService],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}
