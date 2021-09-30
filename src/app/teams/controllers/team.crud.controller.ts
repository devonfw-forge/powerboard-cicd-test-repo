import {
  Body,
  Controller,
  Get,
  Response,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Put,
  Inject,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Team } from '../model/entities/team.entity';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { UserTeamDTO } from '../model/dto/UserTeamDTO';
import { Response as eResponse } from 'express';
import { AddTeam } from '../../shared/interfaces/addTeam.interface';
import { UpdateTeam } from '../model/dto/updateTeam.interface';
import { ITeamService } from '../services/team.service.interface';
import { IGlobalTeamsService } from '../services/global.team.service.interface';
//import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: {
    type: Team,
  },
})
@CrudType(Team)
@Controller('teams')
export class TeamCrudController {
  constructor(
    @Inject('ITeamService') public teamService: ITeamService,
    @Inject('IGlobalTeamService') public globalTeamsService: IGlobalTeamsService,
  ) {}

  @Post('powerboard/team')
  //@UseGuards(AuthGuard('jwt'))
  async getTeamInfoById(@Body() userTeam: UserTeamDTO, @Response() res: eResponse): Promise<void> {
    const result = await this.teamService.getTeamInfoById(userTeam);
    res.status(200).json(result);
  }

  @Get('center/:id')
  //@UseGuards(AuthGuard('jwt'))
  async getTeamsByCenterId(@Param('id') centerId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.globalTeamsService.getTeamsByCenterId(centerId);
    res.status(200).json(result);
  }

  //Adding team by System Admin
  @Post('team/addTeam')
  //@UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('logo'))
  async addTeam(@Body() addTeam: AddTeam, @UploadedFile() logo: any, @Response() res: eResponse): Promise<void> {
    console.log('This is the file');
    console.log(logo);
    const result = await this.globalTeamsService.addTeam(addTeam, logo);
    console.log(result);
    res.status(200).json(result);
    //res.status(201).json({ message: 'Team successfully Created' });
  }

  //Deleting the team , system admin can do it
  @Delete('team/delete/:id')
  //@UseGuards(AuthGuard('jwt'))
  async deleteTeamById(@Param('id') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.globalTeamsService.deleteTeamById(teamId);
    console.log(result);
    // res.status(200).json(result);
    res.status(200).json({ message: 'Team successfully Deleted' });
  }

  //View All Team by system ADMIN
  @Get('team/viewAllTeams')
  //@UseGuards(AuthGuard('jwt'))
  async getAllTeams(@Response() res: eResponse): Promise<void> {
    const result = await this.globalTeamsService.getAllTeams();
    res.status(200).json(result);
  }

  //Update the team by System ADMIN
  @Put('team/update/:teamId')
  //@UseGuards(AuthGuard('jwt'))
  async updateTeam(
    @Param('teamId') teamId: string,
    @Body() updateTeam: UpdateTeam,
    @Response() res: eResponse,
  ): Promise<void> {
    const result = await this.teamService.updateTeam(updateTeam, teamId);
    console.log(result);
    res.status(200).json(result);
  }
  @Post('uploadLogo/:teamId')
  @UseInterceptors(FileInterceptor('logo'))
  async uploadLogo(
    @UploadedFile() logo: any,
    @Param('teamId') teamId: string,
    @Response() res: eResponse,
  ): Promise<void> {
    console.log(logo);
    const result = await this.globalTeamsService.uploadLogoForTeam(logo, teamId);
    res.status(201).json(result);
  }

  @Delete('deleteLogo/:teamId')
  //@UseGuards(AuthGuard('jwt'))
  async deleteLogoFromTeam(@Param('teamId') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.globalTeamsService.deleteLogoFromTeam(teamId);
    console.log(result);
    res.status(200).json({ message: 'File successfully Deleted' });
  }
}
