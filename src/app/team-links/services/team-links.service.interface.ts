import { LinksCategoryResponse } from '../model/dto/LinksCategoryResponse';
import { TeamLinkDTO } from '../model/dto/TeamLinkDTO';
import { TeamLinkResponse } from '../model/dto/TeamLinkResponse';
import { TeamLinks } from '../model/entities/team-links.entity';

export interface ITeamLinksservice {
  getTeamLinks(team_Id: string): Promise<TeamLinkResponse[]>;
  createTeamLinks(teamLinkDTO: TeamLinkDTO): Promise<TeamLinks>;
  deleteTeamLinkById(teamLinkId: string): Promise<any>;
  getLinksCategory(): Promise<LinksCategoryResponse[]>;
}
