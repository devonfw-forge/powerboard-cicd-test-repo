import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { TeamSpiritResponse } from '../model/dto/TeamSpiritResponse.dto';
import { TeamSpiritMedian } from '../model/entities/team-spirit-median.entity';
import { ITeamSpiritService } from './team-spirit.interface';
// import { AxiosRequestConfig } from 'axios';
// import { HttpService } from '@nestjs/common/http/http.service';
@Injectable()
export class TeamSpiritCrudService extends TypeOrmCrudService<TeamSpiritMedian> implements ITeamSpiritService {
  constructor(
    @InjectRepository(TeamSpiritMedian) private readonly teamSpiritRepository: Repository<TeamSpiritMedian>, //@InjectRepository(Team) private readonly teamRepository: Repository<Team>, // private readonly http: HttpService, // private readonly http: HttpService
  ) {
    super(teamSpiritRepository);
  }
  teamSpiritResponse: TeamSpiritResponse = {} as TeamSpiritResponse;
  accessTokenForTeamSpirit = '';
  /**
   * getTeamSpirit method will fetch the spirit of team
   * @param {teamId} ,Takes teamId as input
   * @return {TeamSpiritResponse} TeamSpirit as response for that team's previous sprint
   */

  // API REST url
  // private newTeamSpiritEndpointURL = 'http://frparvm97723807.corp.capgemini.com:8981/';

  // private config: AxiosRequestConfig = {
  //   headers: { Authorization: '' },
  // };

  // async loginToTeamSpirit(teamSpiritUserDTO: TeamSpiritUserDTO): Promise<any> {
  //   console.log(teamSpiritUserDTO.Email + ' ' + teamSpiritUserDTO.Password);
  //   console.log('Inside Login of Team Spirit');
  //   this.config.headers.Authorization = await this.http
  //     .post(this.newTeamSpiritEndpointURL + 'login', teamSpiritUserDTO)
  //     .toPromise()
  //     .then(resp => {
  //       console.log('This is the token in then  ' + resp.data.token);
  //       return resp.data;
  //     });
  //   console.log('This is config ' + this.config);
  //   console.log(this.config.headers.Authorization);
  //   return this.config.headers.Authorization;
  // }

  // async getTeam(teamName: string): Promise<any> {
  //   return await this.http
  //     .get(this.newTeamSpiritEndpointURL + 'team/' + teamName, {
  //       headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
  //     })
  //     .toPromise()
  //     .then(resp => {
  //       return resp.data;
  //     })
  //     .catch(error => {
  //       return error.data;
  //     });
  // }

  //To get the result of team's survey
  async getTeamSpiritFromSurvey(teamName: string): Promise<TeamSpiritResponse | undefined> {
    const surveyResult: TeamSpiritMedian = (await this.teamSpiritRepository
      .createQueryBuilder('team_spirit_median')
      .where('team_spirit_median.team_name=:team_name', { team_name: teamName })
      .orderBy('team_spirit_median.start_date', 'DESC')
      .limit(1)
      .getOne()) as TeamSpiritMedian;
    let teamSpiritResponse = {} as TeamSpiritResponse;
    if (surveyResult) {
      teamSpiritResponse.teamSpiritRating = surveyResult.surveyMedian;
      return teamSpiritResponse;
    } else {
      return undefined;
    }

    //return teamSpiritResponse;
  }
}
//add a team to the team spirit
// async addTeamToTeamSpirit(team: TeamDTO): Promise<any> {
//   console.log('Inside Creating team');
//   console.log(team);
//   const teamExisted: TeamDTO = await this.getTeam(team.Name);
//   console.log('Team Existed');
//   console.log(teamExisted);
//   if (teamExisted) {
//     return 'Team ' + team.Name + ' already exists';
//   } else {
//     const createdTeam = await this.http
//       .post(this.newTeamSpiritEndpointURL + 'team/create', team, {
//         headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
//       })
//       .toPromise()
//       .then(resp => {
//         console.log(resp.data);
//         return resp.data;
//       })
//       .catch(error => {
//         console.log(error.response.data);
//         return error.data;
//       });

//     return createdTeam;
//   }
// }

// //update configuration of a team
// async updateTeamConfiguration(updatedTeam: TeamDTO, teamName: string): Promise<any> {
//   const team: TeamDTO = await this.getTeam(teamName);
//   if (team) {
//     return await this.http
//       .put(this.newTeamSpiritEndpointURL + 'team/' + teamName, updatedTeam, {
//         headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
//       })
//       //return this.http.put(this.newTeamSpiritEndpointURL + 'team/' + projectName, teamDTO, { headers: { Authorization: 'Bearer ' + this.config.headers.Authorization } })
//       .toPromise()
//       .then(resp => {
//         console.log(resp.data);
//         return resp.data;
//       });
//   } else {
//     return 'Team ' + teamName + ' does not exist.';
//   }
// }

// async createUser(userDTO: TeamSpiritUserDTO): Promise<any> {
//   return await this.http
//     .post(this.newTeamSpiritEndpointURL + 'user/create', userDTO, {
//       headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
//     })
//     .toPromise()
//     .then(resp => {
//       return resp.data;
//     });
// }

// // add user to team
// async addUserToTeam(userDTO: TeamSpiritUserDTO, teamName: string): Promise<any> {
//   userDTO.RoleID = 2;
//   userDTO.Role = {
//     Id: 2,
//     Name: 'Team Leader',
//   };
//   const user = {
//     RoleID: userDTO.RoleID,
//     Full_Name: userDTO.Full_Name,
//     Email: userDTO.Email,
//     Password: userDTO.Password,
//     Role: userDTO.Role,
//   };
//   const team: TeamDTO = await this.getTeam(teamName);
//   if (team) {
//     team.Users!.push(user);

//     const updatedTeam = await this.http
//       .put(this.newTeamSpiritEndpointURL + 'team/' + teamName, team, {
//         headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
//       })
//       .toPromise()
//       .then(resp => {
//         return resp.data;
//       });
//     return updatedTeam;
//   } else {
//     return 'Team ' + teamName + ' does not exist.';
//   }
// }
