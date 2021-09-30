import { TestingModule, Test } from '@nestjs/testing';
import { UserPrivilegeMockService } from '../../../../../test/mockedServices/user-privilege.service.mock';
import { UserSessionDetailsMockService } from '../../../../../test/mockedServices/user-session-details.service.mock';
import { UserTeamMockService } from '../../../../../test/mockedServices/user-team.service.mock';
import { UserMockService } from '../../../../../test/mockedServices/user.service.mock';
import { User } from '../model/entities/user.entity';
import { UserRole } from '../model/entities/user_role.entity';
import { UserController } from './user.controller';

describe('Auth Controller', () => {
  let userController: UserController;
  let userService: UserMockService;
  let userPrivilegeService: UserPrivilegeMockService;
  let userSessionDetailsService: UserSessionDetailsMockService;
  let userTeamService: UserTeamMockService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // PassportModule.register({ defaultStrategy: 'none' }),
      ],

      controllers: [UserController],
      providers: [
        {
          provide: 'IUserService',
          useClass: UserMockService,
        },
        {
          provide: 'IUserPrivilegeService',
          useClass: UserPrivilegeMockService,
        },
        {
          provide: 'IUserSessionDetailsService',
          useClass: UserSessionDetailsMockService,
        },
        //
        {
          provide: 'IUserTeamService',
          useClass: UserTeamMockService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserMockService>('IUserService');
    userPrivilegeService = module.get<UserPrivilegeMockService>('IUserPrivilegeService');
    userSessionDetailsService = module.get<UserSessionDetailsMockService>('IUserSessionDetailsService');
    userTeamService = module.get<UserTeamMockService>('IUserTeamService');
  });

  it('should be defined after module initialization', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
    expect(userPrivilegeService).toBeDefined();
    expect(userSessionDetailsService).toBeDefined();
    expect(userTeamService).toBeDefined();
  });
  describe('getAllMemberOfTeam', () => {
    it('should return all the members of a team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const getAllMembers = {} as User[];
      jest.spyOn(userTeamService, 'getAllMemberOfTeam').mockImplementation(() => getAllMembers);
      await userController.getAllMemberOfTeam(teamId, mockResponse);
      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);
    });
  });

  describe('deleteUserFromTeamById', () => {
    it('should delete the member from a team', async () => {
      const userTeamId = '762f1dfd-43e9-4cc4-8257-a6ba5c70e33d';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
        message: jest.fn(),
      };
      // const getAllMembers = {} as User[];
      //jest.spyOn(userTeamService, 'deleteUserFromTeamById').mockImplementation(() => getAllMembers);
      await userController.deleteUserFromTeamById(userTeamId, mockResponse);
      expect(userTeamService.deleteUserFromTeamById).toBeCalled();
      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);
      // expect(mockResponse.status.json.message).toBe("User successfully Removed from Team")
    });
  });
  describe('updateUserRole', () => {
    it('should update user role', async () => {
      const updateUserRoleDTO = {
        userId: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        roleId: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
      };
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
        message: jest.fn(),
      };
      const updatedUser = {} as User;

      jest.spyOn(userTeamService, 'updateUserRole').mockImplementation(() => updatedUser);
      await userController.updateUserRole(updateUserRoleDTO, mockResponse);
      expect(userTeamService.updateUserRole).toBeCalledWith(updateUserRoleDTO);
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.status).toBeCalledTimes(1);
    });
  });

  describe('getAllUserRoles', () => {
    it('should return all the user roles', async () => {
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
        message: jest.fn(),
      };
      const userRoles = {} as UserRole[];
      jest.spyOn(userPrivilegeService, 'getAllUserRoles').mockImplementation(() => userRoles);
      await userController.getAllUserRoles(mockResponse);
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.status).toBeCalledTimes(1);
    });
  });
  describe('updateLastLoggedProject', () => {
    it('should update the project with last logged in project', async () => {
      const updateLastLoggedProject = {
        userId: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      };
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
        message: jest.fn(),
      };

      // jest.spyOn(userSessionDetailsService, 'updateLastLoggedInProject').mockImplementation(() =>)
      await userController.updateLastLoggedProject(updateLastLoggedProject, mockResponse);
      expect(userSessionDetailsService.updateLastLoggedInProject).toBeCalledWith(updateLastLoggedProject);
      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);
    });
  });
});
