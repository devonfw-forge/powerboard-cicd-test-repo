import { Module } from '@nestjs/common';
import { EmailController } from './controller/email.controller';
import { EmailService } from './services/email.service';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [
    {
      provide: 'IEmailService',
      useClass: EmailService,
    },
  ],
  exports: ['IEmailService'],
})
export class EmailModule {}
