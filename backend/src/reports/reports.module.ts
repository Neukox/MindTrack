import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TemplatesModule } from '@/templates/templates.module';
import { PdfModule } from '@/pdf/pdf.module';
import { ReflexaoModule } from '@/reflexao/reflexao.module';
import { MetricsModule } from '@/metrics/metrics.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    TemplatesModule,
    PdfModule,
    UserModule,
    ReflexaoModule,
    MetricsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
