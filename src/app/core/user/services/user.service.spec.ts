import { HttpService } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http/http.module';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  TeamSpiritRepositoryMock,
  UserRepositoryMock,
  UserRoleRepositoryMock,
  UserSessionDetailsRepositoryMock,
  UserTeamRepositoryMock,
} from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { TeamSpiritMedian } from '../../../dashboard/team-spirit/model/entities/team-spirit-median.entity';
import { TeamSpiritCrudService } from '../../../dashboard/team-spirit/services/team-spirit.crud.service';
import { ITeamSpiritService } from '../../../dashboard/team-spirit/services/team-spirit.interface';
import { EmailService } from '../../../email/services/email.service';
import { IEmailService } from '../../../email/services/email.service.interface';
import { ChangePasswordDTO } from '../../auth/model/ChangePasswordDTO';
import { UserDTO } from '../model/dto/UserDTO';

import { User } from '../model/entities/user.entity';

import { UserRole } from '../model/entities/user_role.entity';
import { UserSession } from '../model/entities/user_session.entity';

import { UserTeam } from '../model/entities/user_team.entity';
import { UserSessionDetailsService } from './user-session-details.service';
import { IUserSessionDetailsService } from './user-session-details.service.interface';
import { UserTeamService } from './user-team.service';
import { IUserTeamService } from './user-team.service.interface';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpservice: HttpService;
  let userRepo: UserRepositoryMock;
  let userRoleRepo: UserRoleRepositoryMock;
  let userTeamRepo: UserTeamRepositoryMock;
  let userSessionRepo: UserSessionDetailsRepositoryMock;
  let teamSpiritRepo: TeamSpiritRepositoryMock;
  let teamSpiritService: ITeamSpiritService;
  let userTeamService: IUserTeamService;
  let userSessionDetailsService: IUserSessionDetailsService;
  let emailService: IEmailService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UserService,
        // TeamSpiritCrudService,

        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
        },
        {
          provide: 'IUserTeamService',
          useClass: UserTeamService,
        },
        {
          provide: 'IEmailService',
          useClass: EmailService,
        },
        {
          provide: 'ITeamSpiritService',
          useClass: TeamSpiritCrudService,
        },
        {
          provide: 'IUserSessionDetailsService',
          useClass: UserSessionDetailsService,
        },
        {
          provide: getRepositoryToken(UserRole),
          useClass: UserRoleRepositoryMock,
        },
        {
          provide: getRepositoryToken(UserTeam),
          useClass: UserTeamRepositoryMock,
        },
        {
          provide: getRepositoryToken(UserSession),
          useClass: UserSessionDetailsRepositoryMock,
        },
        {
          provide: getRepositoryToken(TeamSpiritMedian),
          useClass: TeamSpiritRepositoryMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    httpservice = module.get<HttpService>(HttpService);
    userRepo = module.get<UserRepositoryMock>(getRepositoryToken(User));
    userRoleRepo = module.get<UserRoleRepositoryMock>(getRepositoryToken(UserRole));
    userTeamRepo = module.get<UserTeamRepositoryMock>(getRepositoryToken(UserTeam));
    userSessionRepo = module.get<UserSessionDetailsRepositoryMock>(getRepositoryToken(UserSession));
    teamSpiritRepo = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpiritMedian));
    teamSpiritService = module.get<TeamSpiritCrudService>('ITeamSpiritService');
    userTeamService = module.get<UserTeamService>('IUserTeamService');
    userSessionDetailsService = module.get<UserSessionDetailsService>('IUserSessionDetailsService');
    emailService = module.get<EmailService>('IEmailService');
  });

  it('should be defined after module initialization', () => {
    expect(userService).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(userRoleRepo).toBeDefined();
    expect(userTeamRepo).toBeDefined();
    expect(userSessionRepo).toBeDefined();
    expect(teamSpiritRepo).toBeDefined();
    expect(httpservice).toBeDefined();
    expect(teamSpiritService).toBeDefined();
    expect(userTeamService).toBeDefined();
    expect(userSessionDetailsService).toBeDefined();
    expect(emailService).toBeDefined();
  });

  it('findUser() should return the User successfully if the user is present', async () => {
    const userName = 'Diamler Deveops';
    const user = new User();
    jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
    expect(await userService.findOne(userName)).toEqual(user);
  });

  describe('registerUser', () => {
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

    const registeredUser = {
      username: 'Don123',
      password: '$2b$12$JJWE6fH5ETCT6V0CaIqKg.SykLpP355W89Gizxn3T35VW1vE/LNh6',
      email: 'don123@mail.com',
      id: '647f8ce6-b5c4-4935-b5ae-816053477065',
      version: 1,
      createdAt: '2021-07-08T04:21:47.308Z',
      updatedAt: '2021-07-08T04:21:47.308Z',
    };

    it('registerUser() should register the User successfully if the user is not already present', async () => {
      // const userDTO = {} as UserDTO;

      const registerUserToOtherTeam = new UserTeam();
      const userSession = new UserSession();
      const emailSent = {};
      //const registerUserToOtherTeam = undefined;
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => undefined);
      jest.spyOn(userRepo, 'save').mockImplementation(() => registeredUser);
      jest.spyOn(emailService, 'sendTeamplateEmail').mockImplementation(() => emailSent);
      jest.spyOn(userTeamService, 'addUserToTeam').mockResolvedValue(registerUserToOtherTeam);
      jest.spyOn(userSessionDetailsService, 'registerUserIntoUserSession').mockResolvedValue(userSession);
      const actualResponse = await userService.registerUser(userDTO);
      expect(actualResponse).toEqual(registerUserToOtherTeam);
    });
    it('registerUser() should successfully register the existing user to other team', async () => {
      const user = new User();
      const userTeam = new UserTeam();
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
      jest.spyOn(userTeamService, 'addUserToTeam').mockResolvedValue(userTeam);
      expect(await userService.registerUser(userDTO)).toEqual(userTeam);
    });

    it('registerUser() should throw error message if the user is already present in that team', async () => {
      const user = new User();
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
      const message = 'User in team already exists';
      jest.spyOn(userTeamService, 'addUserToTeam').mockResolvedValue(message);
      const actualResponse = await userService.registerUser(userDTO);
      expect(actualResponse).toEqual(message);
    });
  });

  describe('changePassword()', () => {
    const changePasswordDTO = {
      userId: '35afbdf8-9035-4bc6-ae04-28c6140495ad',
      oldPassword: 'password',
      newPassword: 'siva456',
    } as ChangePasswordDTO;

    it('changePassword() method should change the password of a user successfully if user is present', async () => {
      const user = {
        id: '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        version: 1,
        createdAt: '2021-07-06T09:54:59.595Z',
        updatedAt: '2021-07-06T09:54:59.595Z',
        username: 'siva11',
        password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
        email: 'siva@capgemini.com',
      } as User;

      //const updatedUser = new User();
      const updatedUser = {
        id: '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        version: 1,
        createdAt: '2021-07-06T09:54:59.595Z',
        updatedAt: '2021-07-06T09:54:59.595Z',
        username: 'siva11',
        password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fm',
        email: 'siva@capgemini.com',
      } as User;

      const userSession = new UserSession();
      userSession.userId = user.id;
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
      jest.spyOn(userRepo, 'save').mockImplementation(() => updatedUser);
      //jest.spyOn(userSessionRepo, 'save').mockImplementation(() => userInfo);
      jest.spyOn(userSessionDetailsService, 'updateUserSessionAfterPasswordChange').mockResolvedValue(userSession);
      expect(await userService.changePassword(changePasswordDTO)).toEqual(updatedUser);
    });

    it('changePassword() method should throw error if user is not present', async () => {
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => undefined);
      try {
        await userService.changePassword(changePasswordDTO);
      } catch (e) {
        expect(e.message).toMatch('User Not found');
      }
    });
  });

  describe('deleteGuestById()', () => {
    it('deleteGuestById() should delete guest user if it is present', async () => {
      const guestId = '35afbdf8-9035-4bc6-ae04-28c6140495ad';
      const user = new User();
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);

      expect(await userService.deleteGuestById(guestId)).toBe(undefined);
    });
    it('deleteGuestById() should throw error if user is not present', async () => {
      const guestId = '35afbdf8-9035-4bc6-ae04-28c6140495ad';

      jest.spyOn(userRepo, 'findOne').mockImplementation(() => undefined);
      try {
        await userService.deleteGuestById(guestId);
      } catch (e) {
        expect(e.message).toMatch('User not found');
      }
    });
  });
});
