import { BurndownResponse } from '../model/dto/BurndownResponse';
import { SprintDetailResponse } from '../model/dto/SprintDetailResponse';
//import { SprintWorkUnitResponse } from '../model/dto/sprintWorkUnitResponse';
import { VelocityComparisonResponse } from '../model/dto/VelocityComparisonResponse';

export interface ISprintCrudService {
  getSprintDetailResponse(teamId: string): Promise<SprintDetailResponse | undefined>;
  getBurndown(teamId: string): Promise<BurndownResponse | undefined>;
  getVelocityComparison(teamId: string): Promise<VelocityComparisonResponse | undefined>;
  // sprintWorkUnit(teamId: string): Promise<SprintWorkUnitResponse | undefined>
}
