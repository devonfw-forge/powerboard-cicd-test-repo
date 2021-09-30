import { DeleteResult } from 'typeorm';
import { AddTeam } from '../../shared/interfaces/addTeam.interface';
import { TeamsInADC } from '../model/dto/TeamsInADC';
import { ViewTeamsResponse } from '../model/dto/ViewTeamsResponse';
import { Team } from '../model/entities/team.entity';

export interface IGlobalTeamsService {
  getTeamsByCenterId(CenterId: string): Promise<TeamsInADC[]>;
  uploadLogoForTeam(logo: any, teamId: string): Promise<Team>;
  deleteLogoFromTeam(teamId: string): Promise<void>;
  addTeam(addteam: AddTeam, logo: any): Promise<Team>;
  deleteTeamById(teamId: string): Promise<DeleteResult>;
  getAllTeams(): Promise<ViewTeamsResponse[]>;
  viewTeamsInADC(teamId: string): any;
  findTeamById(teamId: string): Promise<Team | undefined>;
  findStatusByTeam(team: Team): Promise<number | undefined>;
  updateTeamStatus(teamId: string, status: number | undefined): Promise<any>;
}
