// import SES from 'aws-sdk/clients/ses';
// import MockSES from 'aws-sdk/clients/ses';
// import { EmailService } from './email.service';

// describe('EmailService', () => {
//   let emailService: EmailService;
//   test('Should throw error when ses.sendTemplatedEmail.promise() fails', async () => {
//     jest.mock('aws-sdk/clients/ses', () => {
//       const mSES = {
//         sendEmail: jest.fn().mockReturnThis(),
//         promise: jest.fn(),
//       };
//       return jest.fn(() => mSES);
//     });
//     const mSes = new SES();
//     const mError = new Error('This is an SES error');

//     (mSes.sendEmail() as unknown as jest.Mock).mockRejectedValueOnce(mError);
//     // const mockRequest = {};
//     // const mockResponse = {};
//     const sendEmailDTO = {
//       toEmail: 'azharr.hussainn@mail.com',
//       username: 'azhar',
//       defaultPassword: 'efefgar',
//       fullName: 'Azhar Hussain'
//     }
//     const mockNext = jest.fn();
//     await emailService.sendTeamplateEmail(sendEmailDTO);

//     expect(MockSES).toBeCalledWith({ apiVersion: '2010-12-01' });
//     expect(mSes.sendEmail).toBeCalledWith({
//       Source: 'azhariiest@gmail.com',
//       Destination: {
//         ToAddresses: ['azharr.hussainn@mail.com'],
//       },
//       Template: 'tpl',
//       TemplateData: 'data',
//     });
//     expect(mSes.sendTemplatedEmail().promise).toBeCalledTimes(1);
//     expect(mockNext).toHaveBeenCalledWith('internalErrorMessage');
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { SES } from 'aws-sdk';
//import { SES } from 'aws-sdk';
import { EmailService } from './email.service';
//import { EmailService } from './email.service';
import { IEmailService } from './email.service.interface';
let fs = require('fs');
describe('EmailService', () => {
  let emailService: IEmailService;
  //let ses: SES;
  beforeEach(async () => {
    jest.useFakeTimers();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'IEmailService',
          useClass: EmailService,
        },
      ],
    }).compile();

    emailService = module.get<EmailService>('IEmailService');
    //ses = module.get<SES>(SES);
  });

  // afterEach(async () => {
  //   clear();
  // });

  it('should be defined after module initialization', () => {
    expect(emailService).toBeDefined();
    // expect(ses).toBeDefined();
  });

  describe('sendTeamplateEmail()', () => {
    it('should throw error if sendTemplateEmail method fails', async () => {
      const sendEmailDTO = {
        toEmail: 'azhar@mail.com',
        username: 'azhar',
        defaultPassword: 'efefgar',
        fullName: 'Azhar Hussain',
      };

      // const TestData:string = 'This is sample Test Data';
      // fs.readFileSync = jest.fn();
      // fs.readFileSync.mockReturnValue(TestData);
      const fakeSesPromise: any = {
        promise: jest.fn().mockImplementationOnce(() => Promise.reject(new Error('This is an SES error'))),
      };
      const fakeSes: any = {
        sendEmail: () => {
          return fakeSesPromise;
        },
      };
      jest.spyOn(emailService, 'getSES').mockImplementation(() => fakeSes);
      jest.spyOn(fs, 'readFile').mockReturnValueOnce(JSON.stringify({ some: 'data' }));
      //jest.spyOn(ses, 'sendEmail').mockImplementation(fakeSesPromise);
      const result = await emailService.sendTeamplateEmail(sendEmailDTO);
      expect(result).toBeUndefined();
    });
    it('should send the template Email to destined user', done => {
      const sendEmailDTO = {
        toEmail: 'azharr.hussainn@gmail.com',
        username: 'azhar',
        defaultPassword: 'efefgar',
        fullName: 'Azhar Hussain',
      };
      const data = {};
      const fakeSesPromise: any = {
        promise: jest.fn().mockImplementationOnce(() => Promise.resolve(data)),
      };
      const fakeSes: any = {
        sendEmail: () => {
          return fakeSesPromise;
        },
      };

      // jest.spyOn(emailService, 'getSES').mockImplementation(() => fakeSes);
      // jest.spyOn(ses, 'sendEmail').mockImplementation(fakeSesPromise);
      jest.spyOn(emailService, 'getSES').mockImplementation(() => fakeSes);
      jest.spyOn(fs, 'readFile').mockReturnValueOnce(JSON.stringify({ some: 'data' }));
      const result = emailService.sendTeamplateEmail(sendEmailDTO);
      expect(result).toBeDefined();
      done();
    });
    it('should throw error if the file is not found', async () => {
      const sendEmailDTO = {
        toEmail: 'azharr.hussainn@gmail.com',
        username: 'azhar',
        defaultPassword: 'efefgar',
        fullName: 'Azhar Hussain',
      };
      // const data = {}
      // const fakeSesPromise: any = {
      //   promise: jest
      //     .fn()
      //     .mockImplementationOnce(() => Promise.resolve(data))
      // }
      // const fakeSes: any = {
      //   sendEmail: () => {
      //     return fakeSesPromise;
      //   },
      // };
      // const mError = new Error('read file failed');
      jest.spyOn(fs, 'readFile').mockReturnValueOnce(undefined);
      // jest.spyOn(emailService, 'getSES').mockImplementation(() => fakeSes)
      try {
        emailService.sendTeamplateEmail(sendEmailDTO);
      } catch (e) {
        expect(e).rejects.toThrow();
      }
    });
  });
  describe('getSES()', () => {
    it('should return an SES object', async () => {
      const ses = new SES();

      const result = emailService.getSES();
      expect(typeof result).toBe(typeof ses);
    });
  });
});
