import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IEmailService } from '../services/email.service.interface';
import { SendEmailDTO } from '../model/dto/SendEmail.dto';

@Controller('email')
export class EmailController {
  constructor(@Inject('IEmailService') public emailService: IEmailService) {}
  @Post('/send/template')
  async sendEmailToNewUser(@Body() sendEmailDTO: SendEmailDTO): Promise<void> {
    console.log('Recipient');
    console.log(sendEmailDTO);
    return this.emailService.sendTeamplateEmail(sendEmailDTO);
  }
}
