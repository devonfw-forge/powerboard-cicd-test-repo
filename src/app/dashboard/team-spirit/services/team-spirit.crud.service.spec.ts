import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamSpiritRepositoryMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { TeamSpiritMedian } from '../model/entities/team-spirit-median.entity';
import { TeamSpiritCrudService } from './team-spirit.crud.service';

describe('TeamSpiritCrudService', () => {
  let teamSpiritService: TeamSpiritCrudService;
  let teamSpiritRepository: TeamSpiritRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TeamSpiritCrudService,
        {
          provide: getRepositoryToken(TeamSpiritMedian),
          useClass: TeamSpiritRepositoryMock,
        },
      ],
    }).compile();

    teamSpiritService = module.get<TeamSpiritCrudService>(TeamSpiritCrudService);
    teamSpiritRepository = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpiritMedian));
  });

  it('should be defined after module initialization', () => {
    expect(teamSpiritService).toBeDefined();
    expect(teamSpiritRepository).toBeDefined();
  });

  describe('getTeamSpiritFromSurvey', () => {
    it('getTeamSpiritFromSurvey() method should return teamSpiritResponse', async () => {
      const teamName = 'Team A';

      const teamSpiritMedian = {
        id: '70023bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        surveyMedian: 7,
        startDate: '2021-06-22T07:50:34.000Z',
        endDate: '2021-07-02T07:55:40.000Z',
        surveyCode: 'AZ4r52',
      };

      const createQueryBuilder: any = {
        limit: () => createQueryBuilder,
        groupBy: () => createQueryBuilder,
        where: () => createQueryBuilder,
        orderBy: () => createQueryBuilder,
        skip: () => createQueryBuilder,
        take: () => createQueryBuilder,
        getOne: jest.fn().mockResolvedValue(teamSpiritMedian),
      };

      const expectedTeamSpiritResponse = {
        teamSpiritRating: 7,
      };
      jest.spyOn(teamSpiritRepository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);
      const actualTeamSpirit = await teamSpiritService.getTeamSpiritFromSurvey(teamName);
      expect(teamSpiritRepository.createQueryBuilder).toBeCalledTimes(1);
      expect(actualTeamSpirit).toEqual(expectedTeamSpiritResponse);
    });
  });
});
