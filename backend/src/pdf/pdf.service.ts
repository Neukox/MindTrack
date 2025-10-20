import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { Browser } from 'puppeteer';

@Injectable()
export class PdfService implements OnModuleInit, OnApplicationShutdown {
  private browser: Browser;
  private readonly logger = new Logger(PdfService.name);

  async onModuleInit() {
    try {
      const puppeteer = require('puppeteer');
      this.browser = await puppeteer.launch({
        headleess: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      this.logger.log('Puppeteer browser launched');
    } catch (error) {
      this.logger.error('Error launching Puppeteer browser', error);
    }
  }

  async onApplicationShutdown() {
    if (this.browser) {
      await this.browser.close();
      this.logger.log('Puppeteer browser closed');
    }
  }

  async generatePdf(
    html: string,
    options: Record<string, any> = {},
  ): Promise<Buffer> {
    if (!this.browser) {
      throw new Error('Puppeteer browser is not initialized');
    }

    let page;

    try {
      page = await this.browser.newPage();

      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
        ...options,
      });

      return pdfBuffer;
    } catch (error) {
      this.logger.error('Error generating PDF', error);
      throw error;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }
}
