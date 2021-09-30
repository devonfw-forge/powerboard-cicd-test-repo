import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  ClientStatusRepositoryMock,
  SprintRepositoryMock,
} from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { Team } from '../../../teams/model/entities/team.entity';
import { Sprint } from '../../sprint/model/entities/sprint.entity';
import { ClientStatus } from '../model/entities/client-status.entity';
import { ClientStatusCrudService } from './client-status.crud.service';

describe('ClientStatusCrudService', () => {
  let service: ClientStatusCrudService;
  let clientStausRepo: ClientStatusRepositoryMock;
  let sprintRepo: SprintRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientStatusCrudService,
        {
          provide: getRepositoryToken(ClientStatus),
          useClass: ClientStatusRepositoryMock,
        },
        {
          provide: getRepositoryToken(Sprint),
          useClass: SprintRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ClientStatusCrudService>(ClientStatusCrudService);
    clientStausRepo = module.get<ClientStatusRepositoryMock>(getRepositoryToken(ClientStatus));
    sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(clientStausRepo).toBeDefined();
    expect(sprintRepo).toBeDefined();
  });

  it('getClientFeedback() method should return clientStatusResponse', async () => {
    const team1: Team = {
      id: '1',
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      name: 'Team A',
      teamCode: '102112',
      isStatusChanged: true,
      team_status: {
        id: 1,
        status: 'on_track',
        description: 'It is on Track',
      },
      logo: '',
      projectKey: 'T12311',
      userTeam: [],
      ad_center: {
        id: '1',
        version: 1,
        createdAt: '2021-03-12T17:36:31.141Z',
        updatedAt: '2021-03-12T17:36:31.141Z',
        name: 'ADC Bangalore',
      },
    };
    const sprint: Sprint = {
      id: '2',
      version: 1,
      createdAt: '2021-03-22T08:39:31.870Z',
      updatedAt: '2021-03-22T08:39:31.870Z',
      sprint_number: 10,
      start_date: '2021-02-10',
      end_date: '2021-02-25',
      status: '3',
      team: team1,
      work_unit: '2',
    };

    const clientStatus: ClientStatus = {
      id: '2',
      version: 1,
      createdAt: '2021-03-27T16:07:27.741Z',
      updatedAt: '2021-03-27T16:07:27.741Z',
      client_rating: 5,
      sprint: sprint,
    };

    const expectedClientStatusResponse = {
      clientSatisfactionRating: 5,
      sprintNumber: 10,
    };

    const createQueryBuilder1: any = {
      limit: () => createQueryBuilder1,
      where: () => createQueryBuilder1,
      getOne: jest.fn().mockResolvedValue(clientStatus),
    };

    const createQueryBuilder2: any = {
      limit: () => createQueryBuilder2,
      groupBy: () => createQueryBuilder2,
      where: () => createQueryBuilder2,
      orderBy: () => createQueryBuilder2,
      skip: () => createQueryBuilder2,
      take: () => createQueryBuilder2,
      getOne: jest.fn().mockResolvedValue(sprint),
    };

    jest.spyOn(clientStausRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder1);
    jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder2);
    //repository.createQueryBuilder = jest.fn().mockResolvedValue(codeQuality);
    const actualClientStatus = await service.getClientFeedback(team1.id);
    expect(sprintRepo.createQueryBuilder).toBeCalledTimes(1);
    expect(clientStausRepo.createQueryBuilder).toBeCalledTimes(1);
    expect(actualClientStatus).toEqual(expectedClientStatusResponse);
  });
});
