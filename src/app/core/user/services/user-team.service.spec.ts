import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  UserRoleRepositoryMock,
  UserTeamRepositoryMock,
} from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { Team } from '../../../teams/model/entities/team.entity';
import { UpdateUserRoleDTO } from '../model/dto/UpdateUserRoleDTO';
import { UserDTO } from '../model/dto/UserDTO';
import { User } from '../model/entities/user.entity';

import { UserRole } from '../model/entities/user_role.entity';
import { UserTeam } from '../model/entities/user_team.entity';
import { UserTeamService } from './user-team.service';
import { IUserTeamService } from './user-team.service.interface';

describe('UserService', () => {
  let userRoleRepo: UserRoleRepositoryMock;
  let userTeamRepo: UserTeamRepositoryMock;
  let userTeamService: IUserTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: 'IUserTeamService',
          useClass: UserTeamService,
        },
        {
          provide: getRepositoryToken(UserRole),
          useClass: UserRoleRepositoryMock,
        },
        {
          provide: getRepositoryToken(UserTeam),
          useClass: UserTeamRepositoryMock,
        },
      ],
    }).compile();

    userRoleRepo = module.get<UserRoleRepositoryMock>(getRepositoryToken(UserRole));
    userTeamRepo = module.get<UserTeamRepositoryMock>(getRepositoryToken(UserTeam));
    userTeamService = module.get<UserTeamService>('IUserTeamService');
  });

  it('should be defined after module initialization', () => {
    expect(userRoleRepo).toBeDefined();
    expect(userTeamRepo).toBeDefined();
    expect(userTeamService).toBeDefined();
  });

  describe('addUserToTeam()', () => {
    const actualUser = {
      id: '83917c53-fcf9-430e-b15c-61dcf5bc97d7',
      version: 1,
      createdAt: '2021-07-06T09:54:59.595Z',
      updatedAt: '2021-07-06T09:54:59.595Z',
      username: 'john123',
      password: '$2b$12$DrXxSYq9dyjOR.eKTYULv.1/ZVt3ZZT0.2kXxam7R9APJf3.3PsDq',
      email: 'john123@mail.com',
    } as User;
    const userDTO = {
      username: 'john123',
      fullName: 'john doe',
      email: 'john123@mail.com',
      role: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
      team: { id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1', name: 'Team E' },
    } as UserDTO;

    const userRole = {
      id: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
      version: 1,
      createdAt: '2021-06-25T08:25:00.982Z',
      updatedAt: '2021-06-25T08:25:00.982Z',
      roleName: 'team_member',
      description: null,
      privilege: [
        {
          id: '80021dfd-43e9-4cc4-8257-a6ba5c70e34d',
          version: 1,
          createdAt: '2021-06-25T08:25:00.982Z',
          updatedAt: '2021-06-25T08:25:00.982Z',
          privilegeName: 'view_meeting_links',
          description: 'For viewing meetings',
        },
        {
          id: '80031dfd-43e9-4cc4-8257-a6ba5c70e34d',
          version: 1,
          createdAt: '2021-06-25T08:25:00.982Z',
          updatedAt: '2021-06-25T08:25:00.982Z',
          privilegeName: 'view_team_links',
          description: 'For viewing team links',
        },
      ],
    };
    const userTeam = new UserTeam();

    it('addUserToTeam() should throw error if the user is already present in the team', async () => {
      jest.spyOn(userRoleRepo, 'findOne').mockImplementation(() => userRole);
      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
      try {
        await userTeamService.addUserToTeam(actualUser, userDTO);
      } catch (e) {
        expect(e.message).toMatch('User in team already exists');
      }
    });

    it('addUserToOtherTeam() should successfully add user to the team if it is not present in the team', async () => {
      jest.spyOn(userRoleRepo, 'findOne').mockImplementation(() => userRole);
      jest.spyOn(userTeamRepo, 'save').mockImplementation(() => userTeam);
      const actualResponse = await userTeamService.addUserToTeam(actualUser, userDTO);
      expect(actualResponse).toEqual(userTeam);
    });
  });

  describe('deleteUserFromTeamById()', () => {
    it('deleteUserFromTeamById() should delete the user from team if it is present there  ', async () => {
      const userTeamID = '83917c53-fcf9-430e-b15c-61dcf5bc97d7';
      const thisUser = new User();
      const existingteam = new Team();
      const userTeam = {
        user: thisUser,
        team: existingteam,
        id: userTeamID,
      };
      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
      expect(await userTeamService.deleteUserFromTeamById(userTeamID)).toBe(undefined);
    });
  });

  it('deleteUserFromTeamById() should delete the user from team if it is present there  ', async () => {
    const userTeamID = '83917c53-fcf9-430e-b15c-61dcf5bc97d9';
    jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => undefined);
    try {
      expect(await userTeamService.deleteUserFromTeamById(userTeamID));
    } catch (e) {
      expect(e.message).toMatch('user not found for that team');
    }
  });
  describe('updateUserRole()', () => {
    const updateUserRoleDTO = {} as UpdateUserRoleDTO;

    it('updateUserRole should successfully update the user role', async () => {
      const userRole = new UserRole();
      //const thisUser = new User();
      const userTeam = new UserTeam();

      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);

      jest.spyOn(userRoleRepo, 'findOne').mockImplementation(() => userRole);
      jest.spyOn(userTeamRepo, 'save').mockImplementation(() => userTeam);
      expect(await userTeamService.updateUserRole(updateUserRoleDTO)).toEqual(userTeam);
    });

    it('updateUserRole should successfully update the user role', async () => {
      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => undefined);
      try {
        await userTeamService.updateUserRole(updateUserRoleDTO);
      } catch (e) {
        expect(e.message).toMatch('User in team not found');
      }
    });
  });

  describe('isSystemAdmin()', () => {
    const userId = '35afbdf8-9035-4bc6-ae04-28c6140495ad';
    const user = new User();
    const team = new Team();
    it(' method should return true if the user role name is system_admin', async () => {
      const userRole = {
        id: '557f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        roleName: 'system_admin',
        description: '',
        privilege: [],
      };
      const userTeam = {
        user: user,
        team: team,
        role: userRole,
      };

      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
      expect(userTeamService.isSystemAdmin(userId)).resolves.toStrictEqual(true);
      //expect(userService.isAdminOrGuest(userId)).toBeTruthy();
    });
    it(' method should return true if the user role name is guest_user', async () => {
      const userRole = {
        id: '557f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        roleName: 'guest_user',
        description: '',
        privilege: [],
      };
      const userTeam = {
        user: user,
        team: team,
        role: userRole,
      };

      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
      expect(userTeamService.isSystemAdmin(userId)).resolves.toStrictEqual(true);
    });

    it(' method should return false if the user role name is not system_admin or guest_user', async () => {
      const userRole = {
        id: '557f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        roleName: 'team_admin',
        description: '',
        privilege: [],
      };
      const userTeam = {
        user: user,
        team: team,
        role: userRole,
      };
      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
      expect(userTeamService.isSystemAdmin(userId)).resolves.toStrictEqual(false);
    });
  });
});
