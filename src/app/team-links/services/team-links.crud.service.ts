import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { LinksCategoryResponse } from '../model/dto/LinksCategoryResponse';
import { TeamLinkDTO } from '../model/dto/TeamLinkDTO';
import { TeamLinkResponse } from '../model/dto/TeamLinkResponse';
import { LinksCategory } from '../model/entities/link-category.entity';
import { TeamLinks } from '../model/entities/team-links.entity';
import { ITeamLinksservice } from './team-links.service.interface';

@Injectable()
export class TeamLinksCrudService extends TypeOrmCrudService<TeamLinks> implements ITeamLinksservice {
  constructor(
    @InjectRepository(TeamLinks) private readonly teamLinkRepository: Repository<TeamLinks>,
    @InjectRepository(LinksCategory) private readonly linkCategoryRepository: Repository<LinksCategory>,
  ) {
    super(teamLinkRepository);
  }

  /**
   * getTeamLinks method will fetch the links of team
   * @param {teamId} .Takes teamId as input
   * @return {TeamLinkResponse} Team Links as response for that team
   */
  teamLinkResponse: TeamLinkResponse = {} as TeamLinkResponse;
  async getTeamLinks(team_Id: string): Promise<TeamLinkResponse[]> {
    let teamLinksArray = [] as TeamLinkResponse[],
      i;
    // const result = (await this.teamLinkRepository
    //   .createQueryBuilder('team_link')
    //   .where('team_link.team_id=:team_id', { team_id: team_Id })
    //   .getMany()) as TeamLinks[];
    const result = await this.teamLinkRepository.find({ where: { team: team_Id } });
    if (result == null) {
      return teamLinksArray;
    } else {
      for (i = 0; i < result.length; i++) {
        this.teamLinkResponse.teamLinkId = result[i].id;
        this.teamLinkResponse.linkName = result[i].linkName;
        this.teamLinkResponse.linkType = result[i].linkType.title;
        this.teamLinkResponse.links = result[i].link;
        teamLinksArray.push(this.teamLinkResponse);
        this.teamLinkResponse = {} as TeamLinkResponse;
      }
      return teamLinksArray;
    }
  }

  /**
   * deleteteamLinkById method will delete the link of team
   */
  async deleteTeamLinkById(teamLinkId: string): Promise<any> {
    return this.teamLinkRepository.delete(teamLinkId);
  }

  /**
   * createTeamLink method will add the links of team
   * @param {teamId} .Takes teamId as input
   * @return {TeamLinks} Team Links as response for that team
   */
  async createTeamLinks(teamLinkDTO: TeamLinkDTO): Promise<TeamLinks> {
    const link = (await this.linkCategoryRepository.findOne({ where: { id: teamLinkDTO.linkType } })) as LinksCategory;
    let links = new TeamLinks();
    links.linkName = teamLinkDTO.linkName;
    links.linkType = link;
    links.link = teamLinkDTO.links;
    links.team = teamLinkDTO.teamId;
    const teamLinkOutput = await this.teamLinkRepository.save(links);
    console.log(teamLinkOutput);
    return teamLinkOutput;
  }

  async getLinksCategory(): Promise<LinksCategoryResponse[]> {
    const output = await this.linkCategoryRepository.find();
    if (!output) {
      throw new NotFoundException('No links Found');
    }
    console.log('output');
    console.log(output);
    let linksList = [],
      i;
    for (i = 0; i < output.length; i++) {
      let linkCategory: LinksCategoryResponse = {} as LinksCategoryResponse;
      linkCategory.linkId = output[i].id;
      linkCategory.linkTitle = output[i].title;
      linksList.push(linkCategory);
    }
    return linksList;
  }
}
