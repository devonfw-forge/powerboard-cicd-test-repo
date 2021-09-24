import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamDetails } from 'src/app/login/model/login.model';

import { TeamDetailResponse } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { SlideshowService } from 'src/app/slideshow/slideshow.service';
import { environment } from 'src/environments/environment';
import { GetTeamDetails } from '../model/pbResponse.model';

import { TeamDetailsService } from '../service/team-details.service';



@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
myTeams : TeamDetails[] = [];
userId : string;
logoPrefix = environment.logoPrefix;
UserIdTeamIdDetails : GetTeamDetails = new GetTeamDetails();
teamDetails : TeamDetailResponse = new TeamDetailResponse();
  constructor(private teamDetailsService : TeamDetailsService, private router:Router, public generalService : GeneralService, public slideShowService : SlideshowService ) { 
    
  }

  ngOnInit(): void {
  this.userId = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.userId;
  this.myTeams = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.My_Team;
  console.log(this.myTeams);
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
    this.router.navigateByUrl('/dashboard');
    this.generalService.storeLastLoggedIn();
  }
  catch(e){
    console.log(e.error.message);
  }
}

public getLogoPath(teamId : string, logo : string): string{
  return environment.logoPrefix + teamId + '/' + logo;
 }

}
