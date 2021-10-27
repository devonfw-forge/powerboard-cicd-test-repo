import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamDetailResponse } from 'src/app/model/general.model';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { environment } from 'src/environments/environment';
import { ConfigureTeamSpirit, DailyMeetingLinksDetails, GuestDetails, GuestInfo, RolesResponse, TeamInfo, TeamLinksDetails, TeamMemberDetails, TeamsResponse, UpdateRoles, UpdateTeam } from '../model/setting.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
roles : RolesResponse[] = [];
teamAdminRole : string = "";
teamMemberRole :  string = "";
guestRole : string = "";
currentTeam : TeamsResponse = new TeamsResponse();
public teamDetails : TeamDetailResponse = new TeamDetailResponse();

  constructor(private http: HttpClient) { 
    this.getRoles().then(
      (data)=>{
        if(data){

          this.roles = data;
          console.log(this.roles);
          for(let role of this.roles){
            if(role.roleName == "team_admin"){
              this.teamAdminRole = role.roleId;
            }

            if(role.roleName == "team_member"){
              this.teamMemberRole = role.roleId;
            }

            if(role.roleName == "guest_user"){
              this.guestRole = role.roleId;
            }
          }
        }
        else{
          this.roles = [];
        }

      },
    (reason)=>{
      console.log("error getting roles", reason);
    }
    )
  }


  public getTeamDetails(){
    this.teamDetails = new TeamDetailResponse();
    this.teamDetails = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
  }

  public setTeamDetails(){
    localStorage.setItem('TeamDetailsResponse',JSON.stringify(this.teamDetails));
  }

  async getRoles():Promise<RolesResponse[]>{
    return await this.http.get<RolesResponse[]>(
      environment.globalEndPoint + UrlPathConstants.viewAllUserRolesEndPoint ).toPromise();
  }

}
