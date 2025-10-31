import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { TemplatesModule } from '@/templates/templates.module';

@Module({
  imports: [TemplatesModule],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
