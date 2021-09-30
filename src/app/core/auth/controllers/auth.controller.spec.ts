import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthMockService } from '../../../../../test/mockedServices/auth.service.mock';
import { PassportModule } from '@nestjs/passport';
import { LoginDTO } from '../model/login.dto';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { User } from '../../user/model/entities/user.entity';
import { ChangePasswordDTO } from '../model/ChangePasswordDTO';
import { HomeResponse } from '../model/HomeResponse';
import { ChangePasswordResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthMockService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'none' })],

      controllers: [AuthController],
      providers: [
        {
          provide: 'IAuthService',
          useClass: AuthMockService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthMockService>('IAuthService');
  });

  it('should be defined after module initialization', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    const user: LoginDTO = {
      username: 'siva',
      password: 'password',
    };
    it('should return the JWT token and login response when the user is correct', async () => {
      const loginResponse = {};
      jest.spyOn(authService, 'login').mockImplementation(() => loginResponse);
      const result = await authController.login(user);
      expect(result).toBeDefined();
    });
    it('should return the error if there is any error from the auth service', async () => {
      jest.spyOn(authService, 'login').mockImplementation(() => undefined);
      expect(await authController.login(user)).toBeUndefined();
      expect(authService.login).toBeCalledWith(user);
    });
  });

  describe('loginGuest', () => {
    it('should return the JWT token and login response when the user is a guest', async () => {
      const user: LoginDTO = {
        username: 'siva',
        password: 'password',
      };
      const loginResponseForGuest = {};
      jest.spyOn(authService, 'loginGuest').mockImplementation(() => loginResponseForGuest);
      const result = await authController.loginGuest(user);
      expect(authService.loginGuest).toBeCalledWith(user);
      expect(result).toBeDefined();
    });
  });
  describe('register', () => {
    it('should return the newly registered User entity', async () => {
      const userDTO = {
        username: 'Don123',
        fullName: ' Don',
        email: 'don123@mail.com',
        role: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        team: {
          id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
          name: 'Team E',
        },
      } as UserDTO;
      //const mockResponse=jest.fn();
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const registeredUser = {} as User;
      jest.spyOn(authService, 'register').mockImplementation(() => registeredUser);
      const result = authController.register(userDTO, mockResponse);
      expect(result).toBeDefined();
      expect(authService.register).toBeCalledWith(userDTO);
      // expect(mockResponse.status).toHaveBeenCalledTimes(1);
      // expect(mockResponse.status).toHaveBeenCalledWith(201)
    });
  });
  describe('changePassword', () => {
    it('should change the password of the user', async () => {
      const changePasswordDTO: ChangePasswordDTO = {
        userId: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        oldPassword: 'password',
        newPassword: 'pass',
      };
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(() => mockResponse),
        json: jest.fn().mockReturnThis(),
      };
      const changePasswordResponse: ChangePasswordResponse = {} as ChangePasswordResponse;
      jest.spyOn(authService, 'changePassword').mockImplementation(() => changePasswordResponse);
      const result = authController.changePassword(changePasswordDTO, mockResponse);
      expect(result).toBeDefined();
      expect(authService.changePassword).toBeCalledWith(changePasswordDTO);
      // expect(mockResponse.status.send).toBeCalledTimes(1);
      // expect(mockResponse.status.send).toBeCalledWith(201);
    });
  });
  describe('getHomeDetailsForUserId', () => {
    it('should home page response for user', async () => {
      const userId = '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      const homeDetailsResponse: HomeResponse = {} as HomeResponse;
      jest.spyOn(authService, 'getHomeDetailsForUserId').mockImplementation(() => homeDetailsResponse);
      await authController.getHomeDetailsForUserId(userId, mockResponse);
      expect(authService.getHomeDetailsForUserId).toBeCalledWith(userId);
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.status).toBeCalledTimes(1);
    });
  });
});
//   it('should return the JWT token when the user is correct', async () => {
// const user: any = {
//   username: 'user1',
//   password: 'user1',
// };

//     const sendMock = {
//       send: jest.fn(),
//     };
//     const mockResponse: any = {
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       status: jest.fn().mockImplementation(_x => sendMock),
//       setHeader: jest.fn(),
//     };
//     const value = await controller.login(user);
//     expect(value).toBeDefined();
//      expect(mockResponse.status).toBeCalledWith(200);
//     expect(sendMock.send).toBeCalledWith();
//     expect(mockResponse.setHeader).toBeCalledWith('Authorization', 'Bearer THISISNOTAJWTTOKEN');
//   });
//   it('should throw an error when the username or password are not correct', async () => {
//     await expect(
//       controller.login(
//         {
//           username: 'user2',
//           password: 'user1',
//           flag: false
//         }
//         // response not needed

//       ),
//     ).rejects.toThrow(UnauthorizedException);
//   });
// });

// describe('register', () => {
//   it('should register the user if not exists', async () => {
//     await expect(
//       controller.register({
//         username: 'user2',
//         password: 'user2',
//         role: 1,
//       } as any),
//     ).resolves.toEqual({ username: 'user2', role: 1 });
//   });
//   it('should throw an error when user already exists', async () => {
//     await expect(
//       controller.register({
//         username: 'user1',
//         password: 'user1',
//         role: 1,
//       } as any),
//     ).rejects.toThrow(BadRequestException);
//   });
// });

// describe('currentUser', () => {
//   it('should return the validated user in the request', () => {
//     const user: any = {
//       username: 'user1',
//     };
//     expect(controller.currentUser(user)).toEqual(user);
//   });
//   // The auth guard will rejects all request if the user is not present or invalid,
//   // so we do not need to test those use case here.
// });
