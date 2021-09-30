import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  UserRoleRepositoryMock,
  UserTeamRepositoryMock,
} from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { Team } from '../../../teams/model/entities/team.entity';
import { User } from '../model/entities/user.entity';

import { UserRole } from '../model/entities/user_role.entity';
import { UserTeam } from '../model/entities/user_team.entity';
import { UserPrivilegeService } from './user-privilege.service';
import { UserTeamService } from './user-team.service';
import { IUserTeamService } from './user-team.service.interface';

describe('UserPrivilegeService', () => {
  let userRoleRepo: UserRoleRepositoryMock;
  let userPrivilegeService: UserPrivilegeService;
  let userTeamService: IUserTeamService;
  let userTeamRepo: UserTeamRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserPrivilegeService,

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
    userTeamService = module.get<UserTeamService>('IUserTeamService');
    userPrivilegeService = module.get<UserPrivilegeService>(UserPrivilegeService);
    userTeamRepo = module.get<UserTeamRepositoryMock>(getRepositoryToken(UserTeam));
  });

  it('should be defined after module initialization', () => {
    expect(userRoleRepo).toBeDefined();
    expect(userTeamService).toBeDefined();
    expect(userTeamRepo).toBeDefined();
  });

  describe('getUserPrivilegeForTeam()', () => {
    describe('getPrivilegesList()', () => {
      it(' getPrivilegesList() method should return all the privileges of that particular user', async () => {
        const user = new User();
        const team = new Team();
        const userRole = {
          id: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
          version: 1,
          createdAt: '2021-06-25T08:25:00.982Z',
          updatedAt: '2021-06-25T08:25:00.982Z',
          roleName: 'team_member',
          description: '',
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
        const userTeam: any = {
          user: user,
          team: team,
          role: userRole,
        };
        const privilegesName = ['view_meeting_links', 'view_team_links'];
        expect(userPrivilegeService.getPrivilegeList(userTeam)).toEqual(privilegesName);
      });
    });
  });

  describe('getAllPrivileges()', () => {
    const user = new User();
    user.id = '647f8ce6-b5c4-4935-b5ae-816053477065';
    it('getAllPrivileges() method should return all the privileges of that particular user if the user is present', async () => {
      const privilegesName: string[] = ['view_meeting_links', 'view_team_links'];
      const userTeam = new UserTeam();
      jest.spyOn(userTeamService, 'findUserTeamForAdmin').mockResolvedValue(userTeam);
      jest.spyOn(userPrivilegeService, 'getPrivilegeList').mockImplementation(() => privilegesName);
      expect(await userPrivilegeService.getAllPrivilegeForAdmin(user.id)).toEqual(privilegesName);
    });

    it('getAllPrivileges() method should throw error if the user is not present', async () => {
      jest.spyOn(userTeamService, 'findUserTeamForAdmin').mockImplementation(undefined);
      try {
        await userPrivilegeService.getAllPrivilegeForAdmin(user.id);
      } catch (e) {
        expect(e.message).toMatch('privileges not found');
      }
    });
  });

  describe('getAllUserRoles()', () => {
    it('getAllUserRoles() should fetch all user roles', async () => {
      const userRoles: UserRole[] = [];
      const roleList = new Array();
      jest.spyOn(userRoleRepo, 'find').mockImplementation(() => userRoles);
      expect(await userPrivilegeService.getAllUserRoles()).toEqual(roleList);
    });

    it('getAllUserRoles() should throw error if user is not present', async () => {
      jest.spyOn(userRoleRepo, 'find').mockImplementation(() => undefined);
      try {
        await userPrivilegeService.getAllUserRoles();
      } catch (e) {
        expect(e.message).toMatch('No Roles Found');
      }
    });
  });
});
