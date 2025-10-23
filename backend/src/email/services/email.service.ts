import type { ConfigType } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import emailConfig from '../config/email.config';
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { TemplatesService } from '@/templates/templates.service';

@Injectable()
export default class EmailService implements OnModuleDestroy {
  protected transporter: Transporter;

  constructor(
    @Inject(emailConfig.KEY)
    protected readonly emailConfiguration: ConfigType<typeof emailConfig>,
    private readonly templatesService: TemplatesService,
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
      html = await this.templatesService.renderTemplate(
        options.template,
        options.context || {},
      );
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
