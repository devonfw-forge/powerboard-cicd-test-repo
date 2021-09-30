import { TeamSpiritResponse } from '../model/dto/TeamSpiritResponse.dto';

export interface ITeamSpiritService {
  getTeamSpiritFromSurvey(teamName: string): Promise<TeamSpiritResponse | undefined>;
}
