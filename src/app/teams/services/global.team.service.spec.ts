import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  UserRepositoryMock,
  TeamRepositoryMock,
  CodeQualityRepositoryMock,
  ClientStatusRepositoryMock,
  TeamSpiritRepositoryMock,
  SprintRepositoryMock,
  TeamLinksMockRepo,
  ADCenterRepositoryMock,
  UserRoleRepositoryMock,
  UserTeamRepositoryMock,
  LinksCategoryMock,
  UserSessionDetailsRepositoryMock,
  MultimediaRepositoryMock,
  VisibilityMock,
  FilesRepositoryMock,
  TeamStatusRepositoryMock,
} from '../../../../test/mockCrudRepository/crudRepository.mock';
import { ADCenter } from '../../ad-center/model/entities/ad-center.entity';
import { User } from '../../core/user/model/entities/user.entity';
import { UserRole } from '../../core/user/model/entities/user_role.entity';
import { UserSession } from '../../core/user/model/entities/user_session.entity';
import { UserTeam } from '../../core/user/model/entities/user_team.entity';
import { UserPrivilegeService } from '../../core/user/services/user-privilege.service';
import { IUserPrivilegeService } from '../../core/user/services/user-privilege.service.inteface';
//import { UserPrivilegeService } from '../../core/user/services/user-privilege.service';
//import { IUserPrivilegeService } from '../../core/user/services/user-privilege.service.inteface';
import { UserSessionDetailsService } from '../../core/user/services/user-session-details.service';
import { UserTeamService } from '../../core/user/services/user-team.service';
// import { UserTeamService } from '../../core/user/services/user-team.service';
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
import { IFileStorageService } from '../../file-storage/services/file-storage.service.interface';
import { CloudFileStorageService } from '../../file-storage/services/cloud-file-storage.service';
import { Multimedia } from '../../multimedia/model/entities/multimedia.entity';
import { MultimediaCrudService } from '../../multimedia/services/multimedia.crud.service';
import { IMultimediaService } from '../../multimedia/services/multimedia.crud.service.interface';
import { AddTeam } from '../../shared/interfaces/addTeam.interface';
import { LinksCategory } from '../../team-links/model/entities/link-category.entity';
import { TeamLinks } from '../../team-links/model/entities/team-links.entity';
import { TeamLinksCrudService } from '../../team-links/services/team-links.crud.service';
import { ITeamLinksservice } from '../../team-links/services/team-links.service.interface';
import { Visibility } from '../../visibility/model/entities/visibility.entity';
import { Team } from '../model/entities/team.entity';
import { GlobalTeamsService } from './global.team.service';
import { IGlobalTeamsService } from './global.team.service.interface';
//import { IGlobalTeamsService } from './global.team.service.interface';
import { TeamCrudService } from './team.crud.service';
import { IEmailService } from '../../email/services/email.service.interface';
import { EmailService } from '../../email/services/email.service';
import { Files } from '../../multimedia/model/entities/files.entity';
import { TeamStatus } from '../model/entities/team_status.entity';

