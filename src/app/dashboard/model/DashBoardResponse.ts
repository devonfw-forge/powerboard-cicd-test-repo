import { ClientStatusResponse } from '../client-status/model/dto/ClientStatusResponse';
import { CodeQualityResponse } from '../code-quality-snapshot/model/dto/CodeQualityResponse';
import { SprintDetailResponse } from '../sprint/model/dto/SprintDetailResponse';
import { TeamSpiritResponse } from '../team-spirit/model/dto/TeamSpiritResponse.dto';
import { BurndownResponse } from '../sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../sprint/model/dto/VelocityComparisonResponse';
//import { SprintWorkUnitResponse } from '../sprint/model/dto/sprintWorkUnitResponse';

export interface DashBoardResponse {
  teamId: string;
  sprintWorkUnit?: string;
  teamStatus: number | undefined;
  codeQuality: CodeQualityResponse | undefined;
  clientStatus: ClientStatusResponse | undefined;
  teamSpirit: TeamSpiritResponse | undefined;
  burndown: BurndownResponse | undefined;
  sprintDetail: SprintDetailResponse | undefined;
  velocity: VelocityComparisonResponse | undefined;
}
