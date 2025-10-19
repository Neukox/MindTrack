import type { ConfigType } from '@nestjs/config';
import EmailService from './email.service';
import emailConfig from '../config/email.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class RecoverPasswordEmailService extends EmailService {
  constructor(protected readonly config: ConfigType<typeof emailConfig>) {
    super(config);
  }

  async sendRecoverPasswordEmail(
    to: string,
    name: string,
    resetUrl: string,
    token: string,
  ) {
    const subject = 'Redefinição de senha';
    const text = `Olá ${name},\n\nRecebemos uma solicitação para redefinir sua senha. Use o link abaixo:\n\n${resetUrl}\n\nSe não solicitou, ignore este e-mail.\n\nMindTrack - ${new Date().getFullYear()}`;
    const context = {
      name,
      resetUrl,
      token,
    };
    return this.sendEmail({
        to,
        subject,
        context,
        html: text,
        text,
    });
}
}
