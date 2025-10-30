import type { ConfigType } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import emailConfig from '../config/email.config';
import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { TemplatesService } from '@/templates/templates.service';

@Injectable()
export default class EmailService implements OnModuleDestroy {
  protected transporter: Transporter;
  protected readonly logger = new Logger(EmailService.name);

  constructor(
    @Inject(emailConfig.KEY)
    protected readonly emailConfiguration: ConfigType<typeof emailConfig>,
    private readonly templatesService: TemplatesService,
  ) {
    // Check if email configuration is available
    if (!this.emailConfiguration.user || !this.emailConfiguration.pass) {
      this.logger.warn('Email configuration is incomplete. Email service will not be functional.');
      return;
    }

    try {
      // Initialize the transporter using the email configuration
      this.transporter = createTransport({
        service: 'gmail',
        auth: {
          user: this.emailConfiguration.user,
          pass: this.emailConfiguration.pass,
        },
      });

      this.logger.debug('Email transporter initialized');
    } catch (error) {
      this.logger.error('Failed to initialize email transporter', error);
    }
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
        {
          service: 'email',
        },
      );
    }

    this.logger.debug(
      `Sending email to: ${options.to} with subject: ${options.subject}`,
    );

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
        this.logger.debug('Closing email transporter');
        this.transporter.close();
      }
    } catch (error) {
      this.logger.error('Error closing email transporter', error);
    }
  }
}
