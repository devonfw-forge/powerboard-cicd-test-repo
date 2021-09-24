import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamInfo, TeamMemberDetails, TeamsResponse, UpdateRoles, UpdateTeam } from '../../model/setting.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  async addTeam(team : TeamInfo):Promise<any>{
    return await this.http.post<any>(
      'http://localhost:3001/v1/teams/team/addTeam',team ).toPromise();
  }

  async addTeamWithLogo(formData : FormData):Promise<any>{
    return await this.http.post<any>(
      'http://localhost:3001/v1/teams/team/addTeam', formData).toPromise();
  }
  

  async deleteTeam(teamId : string):Promise<any>{
    const requestOptions: Object = {
      
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   }
    return await this.http.delete<any>(
      'http://localhost:3001/v1/teams/team/delete/'+ teamId, requestOptions).toPromise();
  }

  async viewAllTeams():Promise<TeamsResponse[]>{
    return await this.http.get<TeamsResponse[]>(
      'http://localhost:3001/v1/teams/team/viewAllTeams').toPromise();
  }




  async addTeamMember(teamMember : TeamMemberDetails):Promise<any>{
    const requestOptions: Object = {
      
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   }
    return await this.http.post<any>(
      'http://localhost:3001/v1/auth/register', teamMember, requestOptions
        
   ).toPromise();
  }

  async viewTeamMembersOfTeam(teamId : string):Promise<any>{
    return await this.http.get<any>(
      'http://localhost:3001/v1/user/viewAllMemberOfTeam/' + teamId).toPromise();
  }

   async deleteTeamMember(userteamId : string):Promise<any>{
    return await this.http.delete<any>(
      'http://localhost:3001/v1/user/delete/userTeam/' + userteamId).toPromise();
  } 

  async updateAccessRole(updateRole : UpdateRoles):Promise<any>{
    return await this.http.put<any>(
      'http://localhost:3001/v1/user/update/userRole',updateRole).toPromise();
  }



}
