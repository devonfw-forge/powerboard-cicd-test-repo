import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamDetailResponse } from 'src/app/model/general.model';
import { GetTeamDetails } from 'src/app/project-display/model/pbResponse.model';
import { ADCListDetails } from 'src/app/project-display/my-projects/model/team.model';
import { TeamDetailsService } from 'src/app/project-display/service/team-details.service';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TeamsResponse } from '../../model/setting.model';
import { SettingService } from '../../service/setting.service';
import { VisibilityService } from '../../service/visibility.service';

import { TeamService } from '../service/team.service';
import { AddTeamComponent } from './add-team/add-team.component';


@Component({
  selector: 'app-view-all-teams',
  templateUrl: './view-all-teams.component.html',
  styleUrls: ['./view-all-teams.component.css']
})
export class ViewAllTeamsComponent implements OnInit {
allTeams : TeamsResponse[] = [];
UserIdTeamIdDetails : GetTeamDetails = new GetTeamDetails();
teamDetails : TeamDetailResponse = new TeamDetailResponse();
userId : string;
addedTeam : any;
ADCList: ADCListDetails[] = [];
deleteId: string;
@ViewChild(AddTeamComponent) child;
  constructor(private settingService : SettingService, private router : Router, public generalService : GeneralService, private teamDetailsService: TeamDetailsService, private visibilityService : VisibilityService, private notifyService : NotificationService, private teamService : TeamService) { }

  ngOnInit(): void {
    this.getAllTeams();
    this.ADCList = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.ADC_List;
    this.userId = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.userId;
  }
 async getAllTeams(){
  try{
    const data = await this.teamService.viewAllTeams();
    console.log(data);
    this.allTeams = data;
   
  }
  catch(e){
    console.log(e);
    
  }
 }
public storeDeleteId(teamId : string){
  this.deleteId = teamId;
}
 async deleteTeam(){
  try{
    const data = await this.teamService.deleteTeam(this.deleteId);
    this.notifyService.showSuccess("team deleted successfully", "");
    console.log(data);
    this.getAllTeams();
   
  }
  catch(e){
    console.log(e.error.message);
    this.notifyService.showError("", e.error.message);
    
  }
 }

 public viewTeam(teamId : string){
 this.getTeamDetails(teamId);
 this.visibilityService.showCurrentTeamMenu = true;
 this.visibilityService.showGuestMenu = false;
 this.visibilityService.showTeamMenu = false;
 
 }


 
async getTeamDetails(teamId:string){
  try{
    this.UserIdTeamIdDetails.teamId = teamId;
    this.UserIdTeamIdDetails.userId = this.userId
    const data = await this.teamDetailsService.getTeamDetails(this.UserIdTeamIdDetails);
    this.teamDetails.powerboardResponse = data;
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetails));
    this.teamDetailsService.setTeamDetailPermissions();
    this.generalService.showNavBarIcons = true;
    this.generalService.checkVisibility();
    this.router.navigateByUrl('/viewTeam');
  }
  catch(e){
    console.log(e.error.message);
  }
}

  async addTeam(){
    
  
 const data = await this.child.addTeamWithLogo();
 this.addedTeam ={
   teamId : data.id,
   teamName : data.name,
   teamCode : data.teamCode,
   projectKey : data.projectKey,
   adCenter : this.centerIdToname(data.ad_center)
 }
 this.allTeams.push(this.addedTeam);
 console.log(data);
}

centerIdToname(id: string){
for(let list of this.ADCList){
  if(list.centerId == id){
    return list.centerName;
  }
}
}
}
