import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SprintRepositoryMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
//import { SprintDetailResponse } from '../model/dto/SprintDetailResponse';
//import { SprintDetailResponse } from '../model/dto/SprintDetailResponse';
//import { Team } from '../../../teams/model/entities/team.entity';
//import { SprintDetailResponse } from '../model/dto/SprintDetailResponse';

import { Sprint } from '../model/entities/sprint.entity';

import { SprintCrudService } from './sprint.crud.service';
import { ISprintCrudService } from './sprint.crud.service.interface';

describe('SprintCrudService', () => {
  let service: ISprintCrudService;
  let sprintRepo: SprintRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SprintCrudService,
        {
          provide: 'ISprintCrudService',
          useClass: SprintCrudService,
        },
        {
          provide: getRepositoryToken(Sprint),
          useClass: SprintRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<SprintCrudService>('ISprintCrudService');
    sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(sprintRepo).toBeDefined();
  });

  const teamId = '46455bf7-ada7-495c-8019-8d7ab76d490e';

  it('getSprintDetailResponse() should return sprint Detail Response', async () => {
    const sprintDetail: any = [
      {
        sprint_id: '20555bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021-06-25T08:25:00.982Z',
        sprint_updatedAt: '2021-06-25T08:25:00.982Z',
        sprint_sprint_number: 22,
        sprint_start_date: '2021-06-08T10:00:15.000Z',
        sprint_end_date: '2021-07-06T10:00:15.000Z',
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
        sprint_work_unit: '11155bf1-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80355bf8-ada5-495c-8019-8d7ab76d488e',
        ss_date_time: '2021-06-08T09:00:00.000Z',
        ssm_value: '280',
        smt_name: 'Work Committed',
      },
      {
        sprint_id: '20555bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021-06-25T08:25:00.982Z',
        sprint_updatedAt: '2021-06-25T08:25:00.982Z',
        sprint_sprint_number: 22,
        sprint_start_date: '2021-06-08T10:00:15.000Z',
        sprint_end_date: '2021-07-06T10:00:15.000Z',
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
        sprint_work_unit: '11155bf1-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80355bf8-ada5-495c-8019-8d7ab76d488e',
        ss_date_time: '2021-06-08T09:00:00.000Z',
        ssm_value: '35',
        smt_name: 'Work Completed',
      },
    ];
    // const expectedSprintDetailResponse: SprintDetailResponse = {
    //   Sprint_current_day: 28,
    //   sprint_number: 22,
    //   Sprint_days: 28,
    // };

    const createQueryBuilder1: any = {
      limit: () => createQueryBuilder1,
      groupBy: () => createQueryBuilder1,
      where: () => createQueryBuilder1,
      orderBy: () => createQueryBuilder1,
      skip: () => createQueryBuilder1,
      take: () => createQueryBuilder1,
      addSelect: () => createQueryBuilder1,
      innerJoin: () => createQueryBuilder1,
      leftJoin: () => createQueryBuilder1,
      andWhere: () => createQueryBuilder1,
      getRawMany: jest.fn().mockResolvedValue(sprintDetail),
    };

    jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder1);
    const result = await service.getSprintDetailResponse(teamId);
    //await service.getSprintDetailResponse(teamId);
    expect(sprintRepo.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    // expect(actualSprintDetail).toEqual(expectedSprintDetailResponse);
  });

  it('getBurnDown() should return burndown details', async () => {
    const sprintForBurndown: any = [
      {
        sprint_id: '20555bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021-06-25T08:25:00.982Z',
        sprint_updatedAt: '2021-06-25T08:25:00.982Z',
        sprint_sprint_number: 22,
        sprint_start_date: '2021-06-08T10:00:15.000Z',
        sprint_end_date: '2021-07-06T10:00:15.000Z',
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
        sprint_work_unit: '11155bf1-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80355bf8-ada5-495c-8019-8d7ab76d488e',
        ss_date_time: '2021-06-08T09:00:00.000Z',
        ssm_value: '280',
        sw_work_unit: 'hour',
        smt_name: 'Work Committed',
      },
      {
        sprint_id: '20555bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021-06-25T08:25:00.982Z',
        sprint_updatedAt: '2021-06-25T08:25:00.982Z',
        sprint_sprint_number: 22,
        sprint_start_date: '2021-06-08T10:00:15.000Z',
        sprint_end_date: '2021-07-06T10:00:15.000Z',
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
        sprint_work_unit: '11155bf1-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80355bf8-ada5-495c-8019-8d7ab76d488e',
        ss_date_time: '2021-06-08T09:00:00.000Z',
        ssm_value: '35',
        sw_work_unit: 'hour',
        smt_name: 'Work Completed',
      },
    ];

    // const expectedBurndownResponse = {
    //   workUnit: 'hour',
    //   remainingDays: 0,
    //   remainingWork: 245,
    //   count: 245,
    //   burndownStatus: 'Behind Time',
    // };

    const createQueryBuilder: any = {
      limit: () => createQueryBuilder,
      groupBy: () => createQueryBuilder,
      where: () => createQueryBuilder,
      orderBy: () => createQueryBuilder,
      skip: () => createQueryBuilder,
      take: () => createQueryBuilder,
      addSelect: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      leftJoin: () => createQueryBuilder,
      andWhere: () => createQueryBuilder,

      getRawMany: jest.fn().mockResolvedValue(sprintForBurndown),
    };

    jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

    const actualBurndownResponse = await service.getBurndown(teamId);
    //await service.getBurndown(teamId);
    expect(sprintRepo.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(actualBurndownResponse).toBeDefined();
    // expect(actualBurndownResponse).toEqual(expectedBurndownResponse);
  });

  describe('getVelocityComparison()', () => {
    it('getVelocityComparison() should return velocity comparison details', async () => {
      const currentSprintVelocity: any = [
        {
          sprint_id: '20555bf8-ada5-495c-8019-8d7ab76d488e',
          sprint_version: 1,
          sprint_createdAt: '2021-06-25T08:25:00.982Z',
          sprint_updatedAt: '2021-06-25T08:25:00.982Z',
          sprint_sprint_number: 22,
          sprint_start_date: '2021-06-08T10:00:15.000Z',
          sprint_end_date: '2021-07-06T10:00:15.000Z',
          sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
          sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
          sprint_work_unit: '11155bf1-ada5-495c-8019-8d7ab76d488e',
          st_status: 'In Progress',
          ss_id: '80355bf8-ada5-495c-8019-8d7ab76d488e',
          ssm_value: '280',
          smt_name: 'Work Committed',
        },
        {
          sprint_id: '20555bf8-ada5-495c-8019-8d7ab76d488e',
          sprint_version: 1,
          sprint_createdAt: '2021-06-25T08:25:00.982Z',
          sprint_updatedAt: '2021-06-25T08:25:00.982Z',
          sprint_sprint_number: 22,
          sprint_start_date: '2021-06-08T10:00:15.000Z',
          sprint_end_date: '2021-07-06T10:00:15.000Z',
          sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
          sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
          sprint_work_unit: '11155bf1-ada5-495c-8019-8d7ab76d488e',
          st_status: 'In Progress',
          ss_id: '80355bf8-ada5-495c-8019-8d7ab76d488e',
          ssm_value: '35',
          smt_name: 'Work Completed',
        },
      ];

      const previousSprintsVelocityComparison: any = [
        {
          sprint_id: '20455bf8-ada5-495c-8019-8d7ab76d488e',
          sprint_version: 1,
          sprint_createdAt: '2021-06-25T08:25:00.982Z',
          sprint_updatedAt: '2021-06-25T08:25:00.982Z',
          sprint_sprint_number: 21,
          sprint_start_date: '2021-05-10T09:00:15.000Z',
          sprint_end_date: '2021-06-07T09:00:15.000Z',
          sprint_status: '11155bf3-ada5-495c-8019-8d7ab76d488e',
          sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
          sprint_work_unit: '11155bf1-ada5-495c-8019-8d7ab76d488e',
          st_status: 'Completed',
          ss_id: '80655bf8-ada5-495c-8019-8d7ab76d488e',
          ssm_value: '90',
          smt_name: 'Work Completed',
        },
      ];

      // const expectedVelocityResponse: VelocityComparisonResponse = {
      //   Avg: 90,
      //   Committed: 280,
      //   Completed: 35,
      // };

      const createQueryBuilder: any = {
        limit: () => createQueryBuilder,
        groupBy: () => createQueryBuilder,
        where: () => createQueryBuilder,
        orderBy: () => createQueryBuilder,
        skip: () => createQueryBuilder,
        take: () => createQueryBuilder,
        addSelect: () => createQueryBuilder,
        innerJoin: () => createQueryBuilder,
        leftJoin: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getRawMany: jest.fn().mockResolvedValue(currentSprintVelocity),
      };

      const createQueryBuilder1: any = {
        limit: () => createQueryBuilder1,
        groupBy: () => createQueryBuilder1,
        where: () => createQueryBuilder1,
        orderBy: () => createQueryBuilder1,
        skip: () => createQueryBuilder1,
        take: () => createQueryBuilder1,
        addSelect: () => createQueryBuilder1,
        innerJoin: () => createQueryBuilder1,
        leftJoin: () => createQueryBuilder1,
        andWhere: () => createQueryBuilder1,
        getRawMany: jest.fn().mockResolvedValue(previousSprintsVelocityComparison),
      };

      jest
        .spyOn(sprintRepo, 'createQueryBuilder')
        .mockImplementationOnce(() => createQueryBuilder)
        .mockImplementationOnce(() => createQueryBuilder1);

      // await service.getVelocityComparison(teamId);
      const result = await service.getVelocityComparison(teamId);
      expect(sprintRepo.createQueryBuilder).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
    });
    it('getVelocityComparison() should return undefined error if there is any error with query builder', async () => {
      const someError = undefined;
      const createQueryBuilder: any = {
        limit: () => createQueryBuilder,
        groupBy: () => createQueryBuilder,
        where: () => createQueryBuilder,
        orderBy: () => createQueryBuilder,
        skip: () => createQueryBuilder,
        take: () => createQueryBuilder,
        addSelect: () => createQueryBuilder,
        innerJoin: () => createQueryBuilder,
        leftJoin: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getRawMany: jest.fn().mockResolvedValue(someError),
      };
      jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);
      expect(await service.getVelocityComparison(teamId)).toBeUndefined();
    });
  });
});
