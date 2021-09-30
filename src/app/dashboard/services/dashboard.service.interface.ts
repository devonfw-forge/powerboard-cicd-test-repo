import { Team } from '../../teams/model/entities/team.entity';
import { DashBoardResponse } from '../model/DashBoardResponse';

export interface IDashboardService {
  getDashboardByTeamId(team: Team): Promise<DashBoardResponse>;
  fetchStatus(dashboard: DashBoardResponse): number | undefined;
}
