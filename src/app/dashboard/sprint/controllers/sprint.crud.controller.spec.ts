import { Test, TestingModule } from '@nestjs/testing';

import { SprintCrudController } from './sprint.crud.controller';

describe('SprintController', () => {
  let sprintController: SprintCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprintCrudController],
      providers: [],
    }).compile();

    sprintController = module.get<SprintCrudController>(SprintCrudController);
  });

  it('should be defined after module initialization', () => {
    expect(sprintController).toBeDefined();
  });
});
