import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSessionDetailsRepositoryMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { UpdateLastLoggedTeamDTO } from '../model/dto/UpdateLastLoggedTeamDTO';
import { UserSession } from '../model/entities/user_session.entity';

import { UserSessionDetailsService } from './user-session-details.service';

describe('UserSessionDetailsService', () => {
  let userSessionService: UserSessionDetailsService;
  let userSessionDetailsRepository: UserSessionDetailsRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSessionDetailsService,
        {
          provide: getRepositoryToken(UserSession),
          useClass: UserSessionDetailsRepositoryMock,
        },
      ],
    }).compile();

    userSessionService = module.get<UserSessionDetailsService>(UserSessionDetailsService);
    userSessionDetailsRepository = module.get<UserSessionDetailsRepositoryMock>(getRepositoryToken(UserSession));
  });

  it('should be defined after module initialization', () => {
    expect(userSessionService).toBeDefined();
    expect(userSessionDetailsRepository).toBeDefined();
  });

  describe('registerUserIntoUserSession', () => {
    it('should register the user into the User Session', async () => {
      const userId = '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d';
      const userSession = new UserSession();
      userSession.isPasswordChanged = true;
      userSession.lastCheckedInProjectId = '';
      userSession.userId = userId;
      jest.spyOn(userSessionDetailsRepository, 'save').mockImplementation(() => userSession);
      const result = await userSessionService.registerUserIntoUserSession(userId);
      expect(result).toBe(userSession);
    });
  });
  describe('getUserSessionDetails', () => {
    it('should get the User Session Details of the user', async () => {
      const userId = '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d';
      const userSession: UserSession = {} as UserSession;
      jest.spyOn(userSessionDetailsRepository, 'findOne').mockImplementation(() => userSession);
      expect(await userSessionService.getUserSessionDetails(userId)).toBe(userSession);
    });
  });
  describe('updateUserSessionAfterPasswordChange', () => {
    it('should update user session after password change', async () => {
      const userId = '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d';
      const userSession: UserSession = {} as UserSession;
      userSession.isPasswordChanged = false;
      jest.spyOn(userSessionDetailsRepository, 'findOne').mockImplementation(() => userSession);
      userSession.isPasswordChanged = true;
      jest.spyOn(userSessionDetailsRepository, 'save').mockImplementation(() => userSession);
      expect(await userSessionService.getUserSessionDetails(userId)).toEqual(userSession);
    });
  });
  describe('updateLastLoggedInProject', () => {
    it('should update last logged in project id in user session entity in db', async () => {
      const updateLastLoggedTeamDTO = {
        userId: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      } as UpdateLastLoggedTeamDTO;

      const userSession = {
        id: '55cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        createdAt: '',
        updatedAt: '',
        userId: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        isPasswordChanged: true,
        lastCheckedInProjectId: '',
      } as UserSession;

      jest.spyOn(userSessionDetailsRepository, 'findOne').mockImplementation(() => userSession);
      userSession.lastCheckedInProjectId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      jest.spyOn(userSessionDetailsRepository, 'save').mockImplementation(() => userSession);
      await userSessionService.updateLastLoggedInProject(updateLastLoggedTeamDTO);
      expect(userSessionDetailsRepository.findOne).toBeCalledTimes(1);
      expect(userSessionDetailsRepository.save).toBeCalledTimes(1);
    });
  });
});
