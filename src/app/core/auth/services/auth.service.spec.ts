import { UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
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
} from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { ViewCentersResponse } from '../../../ad-center/model/dto/ViewCentersResponse';
import { ADCenter } from '../../../ad-center/model/entities/ad-center.entity';
import { ADCenterCrudService } from '../../../ad-center/services/ad-center.crud.service';
import { IADCenterService } from '../../../ad-center/services/ad-center.interface';
import { ClientStatus } from '../../../dashboard/client-status/model/entities/client-status.entity';
import { ClientStatusCrudService } from '../../../dashboard/client-status/services/client-status.crud.service';
import { IClientStatusService } from '../../../dashboard/client-status/services/client-status.service.interface';
import { CodeQualitySnapshot } from '../../../dashboard/code-quality-snapshot/model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from '../../../dashboard/code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { ICodeQualityService } from '../../../dashboard/code-quality-snapshot/services/code-quality-snapshot.service.interface';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { IDashboardService } from '../../../dashboard/services/dashboard.service.interface';
import { Sprint } from '../../../dashboard/sprint/model/entities/sprint.entity';
import { SprintCrudService } from '../../../dashboard/sprint/services/sprint.crud.service';
import { TeamSpiritMedian } from '../../../dashboard/team-spirit/model/entities/team-spirit-median.entity';
import { TeamSpiritCrudService } from '../../../dashboard/team-spirit/services/team-spirit.crud.service';
import { ITeamSpiritService } from '../../../dashboard/team-spirit/services/team-spirit.interface';
import { EmailService } from '../../../email/services/email.service';
import { CloudFileStorageService } from '../../../file-storage/services/cloud-file-storage.service';
import { Files } from '../../../multimedia/model/entities/files.entity';
import { Multimedia } from '../../../multimedia/model/entities/multimedia.entity';
import { MultimediaCrudService } from '../../../multimedia/services/multimedia.crud.service';
import { IMultimediaService } from '../../../multimedia/services/multimedia.crud.service.interface';
import { LinksCategory } from '../../../team-links/model/entities/link-category.entity';
import { TeamLinks } from '../../../team-links/model/entities/team-links.entity';
import { TeamLinksCrudService } from '../../../team-links/services/team-links.crud.service';
import { ITeamLinksservice } from '../../../team-links/services/team-links.service.interface';
import { MyCenter } from '../../../teams/model/dto/MyCenter';
import { PowerboardResponse } from '../../../teams/model/dto/PowerboardResponse';
import { Team } from '../../../teams/model/entities/team.entity';
import { TeamStatus } from '../../../teams/model/entities/team_status.entity';
import { GlobalTeamsService } from '../../../teams/services/global.team.service';
import { IGlobalTeamsService } from '../../../teams/services/global.team.service.interface';
import { TeamCrudService } from '../../../teams/services/team.crud.service';
import { ITeamService } from '../../../teams/services/team.service.interface';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { User } from '../../user/model/entities/user.entity';
import { UserRole } from '../../user/model/entities/user_role.entity';
import { UserSession } from '../../user/model/entities/user_session.entity';
import { UserTeam } from '../../user/model/entities/user_team.entity';
import { UserPrivilegeService } from '../../user/services/user-privilege.service';
import { IUserPrivilegeService } from '../../user/services/user-privilege.service.inteface';
import { UserSessionDetailsService } from '../../user/services/user-session-details.service';
import { IUserSessionDetailsService } from '../../user/services/user-session-details.service.interface';
import { UserTeamService } from '../../user/services/user-team.service';
import { IUserTeamService } from '../../user/services/user-team.service.interface';
import { UserService } from '../../user/services/user.service';
import { IUserService } from '../../user/services/user.service.interface';
import { HomeResponse } from '../model/HomeResponse';
import { AuthService } from './auth.service';
//import { IAuthService } from './auth.service.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let adcService: IADCenterService;
  let dashboardService: IDashboardService;
  let teamLinkService: ITeamLinksservice;
  let teamRepo: TeamRepositoryMock;
  let adcRepo: ADCenterRepositoryMock;
  let userRepo: UserRepositoryMock;
  let userRoleRepo: UserRoleRepositoryMock;
  let userTeamRepo: UserTeamRepositoryMock;
  let clientStatusService: IClientStatusService;
  let codeQualityService: ICodeQualityService;
  let teamSpiritService: ITeamSpiritService;
  let sprintRepo: SprintRepositoryMock;
  let clientRepo: ClientStatusRepositoryMock;
  let codeQualityRepo: CodeQualityRepositoryMock;
  let teamSpiritRepository: TeamSpiritRepositoryMock;
  let userService: IUserService;
  let userTeamService: IUserTeamService;
  let userSessionDetailsService: IUserSessionDetailsService;
  let teamService: ITeamService;
  let globalTeamsService: IGlobalTeamsService;
  let userPrivilegeService: IUserPrivilegeService;
  let multimediaService: IMultimediaService;
  let emailService: EmailService;
  let linksCategoryRepo: LinksCategoryMock;
  let userSessionRepo: UserSessionDetailsRepositoryMock;
  let teamStatusRepo: TeamStatusRepositoryMock;
  let fileStorageService: CloudFileStorageService;
  let multimediaRepo: MultimediaRepositoryMock;
  let filesRepositoryMock: FilesRepositoryMock;
  // let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // HttpModule,
        //JwtModule
        JwtModule.register({
          secret: 'SECRET',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        TeamCrudService,
        UserService,
        TeamLinksCrudService,
        //JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
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
          provide: getRepositoryToken(CodeQualitySnapshot),
          useClass: CodeQualityRepositoryMock,
        },
        {
          provide: getRepositoryToken(TeamLinks),
          useClass: TeamLinksMockRepo,
        },
        {
          provide: getRepositoryToken(Files),
          useClass: FilesRepositoryMock,
        },
        {
          provide: getRepositoryToken(LinksCategory),
          useClass: LinksCategoryMock,
        },
        {
          provide: getRepositoryToken(Multimedia),
          useClass: MultimediaRepositoryMock,
        },
        {
          provide: getRepositoryToken(TeamStatus),
          useClass: TeamStatusRepositoryMock,
        },
        // {
        //   provide: 'IAuthService',
        //   useClass: AuthService,
        // },
        {
          provide: 'IADCenterService',
          useClass: ADCenterCrudService,
        },
        {
          provide: 'IDashboardService',
          useClass: DashboardService,
        },
        {
          provide: 'IClientStatusService',
          useClass: ClientStatusCrudService,
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
          provide: 'ITeamLinksService',
          useClass: TeamLinksCrudService,
        },
        {
          provide: 'IUserService',
          useClass: UserService,
        },
        {
          provide: 'IUserTeamService',
          useClass: UserTeamService,
        },
        {
          provide: 'IUserSessionDetailsService',
          useClass: UserSessionDetailsService,
        },
        {
          provide: 'IUserSessionDetailsService',
          useClass: UserSessionDetailsService,
        },
        {
          provide: 'ITeamService',
          useClass: TeamCrudService,
        },
        {
          provide: 'IGlobalTeamService',
          useClass: GlobalTeamsService,
        },

        {
          provide: 'IUserPrivilegeService',
          useClass: UserPrivilegeService,
        },
        {
          provide: 'IMultimediaService',
          useClass: MultimediaCrudService,
        },
        {
          provide: 'IFileStorageService',
          useClass: CloudFileStorageService,
        },
        {
          provide: 'IEmailService',
          useClass: EmailService,
        },
        {
          provide: getRepositoryToken(Team),
          useClass: TeamRepositoryMock,
        },
        {
          provide: getRepositoryToken(ADCenter),
          useClass: ADCenterRepositoryMock,
        },
        {
          provide: getRepositoryToken(Sprint),
          useClass: SprintRepositoryMock,
        },
        {
          provide: getRepositoryToken(ClientStatus),
          useClass: ClientStatusRepositoryMock,
        },
        {
          provide: getRepositoryToken(TeamSpiritMedian),
          useClass: TeamSpiritRepositoryMock,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    teamService = module.get<TeamCrudService>('ITeamService');
    userTeamService = module.get<UserTeamService>('IUserTeamService');
    userSessionDetailsService = module.get<UserSessionDetailsService>('IUserSessionDetailsService');
    globalTeamsService = module.get<GlobalTeamsService>('IGlobalTeamService');
    userPrivilegeService = module.get<UserPrivilegeService>('IUserPrivilegeService');
    adcService = module.get<ADCenterCrudService>('IADCenterService');
    dashboardService = module.get<DashboardService>('IDashboardService');
    userService = module.get<UserService>('IUserService');
    teamLinkService = module.get<TeamLinksCrudService>('ITeamLinksService');
    multimediaService = module.get<MultimediaCrudService>('IMultimediaService');
    emailService = module.get<EmailService>('IEmailService');
    teamRepo = module.get<TeamRepositoryMock>(getRepositoryToken(Team));
    adcRepo = module.get<ADCenterRepositoryMock>(getRepositoryToken(ADCenter));
    userRepo = module.get<UserRepositoryMock>(getRepositoryToken(User));
    userRoleRepo = module.get<UserRoleRepositoryMock>(getRepositoryToken(UserRole));
    userTeamRepo = module.get<UserTeamRepositoryMock>(getRepositoryToken(UserTeam));
    userSessionRepo = module.get<UserSessionDetailsRepositoryMock>(getRepositoryToken(UserSession));
    clientStatusService = module.get<ClientStatusCrudService>('IClientStatusService');
    teamSpiritService = module.get<TeamSpiritCrudService>('ITeamSpiritService');
    codeQualityService = module.get<CodeQualitySnapshotCrudService>('ICodeQualityService');
    fileStorageService = module.get<CloudFileStorageService>('IFileStorageService');
    sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
    clientRepo = module.get<ClientStatusRepositoryMock>(getRepositoryToken(ClientStatus));
    codeQualityRepo = module.get<CodeQualityRepositoryMock>(getRepositoryToken(CodeQualitySnapshot));
    teamSpiritRepository = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpiritMedian));
    linksCategoryRepo = module.get<LinksCategoryMock>(getRepositoryToken(LinksCategory));
    teamStatusRepo = module.get<TeamStatusRepositoryMock>(getRepositoryToken(TeamStatus));
    multimediaRepo = module.get<MultimediaRepositoryMock>(getRepositoryToken(Multimedia));
    filesRepositoryMock = module.get<FilesRepositoryMock>(getRepositoryToken(Files));
    //jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined after module initialization', () => {
    expect(authService).toBeDefined();
    expect(adcService).toBeDefined();
    expect(dashboardService).toBeDefined();
    expect(teamService).toBeDefined();
    expect(userService).toBeDefined();
    expect(teamLinkService).toBeDefined();
    expect(teamRepo).toBeDefined();
    expect(adcRepo).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(userRoleRepo).toBeDefined();
    expect(userTeamRepo).toBeDefined();
    expect(clientStatusService).toBeDefined();
    expect(codeQualityService).toBeDefined();
    expect(userService).toBeDefined();
    expect(teamSpiritService).toBeDefined();
    expect(clientRepo).toBeDefined();
    expect(sprintRepo).toBeDefined();
    expect(codeQualityRepo).toBeDefined();
    expect(teamSpiritRepository).toBeDefined();
    expect(userTeamService).toBeDefined();
    expect(userSessionDetailsService).toBeDefined();
    expect(globalTeamsService).toBeDefined();
    expect(userPrivilegeService).toBeDefined();
    expect(multimediaService).toBeDefined();
    expect(emailService).toBeDefined();
    expect(linksCategoryRepo).toBeDefined();
    expect(userSessionRepo).toBeDefined();
    expect(teamStatusRepo).toBeDefined();
    expect(fileStorageService).toBeDefined();
    expect(multimediaRepo).toBeDefined();
    expect(filesRepositoryMock).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a defined user response if the user is present in the database', async () => {
      const username = 'siva11';
      const password = 'password';
      const user = {
        id: '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        version: 1,
        createdAt: '2021-07-06T09:54:59.595Z',
        updatedAt: '2021-07-06T09:54:59.595Z',
        username: 'siva11',
        password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
        email: 'siva@capgemini.com',
      } as User;
      jest.spyOn(userService, 'findUser').mockResolvedValue(user);
      expect(await authService.validateUser(username, password)).toBeDefined();
    });
    it('should return undefined response if the user is not present in the database', async () => {
      const username = 'siva';
      const password = 'pass';
      jest.spyOn(userService, 'findUser').mockResolvedValue(undefined);
      expect(await authService.validateUser(username, password)).toBeUndefined();
    });
  });
  describe('singIn', () => {
    it('should return accessToken if the user is present in the database', async () => {
      const username = 'siva11';
      const password = 'password';
      expect(await authService.signIn(username, password)).toBeDefined();
    });
  });
  describe('login', () => {
    it('should return a JWT token and login response when a valid user is provided', async () => {
      let userDTO = {
        username: 'siva11',
        password: 'password',
      };
      const user = {
        id: '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        version: 1,
        createdAt: '2021-07-06T09:54:59.595Z',
        updatedAt: '2021-07-06T09:54:59.595Z',
        username: 'siva11',
        password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
        email: 'siva@capgemini.com',
      } as User;

      const accessToken: any = {};
      const userSession: any = {
        id: '56cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        version: 1,
        createdAt: '2021-09-03T08:52:58.568Z',
        updatedAt: '2021-09-03T08:52:58.568Z',
        userId: '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        isPasswordChanged: true,
        lastCheckedInProjectId: null,
      };
      const homeResponse: HomeResponse = {
        My_Center: {
          centerId: '99055bf7-ada7-495c-8019-8d7ab62d488e',
          centerName: 'ADCenter Bangalore',
        },
        My_Team: [
          {
            teamId: '46455bf7-ada7-495c-8019-8d7ab76d489e',
            teamName: 'Team B',
            myRole: 'team_member',
            teamStatus: 3,
          },
          {
            teamId: '46455bf7-ada7-495c-8019-8d7ab76d490e',
            teamName: 'Team C',
            myRole: 'team_admin',
            teamStatus: 3,
          },
        ],
        Teams_In_ADC: [
          {
            teamId: '46455bf7-ada7-495c-8019-8d7ab76d489e',
            teamName: 'Team B',
            teamStatus: 3,
          },
          {
            teamId: '46455bf7-ada7-495c-8019-8d7ab76d490e',
            teamName: 'Team C',
            teamStatus: 3,
          },
          {
            teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
            teamName: 'Team A',
            teamStatus: 3,
          },
        ],
        ADC_List: [
          {
            centerId: '98655bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Valencia',
          },
          {
            centerId: '98755bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Mumbai',
          },
          {
            centerId: '98855bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Poland',
          },
          {
            centerId: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Murcia',
          },
          {
            centerId: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Bangalore',
          },
        ],
      };
      const privileges: any = [];
      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(authService, 'signIn').mockImplementation(() => accessToken);
      jest.spyOn(userSessionDetailsService, 'getUserSessionDetails').mockImplementation(() => userSession);
      jest.spyOn(authService, 'getHomeDetailsForUserId').mockResolvedValue(homeResponse);
      jest.spyOn(authService, 'getPrivileges').mockImplementation(() => privileges);
      const tokenAndLoginResponse = await authService.login(userDTO);
      expect(tokenAndLoginResponse).toBeDefined();
    });
    it('should return a exception when an invalid user is provided', async () => {
      await expect(
        authService.login({
          username: 'user1',
          password: 'user2',
        } as any),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('loginGuest()', () => {
    it('should call the loginResponseForGuest() method and return login response for a guest user', async () => {
      let userDTO = {
        username: 'siva11',
        password: 'password',
      };

      const homeResponse: HomeResponse = {} as HomeResponse;
      const accessToken: any = 'anAccessToken';
      const loginResponse: any = {
        homeResponse,
        accessToken,
      };
      jest.spyOn(authService, 'signIn').mockImplementation(() => accessToken);
      jest.spyOn(authService, 'loginResponseForGuest').mockResolvedValue(loginResponse);
      expect(await authService.loginGuest(userDTO)).toBeDefined();
    });
  });

  describe('loginResponseForGuest()', () => {
    it('should return login response for a guest user', async () => {
      const accessToken = 'anyAccessToken';
      const adcenters: any = [
        [
          {
            centerId: '98655bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Valencia',
          },
          {
            centerId: '98755bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Mumbai',
          },
          {
            centerId: '98855bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Poland',
          },
          {
            centerId: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Murcia',
          },
          {
            centerId: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Bangalore',
          },
        ],
      ];
      const allTeams: any = {};
      jest.spyOn(adcService, 'getAllCenters').mockImplementation(() => adcenters);
      jest.spyOn(globalTeamsService, 'getTeamsByCenterId').mockImplementation(() => allTeams);
      expect(await authService.loginResponseForGuest(accessToken)).toBeDefined();
    });
  });
  describe('getHomeDetailsForUserId', () => {
    it('should return a home detail response for the given user', async () => {
      const userId = '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d';
      const userTeam = [
        {
          id: '762f1dfd-43e9-4cc4-8257-a6ba5c70e33d',
          version: 1,
          createdAt: '2021-09-08T11:39:39.145Z',
          updatedAt: '2021-09-08T11:39:39.145Z',
          user: {
            id: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
            version: 1,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:39:39.145Z',
            username: 'raj11',
            password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
            email: 'raj@mail.com',
          },
          team: {
            id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
            version: 2,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:40:11.861Z',
            name: 'Team A',
            teamCode: '10012345',
            projectKey: 'P12343',
            logo: null,
            isStatusChanged: false,
            ad_center: [ADCenter],
            team_status: [TeamStatus],
          },
          role: {
            id: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
            version: 1,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:39:39.145Z',
            roleName: 'team_member',
            description: null,
            privilege: [Array],
          },
        },
      ];
      const homeResponse: HomeResponse = {} as HomeResponse;
      jest.spyOn(userTeamService, 'findUserTeamsByUserId').mockImplementation(() => userTeam);
      jest.spyOn(authService, 'teamMemberTeamAdminHome').mockResolvedValue(homeResponse);
      expect(await authService.getHomeDetailsForUserId(userId)).toBeDefined();
    });
  });
  describe('getPowerboard()', () => {
    it('should return the powerboard response inside login response for a user who visited any team earlier', async () => {
      const visitedTeam = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const userId = '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d';
      const powerboardResponse: PowerboardResponse = {} as PowerboardResponse;
      jest.spyOn(teamService, 'getTeamInfoById').mockResolvedValue(powerboardResponse);
      expect(await authService.getPowerboard(visitedTeam, userId)).toBeDefined();
    });
  });
  describe('changePassword()', () => {
    it('should return the user with updated password', async () => {
      const changePasswordDTO = {
        userId: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        oldPassword: 'password',
        newPassword: 'pass',
      };
      const user = new User();
      jest.spyOn(userService, 'changePassword').mockResolvedValue(user);
      expect(await authService.changePassword(changePasswordDTO)).toBeDefined();
    });
  });
  describe('systemAdminHome()', () => {
    it('should return home response for system admin', async () => {
      const adcenters: any = [
        [
          {
            centerId: '98655bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Valencia',
          },
          {
            centerId: '98755bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Mumbai',
          },
          {
            centerId: '98855bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Poland',
          },
          {
            centerId: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Murcia',
          },
          {
            centerId: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            centerName: 'ADCenter Bangalore',
          },
        ],
      ];
      const allTeams: any = {};
      jest.spyOn(adcService, 'getAllCenters').mockImplementation(() => adcenters);
      jest.spyOn(globalTeamsService, 'getTeamsByCenterId').mockImplementation(() => allTeams);
      expect(await authService.systemAdminHome()).toBeDefined();
    });
  });

  describe('teamMemberTeamAdminHome()', () => {
    it('should return a home detail response for the team member or team admin', async () => {
      const userTeam: any = [
        {
          id: '762f1dfd-43e9-4cc4-8257-a6ba5c70e33d',
          version: 1,
          createdAt: '2021-09-08T11:39:39.145Z',
          updatedAt: '2021-09-08T11:39:39.145Z',
          user: {
            id: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
            version: 1,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:39:39.145Z',
            username: 'raj11',
            password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
            email: 'raj@mail.com',
          },
          team: {
            id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
            version: 2,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:40:11.861Z',
            name: 'Team A',
            teamCode: '10012345',
            projectKey: 'P12343',
            logo: null,
            isStatusChanged: false,
            ad_center: [ADCenter],
            team_status: [TeamStatus],
          },
          role: {
            id: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
            version: 1,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:39:39.145Z',
            roleName: 'team_member',
            description: null,
            privilege: [Array],
          },
        },
      ];
      const homeResponse: HomeResponse = {} as HomeResponse;
      jest.spyOn(globalTeamsService, 'findStatusByTeam').mockImplementation(() => userTeam);
      jest.spyOn(authService, 'homeDetailsForTeamMemberAdmin').mockResolvedValue(homeResponse);
      expect(await authService.teamMemberTeamAdminHome(userTeam)).toBeDefined();
    });
  });
  describe('homeDetailsForTeamMemberAdmin()', () => {
    it('should return home detail for the team member or team admin', async () => {
      const teamsDTOArray = [
        {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          teamName: 'Team A',
          myRole: 'team_member',
          teamStatus: 3,
        },
      ];
      const teamId = ' 46455bf7-ada7-495c-8019-8d7ab76d488e';
      const myCenter: MyCenter = {} as MyCenter;
      const teamsView: any = {};
      const allCenters: ViewCentersResponse[] = [];
      jest.spyOn(teamService, 'getCenterByTeamId').mockResolvedValue(myCenter);
      jest.spyOn(globalTeamsService, 'viewTeamsInADC').mockImplementation(() => teamsView);
      jest.spyOn(adcService, 'getAllCenters').mockResolvedValue(allCenters);
      expect(await authService.homeDetailsForTeamMemberAdmin(teamId, teamsDTOArray)).toBeDefined();
    });
  });
  describe('getPrivileges()', () => {
    it('should return the priveleges if the user is system admin or guest ', async () => {
      const userId = '35afbdf8-9035-4bc6-ae04-28c6140495ad';
      const userTeam: any = [
        {
          id: '762f1dfd-43e9-4cc4-8257-a6ba5c70e33d',
          version: 1,
          createdAt: '2021-09-08T11:39:39.145Z',
          updatedAt: '2021-09-08T11:39:39.145Z',
          user: {
            id: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
            version: 1,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:39:39.145Z',
            username: 'raj11',
            password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
            email: 'raj@mail.com',
          },
          // team: {
          //   id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          //   version: 2,
          //   createdAt: '2021-09-08T11:39:39.145Z',
          //   updatedAt: '2021-09-08T11:40:11.861Z',
          //   name: 'Team A',
          //   teamCode: '10012345',
          //   projectKey: 'P12343',
          //   logo: null,
          //   isStatusChanged: false,
          //   ad_center: [ADCenter],
          //   team_status: [TeamStatus]
          // },
          role: {
            id: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
            version: 1,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:39:39.145Z',
            roleName: 'team_member',
            description: null,
            privilege: [Array],
          },
        },
      ];
      const privileges: any = [
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
      jest.spyOn(userTeamService, 'findUserTeamsByUserId').mockImplementation(() => userTeam);
      jest.spyOn(userPrivilegeService, 'getAllPrivilegeForAdmin').mockImplementation(() => privileges);
      expect(await authService.getPrivileges(userId)).toEqual(privileges);
    });
    it('should return the priveleges if the user is team admin or team member associated with any team', async () => {
      const userId = '35afbdf8-9035-4bc6-ae04-28c6140495ad';
      const userTeam: any = [
        {
          id: '762f1dfd-43e9-4cc4-8257-a6ba5c70e33d',
          version: 1,
          createdAt: '2021-09-08T11:39:39.145Z',
          updatedAt: '2021-09-08T11:39:39.145Z',
          user: {
            id: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
            version: 1,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:39:39.145Z',
            username: 'raj11',
            password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
            email: 'raj@mail.com',
          },
          team: {
            id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
            version: 2,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:40:11.861Z',
            name: 'Team A',
            teamCode: '10012345',
            projectKey: 'P12343',
            logo: null,
            isStatusChanged: false,
            ad_center: [ADCenter],
            team_status: [TeamStatus],
          },
          role: {
            id: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
            version: 1,
            createdAt: '2021-09-08T11:39:39.145Z',
            updatedAt: '2021-09-08T11:39:39.145Z',
            roleName: 'team_member',
            description: null,
            privilege: [Array],
          },
        },
      ];
      const privileges: any = [];
      jest.spyOn(userTeamService, 'findUserTeamsByUserId').mockImplementation(() => userTeam);
      jest.spyOn(userPrivilegeService, 'getAllPrivilegeForAdmin').mockImplementation(() => privileges);
      expect(await authService.getPrivileges(userId)).toEqual(privileges);
    });
  });
  describe('register', () => {
    it('should register a new user if not exists', async () => {
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
      const user1 = new User();
      jest.spyOn(userService, 'registerUser').mockResolvedValue(user1);
      const user = await authService.register(userDTO);
      expect(user).toBeDefined();
      //expect(authService.register).toBeCalledTimes(1);
    });
  });
});
