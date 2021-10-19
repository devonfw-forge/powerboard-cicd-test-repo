import { Inject, Injectable } from '@nestjs/common';

import { Team } from '../../teams/model/entities/team.entity';

import { ClientStatusResponse } from '../client-status/model/dto/ClientStatusResponse';
import { IClientStatusService } from '../client-status/services/client-status.service.interface';
import { CodeQualityResponse } from '../code-quality-snapshot/model/dto/CodeQualityResponse';
import { ICodeQualityService } from '../code-quality-snapshot/services/code-quality-snapshot.service.interface';
import { DashBoardResponse } from '../model/DashBoardResponse';
import { BurndownResponse } from '../sprint/model/dto/BurndownResponse';
import { SprintDetailResponse } from '../sprint/model/dto/SprintDetailResponse';
//import { SprintWorkUnitResponse } from '../sprint/model/dto/sprintWorkUnitResponse';
import { VelocityComparisonResponse } from '../sprint/model/dto/VelocityComparisonResponse';

import { ISprintCrudService } from '../sprint/services/sprint.crud.service.interface';
import { TeamSpiritResponse } from '../team-spirit/model/dto/TeamSpiritResponse.dto';
import { ITeamSpiritService } from '../team-spirit/services/team-spirit.interface';
import { IDashboardService } from './dashboard.service.interface';

@Injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @Inject('ICodeQualityService') private readonly codequalityService: ICodeQualityService,
    @Inject('ISprintCrudService') private readonly sprintService: ISprintCrudService,
    @Inject('ITeamSpiritService') private readonly teamSpiritServiceInterface: ITeamSpiritService,
    @Inject('IClientStatusService') private readonly clientStatusService: IClientStatusService,
  ) {}

  dash: DashBoardResponse = {} as DashBoardResponse;

  /**
   * getDashboardByTeamId method will retrieve all KPI's of particular team
   * @param {teamId} teamId Takes teamId as input
   * @return {DashBoardResponse} . Dashboard with all KPI's
   */
  async getDashboardByTeamId(team: Team): Promise<DashBoardResponse> {
    this.dash.teamId = team.id;
    // const sprintWorkUnit: SprintWorkUnitResponse | undefined = await this.sprintService.sprintWorkUnit(team.id);
    // this.dash.sprintWorkUnit = sprintWorkUnit;

    const codeQuality: CodeQualityResponse | undefined = await this.codequalityService.getCodeQualitySnapshot(team.id);

    this.dash.codeQuality = codeQuality;

    const clientStatus: ClientStatusResponse | undefined = await this.clientStatusService.getClientFeedback(team.id);
    this.dash.clientStatus = clientStatus;

    const teamSpirit: TeamSpiritResponse | undefined = await this.teamSpiritServiceInterface.getTeamSpiritFromSurvey(
      team!.name,
    );
    this.dash.teamSpirit = teamSpirit;

    const sprintDetail: SprintDetailResponse | undefined = await this.sprintService.getSprintDetailResponse(team.id);
    this.dash.sprintDetail = sprintDetail;
    const burndown: BurndownResponse | undefined = await this.sprintService.getBurndown(team.id);
    this.dash.burndown = burndown;
    this.dash.sprintWorkUnit = burndown?.workUnit;
    const velocityComparisonDTO:
      | VelocityComparisonResponse
      | undefined = await this.sprintService.getVelocityComparison(team.id);
    this.dash.velocity = velocityComparisonDTO;
    this.dash.teamStatus = this.fetchStatus(this.dash);
    return this.dash;
  }

  /**
   * fetchstatus method will fetch the status of all respective KPI's of dashboard
   * @param {dashboard} dashboard takes dashboard object as input
   * @return {number} number as status value
   */
  fetchStatus(dashboard: DashBoardResponse): number | undefined {
    let statusResult;
    if (dashboard?.clientStatus == null) {
      return (statusResult = 2);
    } else {
      const codeQualityStatus = dashboard!.codeQuality!.status;
      //const teamSpiritStatus = dashboard!.teamSpirit!.teamSpiritRating;
      const clientStatus = dashboard!.clientStatus!.clientSatisfactionRating;
      const burndownStatus = dashboard!.burndown!.burndownStatus;
      if (
        clientStatus >= 6 &&
        //teamSpiritStatus >= 6 &&
        codeQualityStatus == 'PASSED' &&
        burndownStatus == 'Ahead Time'
      ) {
        statusResult = 1;
      } else if (
        clientStatus < 6 &&
        //teamSpiritStatus < 6 &&
        codeQualityStatus == 'FAILED' &&
        burndownStatus == 'Behind Time'
      ) {
        statusResult = 2;
      } else {
        statusResult = 3;
      }
      console.log('status');
      console.log(statusResult);
      return statusResult;
    }
  }
}
