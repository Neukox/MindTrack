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
    // Initialize transporter without blocking startup
    this.initializeTransporter().catch(error => {
      this.logger.error('Failed to initialize email service:', error.message);
    });
  }

  private async initializeTransporter() {
    // Check if email configuration is available
    if (!this.emailConfiguration.user || !this.emailConfiguration.pass) {
      this.logger.warn('⚠️ EMAIL NÃO CONFIGURADO - Sistema funcionará sem envio de emails');
      this.logger.warn('Para configurar, defina no arquivo .env:');
      this.logger.warn('EMAIL_USER=seu_email@gmail.com');
      this.logger.warn('EMAIL_PASS=sua_senha_de_app_gmail');
      return; // Don't throw error, just return
    }
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
      // Log configuration for debugging
      this.logger.debug(
        `Configurando email: ${this.emailConfiguration.host}:${this.emailConfiguration.port}`,
      );
      this.logger.debug(`Usuario: ${this.emailConfiguration.user}`);
      this.logger.debug(`Secure: ${this.emailConfiguration.secure}`);

      // Initialize the transporter using configuration from .env
      this.transporter = createTransport({
        host: this.emailConfiguration.host || 'smtp.gmail.com',
        port: this.emailConfiguration.port || 587,
        secure: this.emailConfiguration.secure || false, // true for 465, false for other ports
        auth: {
          user: this.emailConfiguration.user,
          pass: this.emailConfiguration.pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 60000, // 60 seconds
        greetingTimeout: 30000, // 30 seconds
        socketTimeout: 75000, // 75 seconds
      });

      // Test the connection with timeout
      this.logger.debug('Testando conexão SMTP...');
      const verifyPromise = this.transporter.verify();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Connection timeout after 30s')),
          30000,
        ),
      );

      await Promise.race([verifyPromise, timeoutPromise]);
      this.logger.log(
        '✅ Gmail transporter initialized and verified successfully',
      );
    } catch (error) {
      this.logger.error(
        '❌ Failed to initialize Gmail transporter:',
        error.message,
      );
      this.logger.error('Verifique suas credenciais no arquivo .env');
      throw error;
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

    this.logger.log(`✅ Email sent successfully to: ${options.to}`);
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
