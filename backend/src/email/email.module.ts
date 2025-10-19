import { Module, Res } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/email.config';
import EmailService from './services/email.service';
import RecoverPasswordEmailService from './services/recover-password-email.service';

@Module({
  imports: [ConfigModule.forFeature(emailConfig)],
  providers: [EmailService, RecoverPasswordEmailService],
  exports: [RecoverPasswordEmailService],
})
export class EmailModule {}
