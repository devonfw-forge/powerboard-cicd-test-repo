import { Test, TestingModule } from '@nestjs/testing';
import { EmailMockService } from '../../../../test/mockedServices/email.service.mock';
import { SendEmailDTO } from '../model/dto/SendEmail.dto';
import { EmailController } from './email.controller';

describe('EmailController', () => {
  let emailController: EmailController;
  let emailService: EmailMockService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: 'IEmailService',
          useClass: EmailMockService,
        },
      ],
    }).compile();

    emailController = module.get<EmailController>(EmailController);
    emailService = module.get<EmailMockService>('IEmailService');
  });

  it('should be defined after module initialization', () => {
    expect(emailController).toBeDefined();
    expect(emailService).toBeDefined();
  });

  describe('sendEmailToNewUser', () => {
    it('should send templated email to new user', async () => {
      const sendEmailDTO = {
        toEmail: 'abc@mail.com',
        username: 'abc',
        defaultPassword: 'abcdef',
        fullName: 'abc def',
      } as SendEmailDTO;

      await emailController.sendEmailToNewUser(sendEmailDTO);
      expect(emailService.sendTeamplateEmail).toBeCalled();
      expect(emailService.sendTeamplateEmail).toBeCalledTimes(1);
    });
  });
});
