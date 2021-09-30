import { MyCenter } from '../model/dto/MyCenter';
import { PowerboardResponse } from '../model/dto/PowerboardResponse';
import { UpdateTeam } from '../model/dto/updateTeam.interface';
import { UserTeamDTO } from '../model/dto/UserTeamDTO';
import { Team } from '../model/entities/team.entity';

export interface ITeamService {
  getTeamInfoById(userTeam: UserTeamDTO): Promise<PowerboardResponse>;
  updateTeam(updateTeam: UpdateTeam, teamId: string): Promise<Team>;
  getCenterByTeamId(teamId: string): Promise<MyCenter>;
  getLinksForTeam(teamId: string, privilegeList?: string[]): Promise<any>;
  getMultimediaForTeam(teamId: string): Promise<any>;
}
