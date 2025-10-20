import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { TemplatesModule } from '@/templates/templates.module';
import { PdfController } from './pdf.controller';

@Module({
  imports: [TemplatesModule],
  providers: [PdfService],
  controllers: [PdfController],
  exports: [PdfService],
})
export class PdfModule {}
