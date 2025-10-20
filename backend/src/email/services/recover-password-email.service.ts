import type { ConfigType } from '@nestjs/config';
import EmailService from './email.service';
import emailConfig from '../config/email.config';
import { Injectable } from '@nestjs/common';
import { TemplatesService } from '@/templates/templates.service';

@Injectable()
export default class RecoverPasswordEmailService extends EmailService {
  constructor(
    protected readonly config: ConfigType<typeof emailConfig>,
    templatesService: TemplatesService,
  ) {
    super(config, templatesService);
  }

  async sendRecoverPasswordEmail(to: string, name: string, resetUrl: string) {
    const subject = 'Redefinição de senha';

    const context = {
      name,
      resetUrl,
    };

    return this.sendEmail({
      to,
      subject,
      template: 'recover-password',
      context,
    });
  }
}
