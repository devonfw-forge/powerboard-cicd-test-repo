import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { TeamSpirit } from '../model/entities/team-spirit.entity';
import { ITeamSpiritService } from '../services/team-spirit.interface';

@Crud({
  model: {
    type: TeamSpirit,
  },
})
@CrudType(TeamSpirit)
@Controller('team-spirit')
export class TeamSpiritCrudController {
  constructor(@Inject('ITeamSpiritService') public teamSpiritServiceInterface: ITeamSpiritService) {}

  @Get('/surveyResult/:teamName')
  async getTeamSpiritFromSurvery(@Param('teamName') teamName: string): Promise<any> {
    return this.teamSpiritServiceInterface.getTeamSpiritFromSurvey(teamName);
  }
}
