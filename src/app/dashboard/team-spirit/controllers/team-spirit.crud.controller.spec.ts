import { Test, TestingModule } from '@nestjs/testing';
import { TeamSpiritMockService } from '../../../../../test/mockedServices/team-spirit.service.mock';
import { TeamSpiritCrudController } from './team-spirit.crud.controller';

describe('TeamSpiritController', () => {
  let teamSpiritController: TeamSpiritCrudController;
  let teamSpiritService: TeamSpiritMockService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamSpiritCrudController],
      providers: [
        {
          provide: 'ITeamSpiritService',
          useClass: TeamSpiritMockService,
        },
      ],
    }).compile();

    teamSpiritController = module.get<TeamSpiritCrudController>(TeamSpiritCrudController);
    teamSpiritService = module.get<TeamSpiritMockService>('ITeamSpiritService');
  });

  it('should be defined after module initialization', () => {
    expect(teamSpiritController).toBeDefined();
    expect(teamSpiritService).toBeDefined();
  });

  describe('getTeamSpiritFromSurvery()', () => {
    it('should fetch the team spirit rating for the team', async () => {
      const teamName = 'Team A';

      const teamSpiritRating = 7;
      jest.spyOn(teamSpiritService, 'getTeamSpiritFromSurvey').mockImplementation(() => teamSpiritRating);
      const result = await teamSpiritController.getTeamSpiritFromSurvery(teamName);
      expect(result).toBe(teamSpiritRating);
    });
  });
});
