import type { ConfigType } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import emailConfig from '../config/email.config';
import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { TemplatesService } from '@/templates/templates.service';

@Injectable()
export default class EmailService implements OnModuleDestroy {
  protected transporter: Transporter;
  protected readonly logger = new Logger(EmailService.name);
  private isInitialized = false;

  constructor(
    @Inject(emailConfig.KEY)
    protected readonly emailConfiguration: ConfigType<typeof emailConfig>,
    private readonly templatesService: TemplatesService,
  ) {
    // Initialize transporter without blocking startup
    this.initializeTransporter().catch((error) => {
      this.logger.error('Failed to initialize email service:', error.message);
    });
  }

  private async initializeTransporter() {
    // Check if email configuration is available
    if (!this.emailConfiguration.user || !this.emailConfiguration.pass) {
      this.logger.warn(
        '⚠️ EMAIL NÃO CONFIGURADO - Sistema funcionará sem envio de emails',
      );
      this.logger.warn('Para configurar, defina no arquivo .env:');
      this.logger.warn('EMAIL_USER=seu_email@gmail.com');
      this.logger.warn('EMAIL_PASS=sua_senha_de_app_gmail');
      return; // Don't throw error, just return
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
        secure: false, // Always false for port 587
        auth: {
          user: this.emailConfiguration.user,
          pass: this.emailConfiguration.pass,
        },
        tls: {
          rejectUnauthorized: false,
          ciphers: 'SSLv3',
        },
        connectionTimeout: 30000, // 30 seconds
        greetingTimeout: 15000, // 15 seconds
        socketTimeout: 30000, // 30 seconds
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        rateLimit: 14, // max 14 messages/second
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
      this.isInitialized = true;
    } catch (error) {
      this.logger.error(
        '❌ Failed to initialize Gmail transporter:',
        error.message,
      );
      this.logger.warn(
        '⚠️ Sistema continuará funcionando, mas emails não serão enviados',
      );
      this.logger.warn(
        'Para corrigir, configure credenciais válidas no arquivo .env',
      );
      // Don't throw error, just log and continue
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
    if (!this.transporter || !this.isInitialized) {
      throw new Error(
        'Email service is not configured properly. Please check your email environment variables.',
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
