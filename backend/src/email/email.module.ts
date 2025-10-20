import { Module, Res } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/email.config';
import EmailService from './services/email.service';
import RecoverPasswordEmailService from './services/recover-password-email.service';
import { TemplatesModule } from '@/templates/templates.module';

@Module({
  imports: [ConfigModule.forFeature(emailConfig), TemplatesModule],
  providers: [EmailService, RecoverPasswordEmailService],
  exports: [RecoverPasswordEmailService],
})
export class EmailModule {}
