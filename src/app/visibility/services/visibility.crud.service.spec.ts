import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VisibilityMock } from '../../../../test/mockCrudRepository/crudRepository.mock';
import { Visibility } from '../model/entities/visibility.entity';
import { VisibilityCrudService } from './visibility.crud.service';

describe('VisibilityCrudService', () => {
  let visibilityService: VisibilityCrudService;
  let visibilityRepo: VisibilityMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisibilityCrudService,
        {
          provide: getRepositoryToken(Visibility),
          useClass: VisibilityMock,
        },
      ],
    }).compile();

    visibilityService = module.get<VisibilityCrudService>(VisibilityCrudService);
    visibilityRepo = module.get<VisibilityMock>(getRepositoryToken(Visibility));
  });

  it('should be defined after module initialization', () => {
    expect(visibilityService).toBeDefined();
    expect(visibilityRepo).toBeDefined();
  });
});
