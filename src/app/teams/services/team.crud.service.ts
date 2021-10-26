import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Team } from '../model/entities/team.entity';
import { PowerboardResponse } from '../model/dto/PowerboardResponse';
import { UserTeamDTO } from '../model/dto/UserTeamDTO';
import { MyCenter } from '../model/dto/MyCenter';
import { TeamLinkResponse } from '../../team-links/model/dto/TeamLinkResponse';
import { UpdateTeam } from '../model/dto/updateTeam.interface';
import { ADCenter } from '../../ad-center/model/entities/ad-center.entity';
import { IDashboardService } from '../../dashboard/services/dashboard.service.interface';
import { ITeamLinksservice } from '../../team-links/services/team-links.service.interface';
import { MultimediaResponse } from '../../multimedia/model/dto/MultimediaResponse';
import { IMultimediaService } from '../../multimedia/services/multimedia.crud.service.interface';
import { IUserTeamService } from '../../core/user/services/user-team.service.interface';
import { IUserPrivilegeService } from '../../core/user/services/user-privilege.service.inteface';
import { ITeamService } from './team.service.interface';
import { IGlobalTeamsService } from './global.team.service.interface';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class TeamCrudService extends TypeOrmCrudService<Team> implements ITeamService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(ADCenter) readonly centerRepository: Repository<ADCenter>,

    @Inject('IDashboardService') private readonly dashboardService: IDashboardService,
    @Inject('ITeamLinksService') private readonly teamLinkService: ITeamLinksservice,
    @Inject('IMultimediaService') private readonly multimediaService: IMultimediaService,
    @Inject('IUserTeamService') private readonly userTeamService: IUserTeamService,
    @Inject('IUserPrivilegeService') private readonly userPrivilegeService: IUserPrivilegeService,
    @Inject('IGlobalTeamService') private readonly globalTeamService: IGlobalTeamsService,
  ) {
    super(teamRepository);
  }
  globalLink = process.env.AWS_lOGO_URL;
  powerboardResponse: PowerboardResponse = {} as PowerboardResponse;

  /**
   * getPowerboardByUserId method will retrieve all KPI's +breadcrumb + dump_BU
   * @param {userId,teamId} userId and TeamIdTakes userId as input
   * @return {PowerboardResponse} Team Info as response
   */
  async getTeamInfoById(userTeam: UserTeamDTO): Promise<PowerboardResponse> {
    const teamId = userTeam.teamId;
    const userId = userTeam.userId;

    const teams = await this.globalTeamService.findTeamById(teamId);

    if (!teams) {
      throw new NotFoundException('Team Not Found');
    }
    let isSystemAdmin, privilegeList: string[] | undefined;
    if (userId) {
      isSystemAdmin = await this.userTeamService.isSystemAdmin(userId);
      privilegeList = await this.userPrivilegeService.getUserPrivilegeForTeam(userId, teamId, isSystemAdmin);
    }
    this.powerboardResponse.team_id = teams.id;
    this.powerboardResponse.team_name = teams.name;
    this.powerboardResponse.project_key = teams.projectKey;
    this.powerboardResponse.center = teams.ad_center.name;
    this.powerboardResponse.team_code = teams.teamCode;
    if (teams.logo == null) {
      this.powerboardResponse.logo = null;
    } else {
      this.powerboardResponse.logo = `${this.globalLink}/${teamId}/` + teams.logo;
    }
    this.powerboardResponse.dashboard = await this.dashboardService.getDashboardByTeamId(teams);
    this.powerboardResponse.teamLinks = await this.getLinksForTeam(teams.id, privilegeList);
    this.powerboardResponse.multimedia = await this.getMultimediaForTeam(teams.id);
    if (isSystemAdmin) {
      this.powerboardResponse.privileges = [];
    } else {
      this.powerboardResponse.privileges = privilegeList!;
    }
    return this.powerboardResponse;
  }

  async getLinksForTeam(teamId: string, privilegeList?: string[]): Promise<any> {
    if (privilegeList?.includes('view_links')) {
      const teamLink: TeamLinkResponse[] = await this.teamLinkService.getTeamLinks(teamId);
      return teamLink;
    } else {
      return [];
    }
  }

  /**
   * getMultimediaForTeam method will fetch multimedia resonse for particular team
   * @param {teamId} .Takes teamId as input
   * @return {MultimediaResponse[]} Array of files as response
   */
  async getMultimediaForTeam(teamId: string): Promise<MultimediaResponse> {
    const multimedia: MultimediaResponse = await this.multimediaService.getDefaultMultimediaForTeam(teamId);
    return multimedia;
  }

  /**
   * updateTeam method will update exsiting team , and system admin can do so
   * @param {AddTeamDTO} .Takes AddTeamDTO as input
   * @return {Team} Created Team as response
   */
  async updateTeam(updateTeam: UpdateTeam, teamId: string): Promise<Team> {
    const teamExisted = (await this.teamRepository.findOne(teamId)) as Team;
    if (!teamExisted) {
      throw new NotFoundException('Team Not Found');
    }
    teamExisted.name = updateTeam.teamName;
    teamExisted.projectKey = updateTeam.projectKey;
    teamExisted.teamCode = updateTeam.teamCode;
    return this.teamRepository.save(teamExisted);
  }
  async getCenterByTeamId(teamId: string): Promise<MyCenter> {
    const result = await this.teamRepository.findOne({ where: { id: teamId } });
    let myCenter: MyCenter = {} as MyCenter;
    myCenter.centerId = result?.ad_center.id!;
    myCenter.centerName = result?.ad_center.name!;
    return myCenter;
  }
}
