import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  ADCenterRepositoryMock,
  ClientStatusRepositoryMock,
  CodeQualityRepositoryMock,
  FilesRepositoryMock,
  LinksCategoryMock,
  MultimediaRepositoryMock,
  SprintRepositoryMock,
  TeamLinksMockRepo,
  TeamRepositoryMock,
  TeamSpiritRepositoryMock,
  TeamStatusRepositoryMock,
  UserRepositoryMock,
  UserRoleRepositoryMock,
  UserSessionDetailsRepositoryMock,
  UserTeamRepositoryMock,
  VisibilityMock,
} from '../../../../test/mockCrudRepository/crudRepository.mock';
import { ADCenter } from '../../ad-center/model/entities/ad-center.entity';
import { User } from '../../core/user/model/entities/user.entity';
import { UserRole } from '../../core/user/model/entities/user_role.entity';
import { UserSession } from '../../core/user/model/entities/user_session.entity';
import { UserTeam } from '../../core/user/model/entities/user_team.entity';
import { UserPrivilegeService } from '../../core/user/services/user-privilege.service';
import { IUserPrivilegeService } from '../../core/user/services/user-privilege.service.inteface';
//import { IUserPrivilegeService } from '../../core/user/services/user-privilege.service.inteface';
import { UserSessionDetailsService } from '../../core/user/services/user-session-details.service';
import { UserTeamService } from '../../core/user/services/user-team.service';
import { IUserTeamService } from '../../core/user/services/user-team.service.interface';
import { UserService } from '../../core/user/services/user.service';
import { ClientStatus } from '../../dashboard/client-status/model/entities/client-status.entity';
import { ClientStatusCrudService } from '../../dashboard/client-status/services/client-status.crud.service';
import { IClientStatusService } from '../../dashboard/client-status/services/client-status.service.interface';

import { CodeQualitySnapshot } from '../../dashboard/code-quality-snapshot/model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from '../../dashboard/code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { ICodeQualityService } from '../../dashboard/code-quality-snapshot/services/code-quality-snapshot.service.interface';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { IDashboardService } from '../../dashboard/services/dashboard.service.interface';

import { Sprint } from '../../dashboard/sprint/model/entities/sprint.entity';
import { SprintCrudService } from '../../dashboard/sprint/services/sprint.crud.service';
import { ISprintCrudService } from '../../dashboard/sprint/services/sprint.crud.service.interface';
import { TeamSpiritMedian } from '../../dashboard/team-spirit/model/entities/team-spirit-median.entity';
import { TeamSpiritCrudService } from '../../dashboard/team-spirit/services/team-spirit.crud.service';
import { ITeamSpiritService } from '../../dashboard/team-spirit/services/team-spirit.interface';
import { EmailService } from '../../email/services/email.service';
import { IEmailService } from '../../email/services/email.service.interface';
import { CloudFileStorageService } from '../../file-storage/services/cloud-file-storage.service';
import { Files } from '../../multimedia/model/entities/files.entity';
import { Multimedia } from '../../multimedia/model/entities/multimedia.entity';
import { MultimediaCrudService } from '../../multimedia/services/multimedia.crud.service';
import { IMultimediaService } from '../../multimedia/services/multimedia.crud.service.interface';
import { TeamLinkResponse } from '../../team-links/model/dto/TeamLinkResponse';
import { LinksCategory } from '../../team-links/model/entities/link-category.entity';
import { TeamLinks } from '../../team-links/model/entities/team-links.entity';
import { TeamLinksCrudService } from '../../team-links/services/team-links.crud.service';
import { ITeamLinksservice } from '../../team-links/services/team-links.service.interface';
import { Team } from '../../teams/model/entities/team.entity';
import { Visibility } from '../../visibility/model/entities/visibility.entity';
import { UpdateTeam } from '../model/dto/updateTeam.interface';
import { UserTeamDTO } from '../model/dto/UserTeamDTO';
import { TeamStatus } from '../model/entities/team_status.entity';
import { GlobalTeamsService } from './global.team.service';
import { IGlobalTeamsService } from './global.team.service.interface';
import { TeamCrudService } from './team.crud.service';

