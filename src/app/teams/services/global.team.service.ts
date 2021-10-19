import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { DashBoardResponse } from '../../dashboard/model/DashBoardResponse';
import { Team } from '../model/entities/team.entity';
import { ViewTeamsResponse } from '../model/dto/ViewTeamsResponse';
import { AddTeam } from 'src/app/shared/interfaces/addTeam.interface';
import { ADCenter } from '../../ad-center/model/entities/ad-center.entity';
import { IDashboardService } from '../../dashboard/services/dashboard.service.interface';
import { IFileStorageService } from '../../file-storage/services/file-storage.service.interface';
// const fs = require('fs');
// import path = require('path');
import { TeamsInADC } from '../model/dto/TeamsInADC';
import { IGlobalTeamsService } from './global.team.service.interface';
import { TeamStatus } from '../model/entities/team_status.entity';
import * as dotenv from 'dotenv';
import { TeamResponse } from '../model/dto/TeamResponse';
dotenv.config();
@Injectable()
export class GlobalTeamsService extends TypeOrmCrudService<Team> implements IGlobalTeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(TeamStatus) private readonly teamStatusRepository: Repository<TeamStatus>,
    @InjectRepository(ADCenter) readonly centerRepository: Repository<ADCenter>,
    @Inject('IDashboardService') private readonly dashboardService: IDashboardService,
    @Inject('IFileStorageService') private readonly fileStorageService: IFileStorageService,
  ) {
    super(teamRepository);
  }
  globalLink = process.env.AWS_lOGO_URL;
  /**
   * getTeamsyBUId method will fetch the list of all teams belong to particular BU
   * @param {Bu_id} Bu_id it takes Business Unit as input
   * @return {TeamResponse[]} list of teams with their status
   */
  async getTeamsByCenterId(CenterId: string): Promise<TeamsInADC[]> {
    const teams: Team[] = await this.teamRepository.find({ where: { ad_center: CenterId } });
    let teamsResponse: TeamsInADC = {} as TeamsInADC;
    let teamsDTOArray: TeamsInADC[] = [],
      i;
    if (teams.length == 0) {
      return teamsDTOArray;
    }

    for (i = 0; i < teams.length; i++) {
      teamsResponse.teamId = teams[i].id;
      teamsResponse.teamName = teams[i].name;
      if (teams[i].logo == null) {
        teamsResponse.teamLogo = null;
      } else {
        teamsResponse.teamLogo = `${this.globalLink}/${teams[i].id}/` + teams[i].logo!;
      }
      teamsResponse.teamStatus = await this.findStatusByTeam(teams[i]);
      teamsDTOArray.push(teamsResponse);
      teamsResponse = {} as TeamsInADC;
    }
    console.log(teamsDTOArray);
    return teamsDTOArray;
  }

  /**
   * setLogo method will set logo for that team
   * @param {teamId, path} .Takes teamId and path as input
   * @return {Images} Images as response for that team
   */

  async uploadLogoForTeam(logo: any, teamId: string): Promise<TeamResponse> {
    const team = await this.teamRepository.findOne(teamId);
    if (!team) {
      throw new NotFoundException('Team Not Found');
    }
    const directory = `uploads/uploads/logo/${teamId}/`;
    const existingLogoOfTeam = `uploads/uploads/logo/${teamId}/` + team.logo;
    await this.fileStorageService.deleteFile(existingLogoOfTeam);
    const fileUploaded = await this.fileStorageService.uploadFile(logo, directory);
    if (fileUploaded) {
      const key = fileUploaded.Key.split('/');
      team.logo = key[key.length - 1];
    }

    let team1 = await this.teamRepository.save(team);
    team1.logo = `${this.globalLink}/${teamId}/` + team.logo!;
    let teamsResponse: TeamResponse = {} as TeamResponse;
    teamsResponse.id = team1.id;
    teamsResponse.name = team1.name;
    teamsResponse.projectKey = team1.projectKey;
    teamsResponse.teamCode = team1.teamCode;
    teamsResponse.ad_center = team1.ad_center.id;
    teamsResponse.logo = team1.logo;
    return teamsResponse;
  }

  async deleteLogoFromTeam(teamId: string): Promise<void> {
    const team = (await this.teamRepository.findOne({ where: { id: teamId } })) as Team;
    const logoName = team.logo;
    const pathOfLogo = `uploads/uploads/logo/${teamId}/` + logoName;
    const result = await this.fileStorageService.deleteFile(pathOfLogo);
    if (!result) {
      team.logo = null;
      await this.teamRepository.save(team);
    } else {
      throw new NotFoundException('File not found');
    }
  }

  /**
   * addTeam method will add team , and system admin can do so
   * @param {AddTeamDTO} .Takes AddTeamDTO as input
   * @return {Team} Created Team as response
   */
  async addTeam(addteam: AddTeam, logo: any): Promise<TeamResponse> {
    const teamCode = addteam.teamCode;
    const teamExisted = await this.teamRepository.findOne({ where: { teamCode: teamCode } });
    console.log(teamExisted);
    if (teamExisted) {
      throw new ConflictException('team already registered');
    } else {
      let team = new Team();
      team.name = addteam.teamName;
      team.teamCode = addteam.teamCode;
      team.projectKey = addteam.projectKey;
      team.ad_center = addteam.ad_center;
      team.team_status = (await this.teamStatusRepository.findOne({ where: { id: 2 } })) as TeamStatus;

      const teamCreated = await this.teamRepository.save(team);
      if (teamCreated && logo) {
        return await this.uploadLogoForTeam(logo, teamCreated.id);
      } else {
        console.log('team created');
        console.log(teamCreated);
        let teamsResponse: TeamResponse = {} as TeamResponse;
        teamsResponse.id = teamCreated.id;
        teamsResponse.name = teamCreated.name;
        teamsResponse.projectKey = teamCreated.projectKey;
        teamsResponse.teamCode = teamCreated.teamCode;
        teamsResponse.ad_center = teamCreated.ad_center;
        return teamsResponse;
      }
    }
  }

  /**
   * deleteTeamById method will delete team , and system admin can do so
   * @param {teamId} .Takes teamId as input
   * @return {void}
   */
  async deleteTeamById(teamId: string): Promise<DeleteResult> {
    const team = await this.findTeamById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return await this.teamRepository.delete(teamId);
  }

  /**
   * getAllTeams method will fetch all team , and system admin can do so
   * @param {} .Takes nothing as input
   * @return {team[]} return team array as response
   */
  async getAllTeams(): Promise<ViewTeamsResponse[]> {
    const teamList = await this.teamRepository.find();
    if (teamList.length == 0) {
      throw new NotFoundException('Team Not Found');
    }

    let viewTeamsResponse: ViewTeamsResponse = {} as ViewTeamsResponse;
    let viewteamList = [],
      i;
    for (i = 0; i < teamList.length; i++) {
      viewTeamsResponse.teamId = teamList[i].id;
      viewTeamsResponse.teamName = teamList[i].name;
      viewTeamsResponse.teamCode = teamList[i].teamCode;
      viewTeamsResponse.projectKey = teamList[i].projectKey;
      viewTeamsResponse.adCenter = teamList[i].ad_center.name;
      viewteamList.push(viewTeamsResponse);
      viewTeamsResponse = {} as ViewTeamsResponse;
    }
    return viewteamList;
  }

  async viewTeamsInADC(teamId: string) {
    const result = await this.teamRepository.findOne({ where: { id: teamId } });
    const teamList = await this.teamRepository.find({ where: { ad_center: result?.ad_center } });
    let viewTeamsInADC: TeamsInADC = {} as TeamsInADC;
    let adcTeamList = [],
      i;
    for (i = 0; i < teamList.length; i++) {
      viewTeamsInADC.teamId = teamList[i].id;
      viewTeamsInADC.teamName = teamList[i].name;
      if (teamList[i].logo == null) {
        viewTeamsInADC.teamLogo = null;
      } else {
        viewTeamsInADC.teamLogo = `${this.globalLink}/${teamList[i].id}/` + teamList[i].logo!;
      }
      // const dashboard = (await this.dashboardService.getDashboardByTeamId(teamList[i])) as DashBoardResponse;
      //viewTeamsInADC.teamStatus = this.dashboardService.fetchStatus(dashboard);
      viewTeamsInADC.teamStatus = await this.findStatusByTeam(teamList[i]);
      adcTeamList.push(viewTeamsInADC);
      viewTeamsInADC = {} as TeamsInADC;
    }
    return adcTeamList;
  }

  async findTeamById(teamId: string): Promise<Team | undefined> {
    return (await this.teamRepository.findOne(teamId)) as Team;
  }

  async findStatusByTeam(team: Team): Promise<number | undefined> {
    if (team.isStatusChanged) {
      const dashboard = (await this.dashboardService.getDashboardByTeamId(team)) as DashBoardResponse;
      const status = this.dashboardService.fetchStatus(dashboard);
      const result = await this.updateTeamStatus(team.id, status);
      console.log(result);
      return result.team_status.id;
    } else {
      console.log('status change ho chuka hhhhh');
      console.log('_______________________________');
      console.log(team.team_status);
      return team.team_status.id;
    }
  }

  async updateTeamStatus(teamId: string, status: number | undefined) {
    const teamExisted = (await this.teamRepository.findOne({ where: { id: teamId } })) as Team;
    teamExisted.isStatusChanged = false;
    teamExisted.team_status = (await this.teamStatusRepository.findOne({ where: { id: status } })) as TeamStatus;
    return await this.teamRepository.save(teamExisted);
  }
}
