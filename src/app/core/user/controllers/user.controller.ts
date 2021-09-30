import { Body, Controller, Delete, Get, Inject, Param, Response, Put } from '@nestjs/common';
import { Response as eResponse } from 'express';
import { UpdateLastLoggedTeamDTO } from '../model/dto/UpdateLastLoggedTeamDTO';
import { UpdateUserRoleDTO } from '../model/dto/UpdateUserRoleDTO';
import { IUserPrivilegeService } from '../services/user-privilege.service.inteface';
import { IUserSessionDetailsService } from '../services/user-session-details.service.interface';
import { IUserTeamService } from '../services/user-team.service.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserTeamService') private readonly userTeamService: IUserTeamService,
    @Inject('IUserPrivilegeService') private readonly userPrivilegeService: IUserPrivilegeService,
    @Inject('IUserSessionDetailsService') private readonly userSessionService: IUserSessionDetailsService,
  ) {}

  //View All Team member of team by SystemADMIN
  @Get('viewAllMemberOfTeam/:teamId')
  //@UseGuards(AuthGuard('jwt'))
  async getAllMemberOfTeam(@Param('teamId') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.userTeamService.getAllMemberOfTeam(teamId);
    res.status(200).json(result);
  }

  //Delete user of particular team
  @Delete('delete/userTeam/:id')
  //@UseGuards(AuthGuard('jwt'))
  async deleteUserFromTeamById(@Param('id') userTeamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.userTeamService.deleteUserFromTeamById(userTeamId);
    console.log(result);
    res.status(200).json({ message: 'User successfully Removed from Team' });
  }

  //Updating the role of user by system admin
  @Put('update/userRole')
  //@UseGuards(AuthGuard('jwt'))
  async updateUserRole(@Body() updateRole: UpdateUserRoleDTO, @Response() res: eResponse): Promise<void> {
    const result = await this.userTeamService.updateUserRole(updateRole);
    res.status(200).json(result);
  }

  //get all the available user roles
  @Get('viewAllUserRoles')
  //@UseGuards(AuthGuard('jwt'))
  async getAllUserRoles(@Response() res: eResponse): Promise<void> {
    const result = await this.userPrivilegeService.getAllUserRoles();
    res.status(200).json(result);
  }

  //Updating the role of user by system admin
  @Put('team/loggedProject')
  //@UseGuards(AuthGuard('jwt'))
  async updateLastLoggedProject(
    @Body() loggedTeam: UpdateLastLoggedTeamDTO,
    @Response() res: eResponse,
  ): Promise<void> {
    const result = await this.userSessionService.updateLastLoggedInProject(loggedTeam);
    res.status(200).json(result);
  }
}
