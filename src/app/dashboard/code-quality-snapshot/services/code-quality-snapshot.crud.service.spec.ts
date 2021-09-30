import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodeQualityRepositoryMock, MockRepository } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { CodeQualityResponse } from '../model/dto/CodeQualityResponse';
import { CodeQualitySnapshot } from '../model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from './code-quality-snapshot.crud.service';

describe('CodeQualitySnapshotCrudService', () => {
  let service: CodeQualitySnapshotCrudService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodeQualitySnapshotCrudService,
        {
          provide: getRepositoryToken(CodeQualitySnapshot),
          useClass: CodeQualityRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CodeQualitySnapshotCrudService>(CodeQualitySnapshotCrudService);
    repository = module.get<MockRepository>(getRepositoryToken(CodeQualitySnapshot));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('getCodeQualitySnapshot', () => {
    const teamId = '46455bf7-ada7-495c-8019-8d7ab76d490e';
    // const team = {
    //   id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
    //   version: 1,
    //   createdAt: '2021-06-25T08:25:00.982Z',
    //   updatedAt: '2021-06-25T08:25:00.982Z',
    //   name: 'Team C',
    //   teamCode: '10012347',
    //   projectKey: 'P87695',
    //   logo: null,
    //   ad_center: {
    //     id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
    //     version: 1,
    //     createdAt: '2021-06-25T08:25:00.982Z',
    //     updatedAt: '2021-06-25T08:25:00.982Z',
    //     name: 'ADCenter Bangalore'
    //   }
    // }
    const codeQuality = {
      id: '61055bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-06-25T08:25:00.982Z',
      updatedAt: '2021-06-25T08:25:00.982Z',
      bugs: 5,
      codeSmells: 21,
      code_coverage: 80,
      status: 'PASSED',
      snapshot_time: '2021-05-16T20:40:55.000Z',
    };

    it('should return code quality response of the existed team', async () => {
      const expectedCodeQualityResponse: CodeQualityResponse = {
        bugs: 5,
        codeSmells: 21,
        codeCoverage: 80,
        status: 'PASSED',
      };

      const createQueryBuilder: any = {
        limit: () => createQueryBuilder,
        groupBy: () => createQueryBuilder,
        where: () => createQueryBuilder,
        orderBy: () => createQueryBuilder,
        getOne: jest.fn().mockResolvedValue(codeQuality),
      };

      jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);
      const actualCodeQualityResponse = await service.getCodeQualitySnapshot(teamId);
      expect(repository.createQueryBuilder).toBeCalledTimes(1);
      expect(actualCodeQualityResponse).toEqual(expectedCodeQualityResponse);
    });
  });
});