describe('TeamCrudService', () => {
  let teamService: TeamCrudService;
  let clientStatusService: IClientStatusService;
  let codeQualityService: ICodeQualityService;
  let sprintService: ISprintCrudService;
  let teamSpiritService: ITeamSpiritService;
  let teamLinkService: ITeamLinksservice;
  let userRepo: UserRepositoryMock;
  let teamRepo: TeamRepositoryMock;
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
  let fileStorageService: IFileStorageService;
  let emailService: IEmailService;
  let fileRepo: FilesRepositoryMock;
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
        GlobalTeamsService,
        CloudFileStorageService,
        {
          provide: 'IFileStorageService',
          useClass: CloudFileStorageService,
        },
        {
          provide: 'IEmailService',
          useClass: EmailService,
        },
        {
          provide: 'IGlobalTeamsService',
          useClass: GlobalTeamsService,
        },
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
          provide: getRepositoryToken(TeamStatus),
          useClass: TeamStatusRepositoryMock,
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
        // {
        //   provide: 'IUserPrivilegeService',
        //   useClass: UserPrivilegeService,
        // },
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
          provide: getRepositoryToken(Files),
          useClass: FilesRepositoryMock,
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
    fileStorageService = module.get<CloudFileStorageService>('IFileStorageService');
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
    userTeamService = module.get<UserTeamService>('IUserTeamService');
    emailService = module.get<EmailService>('IEmailService');
    fileRepo = module.get<FilesRepositoryMock>(getRepositoryToken(Files));
    teamStatusRepo = module.get<TeamStatusRepositoryMock>(getRepositoryToken(TeamStatus));
  });

  it('should be defined after module initialization', () => {
    expect(fileRepo).toBeDefined();
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
    expect(globalTeamService).toBeDefined();
    expect(emailService).toBeDefined();
    expect(teamStatusRepo).toBeDefined();
  });

  describe('getTeamsByCenterId() should update the team', () => {
    test('test 1 if no team found inside centerId', async () => {
      const centerId = '98855bf7-ada7-495c-8019-8d7ab62d488e';
      const emptyArray: any = [];
      const teamsDTOArray: any = [];
      jest.spyOn(teamRepo, 'find').mockImplementation(() => emptyArray);
      expect(await globalTeamService.getTeamsByCenterId(centerId)).toEqual(teamsDTOArray);
      expect(teamRepo.find).toHaveBeenCalled();
    });
    test('test 2 if teams found inside centerId', async () => {
      const centerId = '98955bf7-ada7-495c-8019-8d7ab62d488e';
      const teamsPresentInADCenter = [
        {
          id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'Team E',
          teamCode: '9900918',
          projectKey: 'P112461',
          logo: null,
          ad_center: {
            id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Murcia',
          },
        },
        {
          id: '5fd9ae5c-3071-45c2-bf92-093bd64a8226',
          version: 4,
          createdAt: '2021-08-11T05:15:29.606Z',
          updatedAt: '2021-08-11T05:20:30.261Z',
          name: 'Team L',
          teamCode: '3455000',
          projectKey: 'P1997987',
          logo: null,
          ad_center: {
            id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Murcia',
          },
        },
        {
          id: '34c407d1-a933-46eb-9c7c-fbc85ecb7a51',
          version: 8,
          createdAt: '2021-08-11T12:05:32.510Z',
          updatedAt: '2021-08-12T04:49:53.780Z',
          name: 'Team F',
          teamCode: '34558768',
          projectKey: 'P199326',
          logo: null,
          ad_center: {
            id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Murcia',
          },
        },
        {
          id: '12e15fb6-c341-439f-ac5b-90d52b9dd839',
          version: 2,
          createdAt: '2021-08-12T04:59:16.990Z',
          updatedAt: '2021-08-12T04:59:17.128Z',
          name: 'Team P',
          teamCode: '3455845',
          projectKey: 'P1993897',
          logo: 'Screenshot(2)968007f4-771b-4b84-83ec-6aae1de2a509.png',
          ad_center: {
            id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Murcia',
          },
        },
      ];
      const teamStatus: any = 1;
      // const dashboard: any = {};
      jest.spyOn(teamRepo, 'find').mockImplementation(() => teamsPresentInADCenter);
      // jest.spyOn(dashboardService, 'getDashboardByTeamId').mockImplementation(() => dashboard);
      jest.spyOn(globalTeamService, 'findStatusByTeam').mockImplementation(() => teamStatus);
      expect(await globalTeamService.getTeamsByCenterId(centerId)).toBeDefined();
    });
  });

  describe('uploadLogoForTeam() ', () => {
    test('should upload logo of a team', async () => {
      const logo: any = 'Screenshot(7)2028e7cb-69d5-4219-a748-d2449abb4cc8.png';
      const teamId = 'fe4f8120-8a2c-47ad-bad7-86e412e323c1';
      const team: any = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'Team E',
        teamCode: '9900918',
        projectKey: 'P112461',
        logo: null,
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Murcia',
        },
      };
      const teamwithLogo: any = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'Team E',
        teamCode: '9900918',
        projectKey: 'P112461',
        logo: 'Screenshot(7)2028e7cb-69d5-4219-a748-d2449abb4cc8.png',
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Murcia',
        },
      };
      const teamResponse = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        name: 'Team E',
        projectKey: 'P112461',
        teamCode: '9900918',
        logo: 'undefined/fe4f8120-8a2c-47ad-bad7-86e412e323c1/logo_B222bf72b3-3f3b-471d-b0d8-f21a6283d00e.png',
        ad_center: '98955bf7-ada7-495c-8019-8d7ab62d488e',
      };
      const fileUploaded = {
        ETag: '"50708655988b63ba7faa72b6da8e86"',
        Location:
          'https://powerboast.s3.onaws.com/uploads/uploads/multimedia/46455bf7-ada7-495c-8019-8d7ab76d488e/logo_B222bf72b3-3f3b-471d-b0d8-f21a6283d00e.png',
        key:
          'uploads/uploads/multimedia/46455bf7-ada7-495c-8019-8d7ab76d488e/logo_B222bf72b3-3f3b-471d-b0d8-f21a6283d00e.png',
        Key:
          'uploads/uploads/multimedia/46455bf7-ada7-495c-8019-8d7ab76d488e/logo_B222bf72b3-3f3b-471d-b0d8-f21a6283d00e.png',
        Bucket: 'powerboard',
      } as any;
      const deleteFile = {} as any;
      // const fileName: any = 'Screenshot(7)2028e7cb-69d5-4219-a748-d2449abb4cc8.png';
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      jest.spyOn(fileStorageService, 'deleteFile').mockImplementation(() => deleteFile);
      jest.spyOn(fileStorageService, 'uploadFile').mockResolvedValue(fileUploaded);
      jest.spyOn(teamRepo, 'save').mockImplementation(() => teamwithLogo);
      expect(await globalTeamService.uploadLogoForTeam(logo, teamId)).toEqual(teamResponse);
    });
  });

  describe('deleteLogoForTeam() ', () => {
    //inputs
    const teamId = 'fe4f8120-8a2c-47ad-bad7-86e412e323c1';
    const team: any = {
      id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
      version: 1,
      createdAt: '2021-08-09T11:35:56.959Z',
      updatedAt: '2021-08-09T11:35:56.959Z',
      name: 'Team E',
      teamCode: '9900918',
      projectKey: 'P112461',
      logo: 'logo_B222bf72b3-3f3b-471d-b0d8-f21a6283d00e.png',
      ad_center: {
        id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'ADCenter Murcia',
      },
    };
    const team1: any = {
      id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
      version: 1,
      createdAt: '2021-08-09T11:35:56.959Z',
      updatedAt: '2021-08-09T11:35:56.959Z',
      name: 'Team E',
      teamCode: '9900918',
      projectKey: 'P112461',
      logo: null,
      ad_center: {
        id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'ADCenter Murcia',
      },
    };
    test('should delete logo of a team', async () => {
      const deleted = false;
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      jest.spyOn(fileStorageService, 'deleteFile').mockResolvedValue(deleted);
      jest.spyOn(teamRepo, 'save').mockImplementation(() => team1);
      expect(await globalTeamService.deleteLogoFromTeam(teamId)).toBeUndefined;
      expect(fileStorageService.deleteFile).toHaveBeenCalled();
    });
    test('should throw error if file not present in path', async () => {
      const deleted1 = true;
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      jest.spyOn(fileStorageService, 'deleteFile').mockResolvedValue(deleted1);
      try {
        await globalTeamService.deleteLogoFromTeam(teamId);
      } catch (e) {
        expect(e.message).toMatch('File not found');
      }
    });
  });
  describe('addTeam() ', () => {
    //inputs
    const addTeamDTO = {
      teamName: 'TEAM H',
      teamCode: '673563',
      projectKey: 'P19971',
      // logo: {},
      ad_center: {
        id: 'a391f41f-ebb0-4b41-af50-a1ab283b6391',
      },
    } as AddTeam;

    const logo = {} as File;

    test('should throw error if team is already present in db', async () => {
      const team = {} as Team;
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      try {
        await globalTeamService.addTeam(addTeamDTO, logo);
      } catch (e) {
        expect(e.message).toMatch('team already registered');
      }
    });
    test('should add team if team is not already present in db', async () => {
      const team = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'Team E',
        teamCode: '9900918',
        projectKey: 'P112461',
        logo: null,
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Murcia',
        },
      } as Team;
      const teamWithLogo: any = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'Team E',
        teamCode: '9900918',
        projectKey: 'P112461',
        logo: null,
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Murcia',
        },
      };
      // const teamCreated = {} as Team;
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => undefined);
      jest.spyOn(teamRepo, 'save').mockImplementation(() => team);
      jest.spyOn(globalTeamService, 'uploadLogoForTeam').mockImplementation(() => teamWithLogo);
      expect(await globalTeamService.addTeam(addTeamDTO, logo)).toBeDefined();
    });
    test('should create new team if team is not already present in db and even if logo is not there', async () => {
      // const createdTeam = {
      //   id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
      //   version: 1,
      //   createdAt: '2021-08-09T11:35:56.959Z',
      //   updatedAt: '2021-08-09T11:35:56.959Z',
      //   name: 'Team E',
      //   teamCode: '9900918',
      //   projectKey: 'P112461',
      //   logo: null,
      //   ad_center: {
      //     id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
      //     version: 1,
      //     createdAt: '2021-08-09T11:35:56.959Z',
      //     updatedAt: '2021-08-09T11:35:56.959Z',
      //     name: 'ADCenter Murcia',
      //   },

      // }
      const createdTeam = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        name: 'Team E',
        projectKey: 'P112461',
        teamCode: '9900918',
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Murcia',
        },
      };
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => undefined);
      jest.spyOn(teamRepo, 'save').mockImplementation(() => createdTeam);
      expect(await globalTeamService.addTeam(addTeamDTO, null)).toEqual(createdTeam);
    });
  });
  describe('deleteTeamById() ', () => {
    const teamId = 'fe4f8120-8a2c-47ad-bad7-86e412e323c1';
    test('should delete team if team is present in db', async () => {
      const team: any = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'Team E',
        teamCode: '9900918',
        projectKey: 'P112461',
        logo: null,
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Murcia',
        },
      } as Team;

      jest.spyOn(globalTeamService, 'findTeamById').mockImplementation(() => team);
      expect(await globalTeamService.deleteTeamById(teamId)).toEqual(undefined);
    });
    test('should throw error if team is not present in db', async () => {
      jest.spyOn(globalTeamService, 'findTeamById').mockResolvedValue(undefined);
      try {
        await globalTeamService.deleteTeamById(teamId);
      } catch (e) {
        expect(e.message).toMatch('Team not found');
      }
    });
  });
  describe('getAllTeams() ', () => {
    test('should return all the teams present in the db', async () => {
      const allTeams = [
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d491e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'Team D',
          teamCode: '10033347',
          projectKey: 'P43567',
          logo: null,
          ad_center: {
            id: '98755bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Mumbai',
          },
        },
        {
          id: '12e15fb6-c341-439f-ac5b-90d52b9dd839',
          version: 2,
          createdAt: '2021-08-12T04:59:16.990Z',
          updatedAt: '2021-08-12T04:59:17.128Z',
          name: 'Team P',
          teamCode: '3455845',
          projectKey: 'P1993897',
          logo: 'Screenshot(2)968007f4-771b-4b84-83ec-6aae1de2a509.png',
          ad_center: {
            id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Murcia',
          },
        },
        {
          id: '34c407d1-a933-46eb-9c7c-fbc85ecb7a51',
          version: 8,
          createdAt: '2021-08-11T12:05:32.510Z',
          updatedAt: '2021-08-12T04:49:53.780Z',
          name: 'Team F',
          teamCode: '34558768',
          projectKey: 'P199326',
          logo: null,
          ad_center: {
            id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Murcia',
          },
        },
        {
          id: '5fd9ae5c-3071-45c2-bf92-093bd64a8226',
          version: 4,
          createdAt: '2021-08-11T05:15:29.606Z',
          updatedAt: '2021-08-11T05:20:30.261Z',
          name: 'Team L',
          teamCode: '3455000',
          projectKey: 'P1997987',
          logo: null,
          ad_center: {
            id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Murcia',
          },
        },
        {
          id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'Team E',
          teamCode: '9900918',
          projectKey: 'P112461',
          logo: null,
          ad_center: {
            id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Murcia',
          },
        },
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'Team C',
          teamCode: '10012347',
          projectKey: 'P87695',
          logo: null,
          ad_center: {
            id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021 - 08 - 09T11: 35: 56.959Z',
            updatedAt: '2021 - 08 - 09T11: 35: 56.959Z',
            name: 'ADCenter Bangalore',
          },
        },
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d489e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'Team B',
          teamCode: '10012346',
          projectKey: 'P1212',
          logo: null,
          ad_center: {
            id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Bangalore',
          },
        },
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'Team A',
          teamCode: '10012345',
          projectKey: 'P12343',
          logo: null,
          ad_center: {
            id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Bangalore',
          },
        },
      ];
      jest.spyOn(teamRepo, 'find').mockImplementation(() => allTeams);
      expect(await globalTeamService.getAllTeams()).toBeDefined();
    });
    test('should return a message when no team is found', async () => {
      const allTeams = [] as Team[];
      jest.spyOn(teamRepo, 'find').mockImplementation(() => allTeams);
      try {
        await globalTeamService.getAllTeams();
      } catch (e) {
        expect(e.message).toMatch('Team Not Found');
      }
    });
  });

  describe('viewTeamsInADC()', () => {
    test('should return adc Team list', async () => {
      const teamId = 'fe4f8120-8a2c-47ad-bad7-86e412e323c1';
      const team = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'Team A',
        teamCode: '10012345',
        projectKey: 'P12343',
        logo: null,
        ad_center: {
          id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Bangalore',
        },
      };

      const teamsUnderADC = [
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'Team C',
          teamCode: '10012347',
          projectKey: 'P87695',
          logo: null,
          ad_center: {
            id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021 - 08 - 09T11: 35: 56.959Z',
            updatedAt: '2021 - 08 - 09T11: 35: 56.959Z',
            name: 'ADCenter Bangalore',
          },
        },
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d489e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'Team B',
          teamCode: '10012346',
          projectKey: 'P1212',
          logo: null,
          ad_center: {
            id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Bangalore',
          },
        },
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'Team A',
          teamCode: '10012345',
          projectKey: 'P12343',
          logo: null,
          ad_center: {
            id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-08-09T11:35:56.959Z',
            updatedAt: '2021-08-09T11:35:56.959Z',
            name: 'ADCenter Bangalore',
          },
        },
      ];

      const teamStatus: any = 1;
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      jest.spyOn(teamRepo, 'find').mockImplementation(() => teamsUnderADC);
      jest.spyOn(globalTeamService, 'findStatusByTeam').mockImplementation(() => teamStatus);
      expect(await globalTeamService.viewTeamsInADC(teamId)).toBeDefined();
    });
  });

  describe('findTeamById()', () => {
    test('should return the team if it is present in the db', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d491e';
      const team = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d491e',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'Team D',
        teamCode: '10033347',
        projectKey: 'P43567',
        logo: null,
        ad_center: {
          id: '98755bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Mumbai',
        },
      };
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      expect(await globalTeamService.findTeamById(teamId)).toEqual(team);
    });
  });

  describe('updateTeamStatus()', () => {
    test('should update the status of team ', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d491e';
      const team = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d491e',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'Team D',
        teamCode: '10033347',
        projectKey: 'P43567',
        logo: null,
        ad_center: {
          id: '98755bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Mumbai',
        },
        isStatusChanged: true,
      };
      const teamStatus = {
        id: 1,
        name: 'on track',
      };
      const team1 = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d491e',
        version: 1,
        createdAt: '2021-08-09T11:35:56.959Z',
        updatedAt: '2021-08-09T11:35:56.959Z',
        name: 'Team D',
        teamCode: '10033347',
        projectKey: 'P43567',
        logo: null,
        isStatusChanged: true,
        teamStatus: {
          id: 2,
          name: 'off track',
        },
        ad_center: {
          id: '98755bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-08-09T11:35:56.959Z',
          updatedAt: '2021-08-09T11:35:56.959Z',
          name: 'ADCenter Mumbai',
        },
      };
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      jest.spyOn(teamStatusRepo, 'findOne').mockImplementation(() => teamStatus);
      jest.spyOn(teamRepo, 'save').mockImplementation(() => team1);
      expect(await globalTeamService.updateTeamStatus(teamId, 2)).toEqual(team1);
    });
  });
});
