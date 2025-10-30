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
      this.logger.error('❌ EMAIL NÃO CONFIGURADO!');
      this.logger.error('Para enviar emails reais, configure no arquivo .env:');
      this.logger.error('EMAIL_USER=seu_email@gmail.com');
      this.logger.error('EMAIL_PASS=sua_senha_de_app_gmail');
      this.logger.error('EMAIL_FROM=seu_email@gmail.com');
      this.logger.error('');
      this.logger.error('📋 COMO GERAR SENHA DE APP DO GMAIL:');
      this.logger.error('1. Vá para myaccount.google.com');
      this.logger.error('2. Segurança > Verificação em duas etapas (ative)');
      this.logger.error('3. Segurança > Senhas de app');
      this.logger.error('4. Selecione "Email" e gere a senha');
      this.logger.error('5. Use essa senha no EMAIL_PASS');
      this.logger.error('');
      throw new Error('Email configuration required for sending real emails');
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

      // Test the connection
      await this.transporter.verify();
      this.logger.log('✅ Gmail transporter initialized and verified successfully');
    } catch (error) {
      this.logger.error('❌ Failed to initialize Gmail transporter:', error.message);
      this.logger.error('Verifique suas credenciais no arquivo .env');
      throw error;
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

    if (this.useTestAccount) {
      const nodemailer = require('nodemailer');
      const previewUrl = nodemailer.getTestMessageUrl(info);
      this.logger.debug(`Email preview URL: ${previewUrl}`);
    }

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
