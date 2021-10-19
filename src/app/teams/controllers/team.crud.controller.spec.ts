import { Test, TestingModule } from '@nestjs/testing';
import { GlobalTeamMockService } from '../../../../test/mockedServices/global-team.service.mock';
import { TeamMockService } from '../../../../test/mockedServices/team.service.mock';
import { ADCenter } from '../../ad-center/model/entities/ad-center.entity';
import { AddTeam } from '../../shared/interfaces/addTeam.interface';
import { TeamCrudController } from './team.crud.controller';

describe('Multimedia Controller', () => {
  let teamController: TeamCrudController;
  let teamService: TeamMockService;
  let globalTeamService: GlobalTeamMockService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamCrudController],
      providers: [
        {
          provide: 'ITeamService',
          useClass: TeamMockService,
        },
        {
          provide: 'IGlobalTeamService',
          useClass: GlobalTeamMockService,
        },
      ],
    }).compile();
    teamController = module.get<TeamCrudController>(TeamCrudController);
    teamService = module.get<TeamMockService>('ITeamService');
    globalTeamService = module.get<GlobalTeamMockService>('IGlobalTeamService');
  });
  it('should be defined after module initialization', () => {
    expect(teamController).toBeDefined();
    expect(teamService).toBeDefined();
    expect(globalTeamService).toBeDefined();
  });
  describe('getTeamInfoById()', () => {
    it('should return team information by user id and team id', async () => {
      // const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const userTeam = {
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        userId: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
      };
      await expect(teamController.getTeamInfoById(userTeam, mockResponse)).resolves.not.toThrow();
      expect(teamService.getTeamInfoById).toBeCalled();
    });
  });
  describe('getTeamsByCenterId()', () => {
    it('should return team information by user id and team id', async () => {
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const centerId = '98655bf7-ada7-495c-8019-8d7ab62d488e';

      await expect(teamController.getTeamsByCenterId(centerId, mockResponse)).resolves.not.toThrow();
      expect(globalTeamService.getTeamsByCenterId).toBeCalled();
    });
  });
  describe('addTeam()', () => {
    it('should create a new team', async () => {
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const logo = {};
      const center: ADCenter = {} as ADCenter;
      const addTeam: AddTeam = {
        teamName: 'Team A',
        teamCode: '785683',
        projectKey: 'P908678253',
        ad_center: center,
      };
      await expect(teamController.addTeam(addTeam, logo, mockResponse)).resolves.not.toThrow();
      expect(globalTeamService.addTeam).toBeCalled();
    });
  });
  describe('deleteTeamById()', () => {
    it('should create a new team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await expect(teamController.deleteTeamById(teamId, mockResponse)).resolves.not.toThrow();
      expect(globalTeamService.deleteTeamById).toBeCalled();
    });
  });
  describe('getAllTeams()', () => {
    it('should create a new team', async () => {
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await expect(teamController.getAllTeams(mockResponse)).resolves.not.toThrow();
      expect(globalTeamService.getAllTeams).toBeCalled();
    });
  });
  describe('updateTeam()', () => {
    it('should create a new team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';

      const updateTeam = {
        teamName: 'Team A',
        teamCode: '78957787',
        projectKey: 'P895678',
      };
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await expect(teamController.updateTeam(teamId, updateTeam, mockResponse)).resolves.not.toThrow();
      expect(teamService.updateTeam).toBeCalled();
    });
  });
  describe('uploadLogo()', () => {
    it('should create a new team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';

      const logo = {};
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await expect(teamController.uploadLogo(logo, teamId, mockResponse)).resolves.not.toThrow();
      expect(globalTeamService.uploadLogoForTeam).toBeCalled();
    });
  });
  describe('deleteLogoFromTeam()', () => {
    it('should create a new team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await expect(teamController.deleteLogoFromTeam(teamId, mockResponse)).resolves.not.toThrow();
      expect(globalTeamService.deleteLogoFromTeam).toBeCalled();
    });
  });
});
