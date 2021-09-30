import { SendEmailDTO } from '../model/dto/SendEmail.dto';

export interface IEmailService {
  //sendMail(to: SendEmailDTO): Promise<void>;
  sendTeamplateEmail(sendEmail: SendEmailDTO): any;
  getSES(): any;
}
