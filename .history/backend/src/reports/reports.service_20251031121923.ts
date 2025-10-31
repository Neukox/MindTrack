import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MetricsService } from '@/metrics/metrics.service';
import { PdfService } from '@/pdf/pdf.service';
import { ReflexaoService } from '@/reflexao/reflexao.service';
import { TemplatesService } from '@/templates/templates.service';
import DateUtils from '@/common/date.util';
import {
  CATEGORY_MAPPED,
  EMOTION_MAPPED,
} from '@/reflexao/interfaces/reflection.interface';
import { ReflectionReport } from './interfaces/report-reflection.interface';
import { UserService } from '@/user/user.service';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private readonly templateService: TemplatesService,
    private readonly pdfService: PdfService,
    private readonly userService: UserService,
    private readonly reflexaoService: ReflexaoService,
    private readonly metricsService: MetricsService,
  ) {}

  async generateReflectionReport(
    userId: string,
    startDate: string | Date,
    endDate: string | Date,
  ) {
    const reflections = await this.reflexaoService.findAllByUser(userId, {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    const formattedStartDate = DateUtils.formatToPtBr(new Date(startDate));
    const formattedEndDate = DateUtils.formatToPtBr(new Date(endDate));

    const reflectionsCategoryStats = await this.metricsService.getStatsByType(
      reflections,
      'category',
      CATEGORY_MAPPED,
    );

    const reflectionsEmotionStats = await this.metricsService.getStatsByType(
      reflections,
      'emotion',
      EMOTION_MAPPED,
    );

    this.logger.debug('Estatísticas de categorias:', reflectionsCategoryStats);
    this.logger.debug('Estatísticas de emoções:', reflectionsEmotionStats);

    const reportData: ReflectionReport = {
      pdfGenerationDate: DateUtils.formatToPtBr(new Date()),
      username: user.username,
      totalReflections: reflections.length,
      reflectionsCategoryStats: reflectionsCategoryStats,
      reflectionsEmotionStats: reflectionsEmotionStats,
      periodStart: formattedStartDate,
      periodEnd: formattedEndDate,
      reflections: reflections.map((reflection) => ({
        title: reflection.title,
        createdAt: DateUtils.formatToPtBr(reflection.createdAt),
        category: CATEGORY_MAPPED[reflection.category],
        emotion: EMOTION_MAPPED[reflection.emotion],
        content: reflection.content,
      })),
    };

    const templateHtml = await this.templateService.renderTemplate(
      'relatorio',
      reportData,
      {
        service: 'pdf',
      },
    );

    const result = await this.pdfService.generatePdf(templateHtml, {
      format: 'A4',
      printBackground: true,
    });

    this.logger.log(
      `Relatório de reflexões gerado para o usuário ${userId} (${reflections.length} reflexões)`,
    );

    return result;
  }
}
