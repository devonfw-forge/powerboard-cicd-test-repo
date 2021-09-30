import { Test, TestingModule } from '@nestjs/testing';
import { TeamLinksMockService } from '../../../../test/mockedServices/team-links.service.mock';
import { TeamLinks } from '../model/entities/team-links.entity';
import { TeamLinksCrudController } from './team-links.crud.controller';

describe('Auth Controller', () => {
  let teamLinksController: TeamLinksCrudController;
  let teamLinksService: TeamLinksMockService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamLinksCrudController],
      providers: [
        {
          provide: 'ITeamLinksService',
          useClass: TeamLinksMockService,
        },
      ],
    }).compile();

    teamLinksController = module.get<TeamLinksCrudController>(TeamLinksCrudController);
    teamLinksService = module.get<TeamLinksMockService>('ITeamLinksService');
  });

  it('should be defined after module initialization', () => {
    expect(teamLinksController).toBeDefined();
    expect(teamLinksService).toBeDefined();
  });

  describe('getTeamLinks', () => {
    it('should return all the team links of team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const allTeamLinks = {} as TeamLinks[];
      jest.spyOn(teamLinksService, 'getTeamLinks').mockImplementation(() => allTeamLinks);
      await teamLinksController.getTeamLinks(teamId, mockResponse);
      expect(teamLinksService.getTeamLinks).toBeCalledWith(teamId);
      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);
    });
  });

  describe('deleteTeamLinkById', () => {
    it('should delete the team link by its id', async () => {
      const teamLinkId = '51055bf5-ada5-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await teamLinksController.deleteTeamLinkById(teamLinkId, mockResponse);
      expect(teamLinksService.deleteTeamLinkById).toBeCalledWith(teamLinkId);
      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);
    });
  });

  describe('addTeamLinks', () => {
    it('should create the team link', async () => {
      const addTeamLinkDTO = {
        linkName: 'Google',
        linkType: '10005bf7-ada7-495c-8019-8d7ab62d488e',
        links: 'http://google.com',
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      };

      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      //jest.spyOn(teamLinksService.createTeamLinks)
      await teamLinksController.addTeamLinks(addTeamLinkDTO, mockResponse);
      expect(teamLinksService.createTeamLinks).toBeCalledWith(addTeamLinkDTO);
      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(201);
    });
  });

  describe('getLinksCategory', () => {
    it('should return the team links category', async () => {
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await teamLinksController.getLinksCategory(mockResponse);
      expect(teamLinksService.getLinksCategory).toBeCalled();
      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);
    });
  });
});
