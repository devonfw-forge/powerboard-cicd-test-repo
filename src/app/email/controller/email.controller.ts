import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IEmailService } from '../services/email.service.interface';
//import { Response as eResponse } from 'express';
import { SendEmailDTO } from '../model/dto/SendEmail.dto';
//import { IMultimediaService } from '../../multimedia/services/multimedia.crud.service.interface';

@Controller('email')
export class EmailController {
  constructor(@Inject('IEmailService') public emailService: IEmailService) {}

  // @Post('/send')
  // async sendEmail(@Body() sendEmailDTO: SendEmailDTO): Promise<void> {
  //   console.log('Recipient');
  //   console.log(sendEmailDTO);
  //   return this.emailService.sendMail(sendEmailDTO);

  //   // if (result) res.status(200).json({ message: 'mail successfully sent' });
  // }
  @Post('/send/template')
  async sendEmailToNewUser(@Body() sendEmailDTO: SendEmailDTO): Promise<void> {
    console.log('Recipient');
    console.log(sendEmailDTO);
    return this.emailService.sendTeamplateEmail(sendEmailDTO);

    // if (result) res.status(200).json({ message: 'mail successfully sent' });
  }
}
