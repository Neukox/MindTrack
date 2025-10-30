import type { ConfigType } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import emailConfig from '../config/email.config';
import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { TemplatesService } from '@/templates/templates.service';

@Injectable()
export default class EmailService implements OnModuleDestroy {
  protected transporter: Transporter;
  protected readonly logger = new Logger(EmailService.name);
  private useTestAccount = false;

  constructor(
    @Inject(emailConfig.KEY)
    protected readonly emailConfiguration: ConfigType<typeof emailConfig>,
    private readonly templatesService: TemplatesService,
  ) {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    // Check if email configuration is available
    if (!this.emailConfiguration.user || !this.emailConfiguration.pass) {
      this.logger.warn('Email credentials not configured. Using test account.');
      await this.createTestAccount();
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

      this.logger.debug('Gmail transporter initialized');
    } catch (error) {
      this.logger.error('Failed to initialize Gmail transporter, falling back to test account', error);
      await this.createTestAccount();
    }
  }

  private async createTestAccount() {
    try {
      // Create a test account using nodemailer
      const nodemailer = require('nodemailer');
      const testAccount = await nodemailer.createTestAccount();

      this.transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      this.useTestAccount = true;
      this.logger.debug(`Test email account created: ${testAccount.user}`);
      this.logger.debug(`Test account password: ${testAccount.pass}`);
      this.logger.debug('Preview emails at: https://ethereal.email');
    } catch (error) {
      this.logger.error('Failed to create test account', error);
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
    if (!this.transporter) {
      throw new Error(
        'Email service is not configured. Please check your email environment variables.',
      );
    }

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
