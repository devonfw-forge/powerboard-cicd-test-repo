import { Body, Controller, Delete, Get, Inject, Param, Post, Response } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { TeamLinks } from '../model/entities/team-links.entity';
import { TeamLinkDTO } from '../model/dto/TeamLinkDTO';
import { Response as eResponse } from 'express';
import { ITeamLinksservice } from '../services/team-links.service.interface';

@Crud({
  model: {
    type: TeamLinks,
  },
})
@CrudType(TeamLinks)
@Controller('team-links')
export class TeamLinksCrudController {
  constructor(@Inject('ITeamLinksService') public teamLinksService: ITeamLinksservice) {}

  @Get('teamId/:id')
  //@UseGuards(AuthGuard('jwt'))
  async getTeamLinks(@Param('id') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.teamLinksService.getTeamLinks(teamId);
    res.status(200).json(result);
  }

  @Delete('delete/:id')
  //@UseGuards(AuthGuard('jwt'))
  async deleteTeamLinkById(@Param('id') teamLinkId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.teamLinksService.deleteTeamLinkById(teamLinkId);
    console.log(result);
    res.status(200).json({ message: 'TeamLink successfully Deleted' });
  }

  @Post('teamId/create')
  // @UseGuards(AuthGuard('jwt'))
  async addTeamLinks(@Body() teamLinkDTO: TeamLinkDTO, @Response() res: eResponse): Promise<void> {
    const result = await this.teamLinksService.createTeamLinks(teamLinkDTO);
    res.status(201).json(result);
  }

  //get all the available user roles
  @Get('getLinksCategory')
  //@UseGuards(AuthGuard('jwt'))
  async getLinksCategory(@Response() res: eResponse): Promise<void> {
    const result = await this.teamLinksService.getLinksCategory();
    res.status(200).json(result);
  }
}
