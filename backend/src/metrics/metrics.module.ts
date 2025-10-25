import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { ReflexaoModule } from '@/reflexao/reflexao.module';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [ReflexaoModule],
  providers: [MetricsService],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}