describe('TeamCrudService', () => {
  let teamService: TeamCrudService;
  let clientStatusService: IClientStatusService;
  let codeQualityService: ICodeQualityService;
  let sprintService: ISprintCrudService;
  let teamSpiritService: ITeamSpiritService;
  let teamLinkService: ITeamLinksservice;
  let userRepo: UserRepositoryMock;
  let teamRepo: TeamRepositoryMock;
  let fileRepo: FilesRepositoryMock;
  let codeQualityRepo: CodeQualityRepositoryMock;
  let clientStatusRepo: ClientStatusRepositoryMock;
  let teamSpiritRepository: TeamSpiritRepositoryMock;
  let sprintRepo: SprintRepositoryMock;
  let teamLinksRepo: TeamLinksMockRepo;
  let adcenterRepo: ADCenterRepositoryMock;
  let userRoleRepo: UserRoleRepositoryMock;
  let userTeamRepo: UserTeamRepositoryMock;
  let userService: UserService;
  let dashboardService: IDashboardService;
  let linksCategoryRepo: LinksCategoryMock;
  let multimediaService: IMultimediaService;
  let userTeamService: IUserTeamService;
  let globalTeamService: IGlobalTeamsService;
  let userPrivilegeService: IUserPrivilegeService;
  let emailService: IEmailService;
  let teamStatusRepo: TeamStatusRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        TeamCrudService,
        ClientStatusCrudService,
        CodeQualitySnapshotCrudService,
        TeamSpiritCrudService,
        SprintCrudService,
        UserService,
        TeamLinksCrudService,
        DashboardService,
        MultimediaCrudService,
        UserPrivilegeService,
        {
          provide: 'IClientStatusService',
          useClass: ClientStatusCrudService,
        },
        {
          provide: 'ITeamLinksService',
          useClass: TeamLinksCrudService,
        },
        {
          provide: 'ICodeQualityService',
          useClass: CodeQualitySnapshotCrudService,
        },
        {
          provide: 'ITeamSpiritService',
          useClass: TeamSpiritCrudService,
        },
        {
          provide: 'ISprintCrudService',
          useClass: SprintCrudService,
        },
        {
          provide: 'IDashboardService',
          useClass: DashboardService,
        },
        {
          provide: 'IMultimediaService',
          useClass: MultimediaCrudService,
        },
        {
          provide: 'IUserTeamService',
          useClass: UserTeamService,
        },
        {
          provide: 'IUserPrivilegeService',
          useClass: UserPrivilegeService,
        },
        {
          provide: 'IGlobalTeamService',
          useClass: GlobalTeamsService,
        },
        {
          provide: 'IUserSessionDetailsService',
          useClass: UserSessionDetailsService,
        },

        {
          provide: 'IEmailService',
          useClass: EmailService,
        },
        {
          provide: 'IUserPrivilegeService',
          useClass: UserPrivilegeService,
        },
        {
          provide: 'IFileStorageService',
          useClass: CloudFileStorageService,
        },
        {
          provide: getRepositoryToken(UserRole),
          useClass: UserRoleRepositoryMock,
        },
        {
          provide: getRepositoryToken(UserSession),
          useClass: UserSessionDetailsRepositoryMock,
        },
        {
          provide: getRepositoryToken(UserTeam),
          useClass: UserTeamRepositoryMock,
        },
        {
          provide: getRepositoryToken(TeamStatus),
          useClass: TeamStatusRepositoryMock,
        },
        {
          provide: getRepositoryToken(Files),
          useClass: FilesRepositoryMock,
        },

        {
          provide: getRepositoryToken(TeamSpiritMedian),
          useClass: TeamSpiritRepositoryMock,
        },
        {
          provide: getRepositoryToken(ADCenter),
          useClass: ADCenterRepositoryMock,
        },
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
        },
        {
          provide: getRepositoryToken(Multimedia),
          useClass: MultimediaRepositoryMock,
        },
        {
          provide: getRepositoryToken(Team),
          useClass: TeamRepositoryMock,
        },
        {
          provide: getRepositoryToken(Sprint),
          useClass: SprintRepositoryMock,
        },
        {
          provide: getRepositoryToken(LinksCategory),
          useClass: LinksCategoryMock,
        },
        {
          provide: getRepositoryToken(ClientStatus),
          useClass: ClientStatusRepositoryMock,
        },
        {
          provide: getRepositoryToken(CodeQualitySnapshot),
          useClass: CodeQualityRepositoryMock,
        },
        {
          provide: getRepositoryToken(TeamLinks),
          useClass: TeamLinksMockRepo,
        },
        {
          provide: getRepositoryToken(Visibility),
          useClass: VisibilityMock,
        },
      ],
    }).compile();
    //userTeamService = module.get<UserTeamService>('IUserTeamService');
    dashboardService = module.get<DashboardService>('IDashboardService');
    multimediaService = module.get<MultimediaCrudService>('IMultimediaService');
    teamService = module.get<TeamCrudService>(TeamCrudService);
    globalTeamService = module.get<GlobalTeamsService>('IGlobalTeamService');
    clientStatusService = module.get<ClientStatusCrudService>('IClientStatusService');
    sprintService = module.get<SprintCrudService>('ISprintCrudService');
    teamSpiritService = module.get<TeamSpiritCrudService>('ITeamSpiritService');
    codeQualityService = module.get<CodeQualitySnapshotCrudService>('ICodeQualityService');
    teamLinkService = module.get<TeamLinksCrudService>('ITeamLinksService');
    userPrivilegeService = module.get<UserPrivilegeService>('IUserPrivilegeService');
    emailService = module.get<EmailService>('IEmailService');
    linksCategoryRepo = module.get<LinksCategoryMock>(getRepositoryToken(LinksCategory));
    sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
    teamRepo = module.get<TeamRepositoryMock>(getRepositoryToken(Team));
    userRepo = module.get<UserRepositoryMock>(getRepositoryToken(User));
    codeQualityRepo = module.get<CodeQualityRepositoryMock>(getRepositoryToken(CodeQualitySnapshot));
    clientStatusRepo = module.get<ClientStatusRepositoryMock>(getRepositoryToken(ClientStatus));
    teamSpiritRepository = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpiritMedian));
    teamLinksRepo = module.get<TeamLinksMockRepo>(getRepositoryToken(TeamLinks));
    adcenterRepo = module.get<ADCenterRepositoryMock>(getRepositoryToken(ADCenter));
    userRoleRepo = module.get<UserRoleRepositoryMock>(getRepositoryToken(UserRole));
    userTeamRepo = module.get<UserTeamRepositoryMock>(getRepositoryToken(UserTeam));
    userService = module.get<UserService>(UserService);
    fileRepo = module.get<FilesRepositoryMock>(getRepositoryToken(Files));
    teamStatusRepo = module.get<TeamStatusRepositoryMock>(getRepositoryToken(TeamStatus));
    userTeamService = module.get<UserTeamService>('IUserTeamService');
  });

  it('should be defined after module initialization', () => {
    expect(userRoleRepo).toBeDefined();
    expect(userTeamRepo).toBeDefined();
    expect(teamService).toBeDefined();
    expect(clientStatusService).toBeDefined();
    expect(codeQualityService).toBeDefined();
    expect(sprintService).toBeDefined();
    expect(userService).toBeDefined();
    expect(dashboardService).toBeDefined();
    expect(teamSpiritService).toBeDefined();
    expect(teamLinkService).toBeDefined();
    expect(sprintRepo).toBeDefined();
    expect(teamRepo).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(codeQualityRepo).toBeDefined();
    expect(clientStatusRepo).toBeDefined();
    expect(teamSpiritRepository).toBeDefined();
    expect(teamLinksRepo).toBeDefined();
    expect(adcenterRepo).toBeDefined();
    expect(linksCategoryRepo).toBeDefined();
    expect(multimediaService).toBeDefined();
    expect(userTeamService).toBeDefined();
    expect(userPrivilegeService).toBeDefined();
    expect(emailService).toBeDefined();
    expect(fileRepo).toBeDefined();
    expect(teamStatusRepo).toBeDefined();
  });

  describe('updateTeam() should update the team', () => {
    //inputs
    const updateTeam: UpdateTeam = {
      //teamId: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
      teamName: 'Team E',
      teamCode: '92009188',
      projectKey: 'P31247',
    };
    //const logo: any = {};
    const teamId: string = 'fe4f8120-8a2c-47ad-bad7-86e412e323c1';
    test('test 1 if team not found', async () => {
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => undefined);

      try {
        await teamService.updateTeam(updateTeam, teamId);
      } catch (e) {
        expect(e.message).toMatch('Team Not Found');
      }
    });
    test('test 2 if team found', async () => {
      const result = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        version: 4,
        createdAt: '2021-06-25T06:25:06.419Z',
        updatedAt: '2021-07-07T11:16:47.830Z',
        name: 'Team E',
        teamCode: '93009188',
        projectKey: 'P41247',
        logo: '',
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-06-25T06:25:06.419Z',
          updatedAt: '2021-06-25T06:25:06.419Z',
          name: 'ADCenter Murcia',
        },
      };

      const expectedOutput: any = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        teamCode: '92009188',
        projectKey: 'P31247',
        //logo: logo,
        version: 6,
        updatedAt: '2021-07-07T11:16:47.830Z',
      };

      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => result);
      jest.spyOn(teamService, 'updateTeam').mockImplementation(() => expectedOutput);
      const actualOutput = await teamService.updateTeam(updateTeam, teamId);
      //  expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe('getTeamInfoById() get all 5 kpis details along with sprint and status', () => {
    test('test 1 if team not present in db ', async () => {
      //inputs
      const userTeam: UserTeamDTO = {
        userId: '35afbdf8-9035-4bc6-ae04-28c6140495ad',
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d481e',
      };

      //test
      jest.spyOn(globalTeamService, 'findTeamById').mockImplementation(undefined);
      // jest.spyOn(teamRepo, 'findOne').mockImplementation(() => undefined);
      try {
        await teamService.getTeamInfoById(userTeam);
      } catch (e) {
        expect(e.message).toMatch('Team Not Found');
      }
    });
    const team: any = {
      id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-07-08T05:12:17.648Z',
      updatedAt: '2021-07-08T05:12:17.648Z',
      name: 'Team A',
      teamCode: '10012345',
      projectKey: 'P12343',
      logo: '',
      ad_center: {
        id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-07-08T05:12:17.648Z',
        updatedAt: '2021-07-08T05:12:17.648Z',
        name: 'ADCenter Bangalore',
      },
    };

    const dashboard: any = {
      teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      codeQuality: { bugs: 3, codeSmells: 13, codeCoverage: 85, status: 'PASSED' },
      clientStatus: { clientSatisfactionRating: 8, sprintNumber: 10 },
      teamSpirit: { teamSpiritRating: 7 },
      sprintDetail: { Sprint_current_day: 5, sprint_number: 11, Sprint_days: 28 },
      burndown: {
        workUnit: 'story point',
        remainingDays: 23,
        remainingWork: 126,
        count: 11,
        burndownStatus: 'Behind Time',
      },
    };
    const links: any = [
      {
        teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
        linkName: 'Jira cloud',
        linkType: 'web_link',
        links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
      },
      {
        teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
        linkName: 'GitHub',
        linkType: 'web_link',
        links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
      },
      {
        teamLinkId: '51055bf2-ada5-495c-8019-8d7ab76d488e',
        linkName: 'Skype Demo',
        linkType: 'meeting_link',
        links: 'https://lync.capgemini.com/capgemini.com/meet/raj.bhushan/L6C7HBQC',
      },
      {
        teamLinkId: '51056bf8-ada5-495c-8019-8d7ab76d488e',
        linkName: 'Stand Up',
        linkType: 'meeting_link',
        links:
          'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
      },
    ];
    const multimedia: any = [
      {
        fileId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
        fileName: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
      },
      {
        fileId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
        fileName: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
      },
      {
        fileId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
        fileName: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
      },
      {
        fileId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
        fileName: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
      },
      {
        fileId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
        fileName: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
      },
      {
        fileId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
        fileName: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
      },
      {
        fileId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
        fileName: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
      },
    ];

    test('test 2 if team present in db and user is System Admin ', async () => {
      //inputs
      const userTeam: UserTeamDTO = {
        userId: '35afbdf8-9035-4bc6-ae04-28c6140495ad',
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      };

      const isSystemAdmin: any = true;
      const priviledgeList: any = [
        'add_team_admin',
        'view_links',
        'team_configuration',
        'register_team',
        'update_team',
        'delete_team',
        'view_all_team',
        'view_members_of_team',
        'update_role',
        'delete_team_members',
        'add_team_member',
        'add_guest_user',
      ];

      const expectedOutput: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        project_key: 'P12343',
        logo: 'undefined/46455bf7-ada7-495c-8019-8d7ab76d488e/',
        dashboard: dashboard,
        teamLinks: links,
        multimedia: multimedia,
        privileges: [],
      };

      //test
      jest.spyOn(userTeamService, 'isSystemAdmin').mockImplementation(() => isSystemAdmin);
      jest.spyOn(globalTeamService, 'findTeamById').mockResolvedValue(team);
      jest.spyOn(userPrivilegeService, 'getUserPrivilegeForTeam').mockImplementation(() => priviledgeList);
      jest.spyOn(dashboardService, 'getDashboardByTeamId').mockImplementation(() => dashboard);
      jest.spyOn(teamService, 'getLinksForTeam').mockImplementation(() => links);
      jest.spyOn(teamService, 'getMultimediaForTeam').mockImplementation(() => multimedia);
      const actualOutput = await teamService.getTeamInfoById(userTeam);

      expect(userTeamService.isSystemAdmin).toBeCalledTimes(1);
      expect(userPrivilegeService.getUserPrivilegeForTeam).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
    test('test 3 if team present in db and user is not a System Admin ', async () => {
      const userTeam: UserTeamDTO = {
        userId: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      };

      const isSystemAdmin: any = false;

      const priviledgeList: any = [
        'add_team_admin',
        'view_links',
        'team_configuration',
        'register_team',
        'update_team',
        'delete_team',
        'view_all_team',
        'view_members_of_team',
        'update_role',
        'delete_team_members',
        'add_team_member',
        'add_guest_user',
        'view_links',
      ];

      const expectedOutput: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        project_key: 'P12343',
        logo: 'undefined/46455bf7-ada7-495c-8019-8d7ab76d488e/',
        dashboard: dashboard,
        teamLinks: links,
        multimedia: multimedia,
        privileges: priviledgeList,
      };
      jest.spyOn(userTeamService, 'isSystemAdmin').mockImplementation(() => isSystemAdmin);
      jest.spyOn(globalTeamService, 'findTeamById').mockReturnValue(team);
      jest.spyOn(userPrivilegeService, 'getUserPrivilegeForTeam').mockImplementation(() => priviledgeList);
      jest.spyOn(dashboardService, 'getDashboardByTeamId').mockImplementation(() => dashboard);
      jest.spyOn(teamService, 'getLinksForTeam').mockImplementation(() => links);
      jest.spyOn(teamService, 'getMultimediaForTeam').mockImplementation(() => multimedia);
      const actualOutput = await teamService.getTeamInfoById(userTeam);
      //expect(teamRepo.findOne).toBeCalledTimes(1);
      expect(userTeamService.isSystemAdmin).toBeCalledTimes(1);
      expect(userPrivilegeService.getUserPrivilegeForTeam).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
  });
  describe('getCenterByTeamId() should ftech all center in the team', () => {
    //inputs
    const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';

    test('test 1 if team not found', async () => {
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => undefined);
      try {
        await teamService.getCenterByTeamId(teamId);
      } catch (e) {
        expect(e.message).toMatch('Team Not Found');
      }
    });
    test('test 2 if team found', async () => {
      const result = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        version: 4,
        createdAt: '2021-06-25T06:25:06.419Z',
        updatedAt: '2021-07-07T11:16:47.830Z',
        name: 'Team A',
        teamCode: '93009188',
        projectKey: 'P41247',
        logo: '',
        ad_center: {
          id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-06-25T06:25:06.419Z',
          updatedAt: '2021-06-25T06:25:06.419Z',
          name: 'ADCenter Bangalore',
        },
      };
      const expectedOutput: any = {
        centerId: '99055bf7-ada7-495c-8019-8d7ab62d488e',
        centerName: 'ADCenter Bangalore',
      };
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => result);
      const actualOutput = await teamService.getCenterByTeamId(teamId);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
  });
  describe(' getLinksForTeam()', () => {
    const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
    test('getLinksForTeam() should fetch the all the links of the team if priveleges includes view-links', async () => {
      const priviledgeList: any = [
        'add_team_admin',
        'view_links',
        'team_configuration',
        'register_team',
        'update_team',
        'delete_team',
        'view_all_team',
        'view_members_of_team',
        'update_role',
        'delete_team_members',
        'add_team_member',
        'add_guest_user',
        'view_links',
      ];
      const teamLink = {} as TeamLinkResponse[];
      jest.spyOn(teamLinkService, 'getTeamLinks').mockResolvedValue(teamLink);
      expect(await teamService.getLinksForTeam(teamId, priviledgeList)).toEqual(teamLink);
    });
    test('getLinksForTeam() should fetch the all the links of the team if priveleges does not include view-links', async () => {
      const priviledgeList: any = [
        'add_team_admin',
        'view_links',
        'team_configuration',
        'register_team',
        'update_team',
        'delete_team',
        'view_all_team',
        'view_members_of_team',
        'update_role',
        'delete_team_members',
        'add_team_member',
        'add_guest_user',
      ];
      const emptyArray: any = [];
      jest.spyOn(teamLinkService, 'getTeamLinks').mockReturnValue(emptyArray);
      expect(await teamService.getLinksForTeam(teamId, priviledgeList)).toEqual(emptyArray);
    });
  });
  describe(' getMultimediaForTeam()', () => {
    test('it should return all the multimedia related to the team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const multimedia: any = [
        {
          fileId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
          fileName: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
        },
        {
          fileId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
          fileName: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
        },
        {
          fileId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
          fileName: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
        },
        {
          fileId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
          fileName: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
        },
        {
          fileId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
          fileName: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
        },
        {
          fileId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
          fileName: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
        },
        {
          fileId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
          fileName: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
        },
      ];
      jest.spyOn(multimediaService, 'getDefaultMultimediaForTeam').mockImplementation(() => multimedia);
      expect(await teamService.getMultimediaForTeam(teamId)).toEqual(multimedia);
      expect(multimediaService.getDefaultMultimediaForTeam).toBeCalledTimes(1);
    });
  });
});
