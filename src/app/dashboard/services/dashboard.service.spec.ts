import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  ClientStatusRepositoryMock,
  CodeQualityRepositoryMock,
  SprintRepositoryMock,
  TeamSpiritRepositoryMock,
} from '../../../../test/mockCrudRepository/crudRepository.mock';
import { ClientStatus } from '../client-status/model/entities/client-status.entity';
import { ClientStatusCrudService } from '../client-status/services/client-status.crud.service';
import { IClientStatusService } from '../client-status/services/client-status.service.interface';
import { CodeQualitySnapshot } from '../code-quality-snapshot/model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from '../code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { ICodeQualityService } from '../code-quality-snapshot/services/code-quality-snapshot.service.interface';

import { Sprint } from '../sprint/model/entities/sprint.entity';
import { SprintCrudService } from '../sprint/services/sprint.crud.service';
import { ISprintCrudService } from '../sprint/services/sprint.crud.service.interface';
import { TeamSpiritMedian } from '../team-spirit/model/entities/team-spirit-median.entity';
import { TeamSpiritCrudService } from '../team-spirit/services/team-spirit.crud.service';
import { ITeamSpiritService } from '../team-spirit/services/team-spirit.interface';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let clientStatusService: IClientStatusService;
  let codeQualityService: ICodeQualityService;
  let sprintService: ISprintCrudService;
  // let sprintServiceImpl: SprintCrudService;
  let teamSpiritService: ITeamSpiritService;
  let dashboardService: DashboardService;
  let codeQualityRepo: CodeQualityRepositoryMock;
  let clientStatusRepo: ClientStatusRepositoryMock;
  let teamSpiritRepository: TeamSpiritRepositoryMock;
  let sprintRepo: SprintRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        DashboardService,
        SprintCrudService,
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
          provide: getRepositoryToken(Sprint),
          useClass: SprintRepositoryMock,
        },
        {
          provide: getRepositoryToken(ClientStatus),
          useClass: ClientStatusRepositoryMock,
        },
        {
          provide: getRepositoryToken(CodeQualitySnapshot),
          useClass: CodeQualityRepositoryMock,
        },
        {
          provide: getRepositoryToken(TeamSpiritMedian),
          useClass: TeamSpiritRepositoryMock,
        },
      ],
    }).compile();

    clientStatusService = module.get<ClientStatusCrudService>('IClientStatusService');
    sprintService = module.get<SprintCrudService>('ISprintCrudService');
    teamSpiritService = module.get<TeamSpiritCrudService>('ITeamSpiritService');
    codeQualityService = module.get<CodeQualitySnapshotCrudService>('ICodeQualityService');
    //fileStorageService = module.get<LocalFileStorageService>('IFileStorageService');
    dashboardService = module.get<DashboardService>(DashboardService);
    // sprintService = module.get<SprintCrudService>(SprintCrudService);
    sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
    codeQualityRepo = module.get<CodeQualityRepositoryMock>(getRepositoryToken(CodeQualitySnapshot));
    clientStatusRepo = module.get<ClientStatusRepositoryMock>(getRepositoryToken(ClientStatus));
    teamSpiritRepository = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpiritMedian));
  });

  it('should be defined after module initialization', () => {
    expect(clientStatusService).toBeDefined();
    expect(codeQualityService).toBeDefined();
    expect(sprintService).toBeDefined();
    expect(teamSpiritService).toBeDefined();
    expect(dashboardService).toBeDefined();
    expect(sprintRepo).toBeDefined();
    expect(sprintService).toBeDefined();
    expect(codeQualityRepo).toBeDefined();
    expect(clientStatusRepo).toBeDefined();
    expect(teamSpiritRepository).toBeDefined();
  });

  describe('getDashboardByTeamId()', () => {
    const burndownResponse: any = {
      workUnit: 'story point',
      remainingDays: 26,
      remainingWork: 122,
      count: 8,
      burndownStatus: 'Ahead Time',
    };
    const status = 1;
    const velocityComparisonResponse: any = { Avg: 115, Committed: 140, Completed: 18 };
    const spirintDetailResponse: any = { Sprint_current_day: 2, sprint_number: 11, Sprint_days: 28 };

    test('test 1 if team present', async () => {
      //inputs
      const codeQualityResponse: any = { bugs: 3, debt: 13, codeCoverage: 85, status: 'PASSED' };
      const clientStatusResponse: any = { clientSatisfactionRating: 5, sprintNumber: 10 };
      const teamSpiritResponse: any = { teamSpiritRating: 7 };

      const team: any = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-07-07T12:22:21.770Z',
        updatedAt: '2021-07-07T12:22:21.770Z',
        name: 'Team A',
        teamCode: '10012345',
        projectKey: 'P12343',
        logo: '',
        ad_center: {
          id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-07-07T12:22:21.770Z',
          updatedAt: '2021-07-07T12:22:21.770Z',
          name: 'ADCenter Bangalore',
        },
      };

      //codeQualityService.getCodeQualitySnapshot.calledWith(team.id).mockReturnValue(codeQualityResponse);
      jest.spyOn(codeQualityService, 'getCodeQualitySnapshot').mockImplementation(() => codeQualityResponse);
      //clientStatusService.getClientFeedback.calledWith(team.id).mockReturnValue(clientStatusResponse);
      jest.spyOn(clientStatusService, 'getClientFeedback').mockImplementation(() => clientStatusResponse);
      //teamSpiritService.getTeamSpiritFromSurvey.calledWith(team.id).mockReturnValue(teamSpiritResponse);
      jest.spyOn(teamSpiritService, 'getTeamSpiritFromSurvey').mockImplementation(() => teamSpiritResponse);
      //sprintService.getSprintDetailResponse.calledWith(team.id).mockReturnValue(spirintDetailResponse)
      jest.spyOn(sprintService, 'getSprintDetailResponse').mockImplementation(() => spirintDetailResponse);
      //sprintService.getVelocityComparison.calledWith(team.id).mockReturnValue(velocityComparisonResponse);
      jest.spyOn(sprintService, 'getVelocityComparison').mockImplementation(() => velocityComparisonResponse);
      jest.spyOn(sprintService, 'getBurndown').mockImplementation(() => burndownResponse);
      jest.spyOn(dashboardService, 'fetchStatus').mockImplementation(() => status);
      const actualOutput = await dashboardService.getDashboardByTeamId(team);
      expect(codeQualityService.getCodeQualitySnapshot).toBeCalledTimes(1);
      expect(clientStatusService.getClientFeedback).toBeCalledTimes(1);
      expect(teamSpiritService.getTeamSpiritFromSurvey).toBeCalledTimes(1);
      expect(sprintService.getBurndown).toBeCalledTimes(1);
      expect(sprintService.getSprintDetailResponse).toBeCalledTimes(1);
      expect(sprintService.getVelocityComparison).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
    });
  });

  describe('fetchStatus method will return status of project', () => {
    test('test 1 if client status is null', () => {
      //inputs
      const dashboard: any = {
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        codeQuality: { bugs: 3, debt: 13, codeCoverage: 85, status: 'PASSED' },
        clientStatus: undefined,
        teamSpirit: { teamSpiritRating: 7 },
        burndown: {
          workUnit: 'story point',
          remainingDays: 26,
          remainingWork: 122,
          count: 8,
          burndownStatus: 'Ahead Time',
        },
        sprintDetail: { Sprint_current_day: 2, sprint_number: 11, Sprint_days: 28 },
        velocity: { Avg: 115, Committed: 140, Completed: 18 },
      };

      const expectedOutput = 2;

      //test
      const actualOutput = dashboardService.fetchStatus(dashboard);

      //expect
      expect(actualOutput).toEqual(expectedOutput);
    });

    test('test 1 if client status is null', () => {
      //inputs
      const dashboard: any = {
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        codeQuality: { bugs: 3, debt: 13, codeCoverage: 85, status: 'PASSED' },
        clientStatus: { clientSatisfactionRating: 5, sprintNumber: 10 },
        teamSpirit: { teamSpiritRating: 7 },
        burndown: {
          workUnit: 'story point',
          remainingDays: 26,
          remainingWork: 122,
          count: 8,
          burndownStatus: 'Ahead Time',
        },
        sprintDetail: { Sprint_current_day: 2, sprint_number: 11, Sprint_days: 28 },
        velocity: { Avg: 115, Committed: 140, Completed: 18 },
      };

      const expectedOutput = 3;

      //test
      const actualOutput = dashboardService.fetchStatus(dashboard);

      //expect
      expect(actualOutput).toEqual(expectedOutput);
    });
  });
});
