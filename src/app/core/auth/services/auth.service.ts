import { Injectable, UnauthorizedException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { User } from '../../user/model/entities/user.entity';
import { LoginDTO } from '../model/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { MyProject } from '../../user/model/dto/my_project.interface';
import { LoginResponse } from '../model/LoginResponse';
import { DashBoardResponse } from '../../../dashboard/model/DashBoardResponse';

import { UserTeam } from '../../user/model/entities/user_team.entity';

import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { IADCenterService } from '../../../ad-center/services/ad-center.interface';
//import { IDashboardService } from '../../../dashboard/services/dashboard.service.interface';
import { IAuthService } from './auth.service.interface';
import { IUserService } from '../../user/services/user.service.interface';
import { IUserTeamService } from '../../user/services/user-team.service.interface';
import { IUserPrivilegeService } from '../../user/services/user-privilege.service.inteface';
import { ChangePasswordDTO } from '../model/ChangePasswordDTO';
import { IUserSessionDetailsService } from '../../user/services/user-session-details.service.interface';
import { UserTeamDTO } from '../../../teams/model/dto/UserTeamDTO';
import { ITeamService } from '../../../teams/services/team.service.interface';
import { IGlobalTeamsService } from '../../../teams/services/global.team.service.interface';
import { HomeResponse } from '../model/HomeResponse';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IADCenterService') private readonly adCenterServiceInterface: IADCenterService,
    // @Inject('IDashboardService') private readonly dashboardService: IDashboardService,
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('IUserTeamService') private readonly userTeamService: IUserTeamService,
    @Inject('IUserSessionDetailsService') private readonly userSessionDetailsService: IUserSessionDetailsService,
    @Inject('ITeamService') private readonly teamService: ITeamService,
    @Inject('IGlobalTeamService') private readonly globalTeamsService: IGlobalTeamsService,
    private readonly jwtService: JwtService,
    @Inject('IUserPrivilegeService') private readonly userPrivilegeService: IUserPrivilegeService,
  ) {}
  globalLink = process.env.AWS_lOGO_URL;
  dash: DashBoardResponse = {} as DashBoardResponse;
  /**
   * validateUser method will validate User
   * @param {username, password} .Takes as input (username and password)
   * @return {User} User as response
   */
  async validateUser(username: string, pass: string): Promise<User | undefined> {
    const user = (await this.userService.findUser(username)) as User;
    if (user && (await compare(pass, user.password!))) {
      return classToPlain(user) as User;
    }
    return undefined;
  }

  /**
   * signIn method will generate accessToken
   * @param {username, password} .Takes as input (username and password)
   * @return {string} AccessToken as response
   */
  async signIn(username: string, password: string): Promise<string> {
    const user: any = { username, password };
    const accessToken = this.jwtService.sign(user, { expiresIn: '1h' });
    return accessToken;
  }

  async loginGuest(user: LoginDTO): Promise<any> {
    const accessToken = await this.signIn(user.username, user.password);
    return await this.loginResponseForGuest(accessToken);
  }

  /**
   * login method response is dynamic  , it will return LoginResponse
   * 1-n , it will return list of teams
   * @param {LoginDTO} .Takes loginDTO as input (username and password)
   * @return {any}
   */

  async login(user: LoginDTO): Promise<any> {
    let isPassword: boolean = false;
    const payload = await this.validateUser(user.username!, user.password!);
    if (payload) {
      const accessToken = await this.signIn(user.username, user.password);
      const userSession = await this.userSessionDetailsService.getUserSessionDetails(payload.id);
      if (userSession) {
        isPassword = userSession.isPasswordChanged;
      }
      let visitedTeam: string = '';
      let loginResponse: LoginResponse = {} as LoginResponse;
      loginResponse.userId = payload.id;
      loginResponse.isPasswordChanged = isPassword;
      if (userSession.lastCheckedInProjectId != null) {
        visitedTeam = userSession.lastCheckedInProjectId;
        loginResponse.powerboardResponse = await this.getPowerboard(visitedTeam, payload.id);
      } else {
        loginResponse.homeResponse = await this.getHomeDetailsForUserId(payload.id);
        console.log('This is login home response');
        console.log(loginResponse.homeResponse);
      }
      loginResponse.privileges = await this.getPrivileges(payload.id);
      return { loginResponse, accessToken };
      // const userTeam = await this.userTeamService.findUserTeamsByUserId(payload.id);
      // if (userTeam[0].team == null) {
      //   return this.systemAdminLogin(userTeam[0], accessToken, isPassword, visitedTeam);
      // } else {
      //   return this.teamMemberTeamAdminLogin(userTeam, accessToken, payload, isPassword, visitedTeam);
      // }
    } else {
      throw new UnauthorizedException('Wrong username or password, Please try again');
    }
  }

  // /**
  //  * systemAdminGuestUserLogin method will return LoginResponse for system admin and guest user login
  //  */
  // async systemAdminLogin(userTeam: UserTeam, accessToken: string, isPassword: boolean, visitedTeam: string) {
  //   let loginResponse: LoginResponse = {} as LoginResponse;
  //   loginResponse.userId = userTeam.user.id;
  //   loginResponse.isPasswordChanged = isPassword;
  //   loginResponse.My_Center = undefined;
  //   loginResponse.My_Team = [];
  //   loginResponse.ADC_List = await this.adCenterServiceInterface.getAllCenters();
  //   loginResponse.Teams_In_ADC = await this.globalTeamsService.getTeamsByCenterId(loginResponse.ADC_List[0].centerId);
  //   loginResponse.privileges = await this.userPrivilegeService.getAllPrivilegeForAdmin(userTeam.user.id);
  //   loginResponse.powerboardResponse = await this.getPowerboard(visitedTeam, loginResponse.userId);
  //   return { loginResponse, accessToken };
  // }

  // /**
  //  * teamMemberTeamAdminLogin method will return LoginResponse for team member and team admin login
  //  */
  // async teamMemberTeamAdminLogin(
  //   userTeam: UserTeam[],
  //   accessToken: string,
  //   payload: User,
  //   isPassword: boolean,
  //   visitedTeam: string,
  // ) {
  //   let teamsDTOArray = [],
  //     i;
  //   if (userTeam.length >= 1) {
  //     let teamsWithinUser: MyProject = {} as MyProject;
  //     for (i = 0; i < userTeam.length; i++) {
  //       teamsWithinUser.teamId = userTeam[i].team.id;
  //       teamsWithinUser.teamName = userTeam[i].team.name;
  //       teamsWithinUser.myRole = userTeam[i].role.roleName;
  //       this.dash = (await this.dashboardService.getDashboardByTeamId(userTeam[i].team)) as DashBoardResponse;
  //       teamsWithinUser.teamStatus = this.dashboardService.fetchStatus(this.dash);
  //       teamsDTOArray.push(teamsWithinUser);
  //       teamsWithinUser = {} as MyProject;
  //     }
  //     let teamId = teamsDTOArray[0].teamId;
  //     const loginResponse = await this.loginDetailsForTeamMemberAdmin(
  //       teamId,
  //       teamsDTOArray,
  //       payload,
  //       isPassword,
  //       visitedTeam,
  //     );
  //     return { loginResponse, accessToken };
  //   }
  // }
  /**
   * loginDetailsForTeamMemberAdmin method will return LoginResponse for team member and team admin login
   */
  // async loginDetailsForTeamMemberAdmin(
  //   teamId: string,
  //   teamsDTOArray: MyProject[],
  //   payload: User,
  //   isPassword: boolean,
  //   visitedTeam: string,
  // ) {
  //   let loginResponse: LoginResponse = {} as LoginResponse;
  //   loginResponse.userId = payload.id;
  //   loginResponse.isPasswordChanged = isPassword;
  //   loginResponse.My_Center = await this.teamService.getCenterByTeamId(teamId);
  //   loginResponse.My_Team = teamsDTOArray;
  //   loginResponse.Teams_In_ADC = await this.globalTeamsService.viewTeamsInADC(teamId);
  //   loginResponse.ADC_List = await this.adCenterServiceInterface.getAllCenters();
  //   loginResponse.privileges = [];
  //   loginResponse.powerboardResponse = await this.getPowerboard(visitedTeam, payload.id);
  //   return loginResponse;
  // }

  /**
   * register method will add the user except guest user
   */
  register(user: UserDTO): Promise<User> {
    return this.userService.registerUser(user);
  }

  async changePassword(changePassword: ChangePasswordDTO): Promise<any> {
    return await this.userService.changePassword(changePassword);
  }

  async getPowerboard(visitedTeam: string, userId: string) {
    let userTeamDTO: UserTeamDTO = {} as UserTeamDTO;
    userTeamDTO.userId = userId;
    userTeamDTO.teamId = visitedTeam;
    if (visitedTeam == '') {
      return undefined;
    } else {
      return await this.teamService.getTeamInfoById(userTeamDTO);
    }
  }

  async loginResponseForGuest(accessToken: string) {
    let homeResponse: HomeResponse = {} as HomeResponse;
    homeResponse.My_Team = [];
    homeResponse.ADC_List = await this.adCenterServiceInterface.getAllCenters();
    homeResponse.Teams_In_ADC = await this.globalTeamsService.getTeamsByCenterId(homeResponse.ADC_List[0].centerId);
    return { homeResponse, accessToken };
  }

  async getHomeDetailsForUserId(userId: string): Promise<HomeResponse | undefined> {
    const userTeam = await this.userTeamService.findUserTeamsByUserId(userId);
    console.log(userTeam);
    if (userTeam[0].team == null) {
      return this.systemAdminHome();
    } else {
      return this.teamMemberTeamAdminHome(userTeam);
    }
  }

  // /**
  //  * systemAdminHome method will return HomeResponse for system admin
  //  */
  async systemAdminHome(): Promise<any> {
    let homeResponse: HomeResponse = {} as HomeResponse;
    homeResponse.My_Center = undefined;
    homeResponse.My_Team = [];
    homeResponse.ADC_List = await this.adCenterServiceInterface.getAllCenters();

    homeResponse.Teams_In_ADC = await this.globalTeamsService.getTeamsByCenterId(homeResponse.ADC_List[0].centerId);
    //homeResponse.privileges = await this.userPrivilegeService.getAllPrivilegeForAdmin(userTeam.user.id);
    return homeResponse;
  }

  // /**
  //  * teamMemberTeamAdminHome method will return LoginResponse for team member and team admin login
  //  */
  async teamMemberTeamAdminHome(userTeam: UserTeam[]): Promise<any> {
    let teamsDTOArray = [],
      i;
    if (userTeam.length >= 1) {
      let teamsWithinUser: MyProject = {} as MyProject;
      for (i = 0; i < userTeam.length; i++) {
        teamsWithinUser.teamId = userTeam[i].team.id;
        teamsWithinUser.teamName = userTeam[i].team.name;
        teamsWithinUser.teamLogo = `${this.globalLink}/${userTeam[i].team.id}/` + userTeam[i].team.logo!;
        teamsWithinUser.myRole = userTeam[i].role.roleName;
        //this.dash = (await this.dashboardService.getDashboardByTeamId(userTeam[i].team)) as DashBoardResponse;
        //teamsWithinUser.teamStatus = this.dashboardService.fetchStatus(this.dash);
        teamsWithinUser.teamStatus = await this.globalTeamsService.findStatusByTeam(userTeam[i].team);
        teamsDTOArray.push(teamsWithinUser);
        teamsWithinUser = {} as MyProject;
      }
      let teamId = teamsDTOArray[0].teamId;
      const homeResponse = await this.homeDetailsForTeamMemberAdmin(teamId, teamsDTOArray);
      return homeResponse;
    }
  }

  /**
   * loginDetailsForTeamMemberAdmin method will return LoginResponse for team member and team admin login
   */
  async homeDetailsForTeamMemberAdmin(teamId: string, teamsDTOArray: MyProject[]) {
    console.log(teamsDTOArray);

    let homeResponse: HomeResponse = {} as HomeResponse;
    homeResponse.My_Center = await this.teamService.getCenterByTeamId(teamId);
    homeResponse.My_Team = teamsDTOArray;
    homeResponse.Teams_In_ADC = await this.globalTeamsService.viewTeamsInADC(teamId);
    homeResponse.ADC_List = await this.adCenterServiceInterface.getAllCenters();
    return homeResponse;
  }

  async getPrivileges(userId: string): Promise<string[]> {
    let privileges: string[] = [];
    const userTeam = (await this.userTeamService.findUserTeamsByUserId(userId)) as UserTeam[];
    if (userTeam[0].team == null) {
      privileges = await this.userPrivilegeService.getAllPrivilegeForAdmin(userTeam[0].user.id);
      console.log('privilegesssss');
      console.log(privileges);
    } else {
      privileges = [];
    }
    return privileges;
  }
}
