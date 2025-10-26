import {
  Controller,
  Get,
  Query,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import JwtAuthGuard from '@/auth/guards/jwt-auth.guard';
import PeriodDateDto from './dto/periodDate.dto';
import { User } from '@/auth/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('reflections')
  async generateReflectionsReport(
    @User('sub') userId: string,
    @Query() period: PeriodDateDto,
  ) {
    const result = await this.reportsService.generateReflectionReport(
      userId,
      period.startDate,
      period.endDate,
    );

    return new StreamableFile(result.buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${result.filename}"`,
      length: result.buffer.length,
    });
  }
}
