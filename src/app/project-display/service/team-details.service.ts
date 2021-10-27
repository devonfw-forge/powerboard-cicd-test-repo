import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HomeResponse, TeamDetails } from 'src/app/login/model/login.model';
import { PowerboardResponse, TeamDetailResponse } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { GetTeamDetails } from '../model/pbResponse.model';
import { ProjectTeamDetail } from '../my-projects/model/team.model';
import { environment } from 'src/environments/environment';
import { UrlPathConstants } from 'src/app/UrlPaths';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {
  userId : string;
private teamDetailPermissions : string[] = [];
UserIdTeamIdDetails : GetTeamDetails = new GetTeamDetails();
teamDetails : TeamDetailResponse = new TeamDetailResponse();
  constructor(private http: HttpClient, private generalService : GeneralService, private router:Router) { 
    
  }
  
  async getTeamDetails(userIdTeamIdDetails : GetTeamDetails):Promise<PowerboardResponse>{
    return await this.http.post<PowerboardResponse>(
      environment.globalEndPoint + UrlPathConstants.getTeamDetailsEndPoint, userIdTeamIdDetails ).toPromise();
  }

  async getTeamsInADCenter(centerId : string):Promise<ProjectTeamDetail[]>{
    return await this.http.get<ProjectTeamDetail[]>(
      environment.globalEndPoint + UrlPathConstants.getTeamsCenterEndPoint  + centerId ).toPromise();
  }

/* new call */

  public getTeamDetailPermissions(): string[]
  {
    return this.teamDetailPermissions;
  }

  public setTeamDetailPermissions()
  {
    console.log(this.teamDetailPermissions);
    this.generalService.removeTeamDetailsPermissions(this.teamDetailPermissions);
    if(localStorage.getItem('TeamDetailsResponse')!=null){
      this.teamDetailPermissions = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.privileges;
    }else{
      this.teamDetailPermissions = [];
    }
    
    console.log(this.teamDetailPermissions);

    this.generalService.appendPermissions(this.teamDetailPermissions);
  }

  public setPermissionsOfTeamDetails(value : []){
    this.teamDetailPermissions = value;
    
  }

  public resetTeamDetailPermissions(){
    this.teamDetailPermissions = [];
  }




  public async processTeamDetails(teamId:string){
    this.userId = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.userId;
    try{
      this.UserIdTeamIdDetails.teamId = teamId;
      this.UserIdTeamIdDetails.userId = this.userId;
      /* this.localLoader = true; */
      const data = await this.getTeamDetails(this.UserIdTeamIdDetails);
      this.teamDetails.powerboardResponse = data;
      /* this.localLoader = false; */
      localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetails));
      this.setTeamDetailPermissions();
      this.generalService.showNavBarIcons = true;
      this.generalService.checkVisibility();
      this.router.navigateByUrl('/dashboard');
      this.generalService.storeLastLoggedIn();
    }
    catch(e){
      /* this.localLoader = false; */
      console.log(e.error.message);
    }
  }
}
