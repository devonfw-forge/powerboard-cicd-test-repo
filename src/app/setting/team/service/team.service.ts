import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { environment } from 'src/environments/environment';
import { TeamInfo, TeamMemberDetails, TeamsResponse, UpdateRoles, UpdateTeam } from '../../model/setting.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  /* async addTeam(team : TeamInfo):Promise<any>{
    return await this.http.post<any>(
      'http://localhost:3001/v1/teams/team/addTeam',team ).toPromise();
  } */

  async addTeamWithLogo(formData : FormData):Promise<any>{
    return await this.http.post<any>(
      environment.globalEndPoint + UrlPathConstants.addTeamEndPoint, formData).toPromise();
  }
  

  async deleteTeam(teamId : string):Promise<any>{
    const requestOptions: Object = {
      
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   }
    return await this.http.delete<any>(
      environment.globalEndPoint + UrlPathConstants.deleteTeamEndPoint+ teamId, requestOptions).toPromise();
  }

  async viewAllTeams():Promise<TeamsResponse[]>{
    return await this.http.get<TeamsResponse[]>(
      environment.globalEndPoint + UrlPathConstants.viewAllTeamsEndPoint).toPromise();
  }




  async addTeamMember(teamMember : TeamMemberDetails):Promise<any>{
    const requestOptions: Object = {
      
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   }
    return await this.http.post<any>(
      environment.globalEndPoint + UrlPathConstants.addTeamMemberEndPoint, teamMember, requestOptions
        
   ).toPromise();
  }

  async viewTeamMembersOfTeam(teamId : string):Promise<any>{
    return await this.http.get<any>(
      environment.globalEndPoint + UrlPathConstants.viewAllMembersOfTeamEndPoint + teamId).toPromise();
  }

   async deleteTeamMember(userteamId : string):Promise<any>{
    return await this.http.delete<any>(
      environment.globalEndPoint + UrlPathConstants.deleteTeamMemberEndPoint + userteamId).toPromise();
  } 

  async updateAccessRole(updateRole : UpdateRoles):Promise<any>{
    return await this.http.put<any>(
      environment.globalEndPoint + UrlPathConstants.updateUserRoleEndPoint,updateRole).toPromise();
  }



}
