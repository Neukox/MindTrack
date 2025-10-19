import type { ConfigType } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import path from 'path';
import emailConfig from '../config/email.config';
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import * as fs from 'fs/promises';
import Handlebars from 'handlebars';

@Injectable()
export default class EmailService implements OnModuleDestroy {
  protected transporter: Transporter;
  protected templatesDir = path.join(__dirname, '..', 'templates');

  constructor(
    @Inject(emailConfig.KEY)
    protected readonly emailConfiguration: ConfigType<typeof emailConfig>,
  ) {
    // Initialize the transporter using the email configuration
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.emailConfiguration.user,
        pass: this.emailConfiguration.pass,
      },
    });
  }

  protected async renderTemplate(
    templateName: string,
    context: Record<string, any>,
  ): Promise<string> {
    const filePath = path.join(this.templatesDir, templateName);
    const content = await fs.readFile(filePath, 'utf-8');
    const compiled = Handlebars.compile(content);
    return compiled(context);
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    template?: string;
    html?: string;
    context?: Record<string, any>;
    from?: string;
    text?: string;
  }) {
    const from = options.from || this.emailConfiguration.user;

    let html = options.html;

    if (options.template) {
      html = await this.renderTemplate(options.template, options.context || {});
    }

    const info = await this.transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html,
      text: options.text,
    });

    return info;
  }

  async onModuleDestroy() {
    try {
      if (this.transporter && typeof this.transporter.close === 'function') {
        this.transporter.close();
      }
    } catch (error) {
      console.error('Error closing email transporter:', error);
    }
  }
}
