import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { Browser } from 'puppeteer';

@Injectable()
export class PdfService implements OnModuleInit, OnApplicationShutdown {
  private browser: Browser | null = null;
  private readonly logger = new Logger(PdfService.name);

  async onModuleInit() {
    await this.initializeBrowser();
  }

  private async initializeBrowser() {
    try {
      if (this.browser) {
        await this.browser.close();
      }
      
      const puppeteer = require('puppeteer');
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
      this.logger.log('Puppeteer browser launched successfully');
    } catch (error) {
      this.logger.error('Error launching Puppeteer browser', error);
      this.browser = null;
    }
  }

  async onApplicationShutdown() {
    if (this.browser) {
      await this.browser.close();
      this.logger.log('Puppeteer browser closed');
    }
  }

  async generatePdf(html: string, options: Record<string, any> = {}) {
    if (!this.browser) {
      this.logger.error('Puppeteer browser is not initialized');
      throw new Error('Puppeteer browser is not initialized');
    }

    let page;

    try {
      page = await this.browser.newPage();

      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        omitBackground: false,
        margin: { top: '15px', bottom: '15px', left: '15px', right: '15px' },
        ...options,
      });

      this.logger.debug(
        `PDF generated with options: ${JSON.stringify(options)}`,
      );

      this.logger.log('PDF generation successful');

      return {
        filename: page.title() + '.pdf',
        buffer: pdfBuffer as Buffer,
      };
    } catch (error) {
      this.logger.error('Error generating PDF', error);
      throw error;
    } finally {
      if (page) {
        this.logger.debug('Closing Puppeteer page');
        await page.close();
      }
    }
  }
}
