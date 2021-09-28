
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ADCDetails, PowerboardLoginResponse, TeamDetails } from 'src/app/login/model/login.model';
import {  TeamDetailResponse } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { environment } from 'src/environments/environment';
import { GetTeamDetails } from '../model/pbResponse.model';

import { ADCListDetails, ProjectTeamDetail } from '../my-projects/model/team.model';
import { TeamDetailsService } from '../service/team-details.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  UserIdTeamIdDetails: GetTeamDetails = new GetTeamDetails();
  ADCTeams: TeamDetails[] = [];
  logoPrefix = environment.logoPrefix;
  ADCList: ADCListDetails[] = [];
  updatedCenter: ADCDetails;
  ADC_Center: string;
  localLoader : boolean;
  userId: string;
  teamDetails: TeamDetailResponse = new TeamDetailResponse();
  private powerboardLoginResponse: PowerboardLoginResponse = new PowerboardLoginResponse();
  constructor(private teamDetailsService: TeamDetailsService, private router: Router, public generalService: GeneralService) {
    this.ADC_Center = "Select center";
    this.localLoader = false;
  }

  ngOnInit(): void {

    this.userId = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.userId;
    this.ADCTeams = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.Teams_In_ADC;
    console.log(this.ADCTeams);

    this.ADCList = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.ADC_List;
    console.log(this.ADCList);
    console.log((JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.Teams_In_ADC).length);
    if ((JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.Teams_In_ADC).length == 0) {
     console.log(this.ADCList[1]);
      this.getTeamsInADC(this.ADCList[1]);
      this.ADC_Center = this.ADCList[1].centerName;
    }

    else {
      this.ADC_Center = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.My_Center.centerName;
      this.ADCTeams = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.Teams_In_ADC;
    }
  }

  async getTeamsInADC(adcenter: ADCDetails) {
    try {
      console.log(adcenter);
      
      this.updatedCenter=adcenter;
      this.localLoader = true;
      this.ADC_Center = adcenter.centerName;
      const data = await this.teamDetailsService.getTeamsInADCenter(adcenter.centerId);
      console.log(data);
      this.ADCTeams = data;
      this.localLoader = false;
      this.updateTeamsInADC(this.ADCTeams);

    }
    catch (e) {

      console.log(e);

    }

  }

  public updateTeamsInADC(teamsInADC: ProjectTeamDetail[]) {
    this.powerboardLoginResponse = JSON.parse(localStorage.getItem('PowerboardDashboard'));
    this.powerboardLoginResponse.loginResponse.homeResponse.Teams_In_ADC = [];
    this.powerboardLoginResponse.loginResponse.homeResponse.Teams_In_ADC = teamsInADC;
    this.powerboardLoginResponse.loginResponse.homeResponse.My_Center = this.updatedCenter;

    localStorage.setItem('PowerboardDashboard', JSON.stringify(this.powerboardLoginResponse));

  }

  async getTeamDetails(teamId: string) {
    try {
      this.UserIdTeamIdDetails.teamId = teamId;
      this.UserIdTeamIdDetails.userId = this.userId
      const data = await this.teamDetailsService.getTeamDetails(this.UserIdTeamIdDetails);
      this.teamDetails.powerboardResponse = data;
      localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetails));
      this.router.navigate(['/dashboard']);
      this.teamDetailsService.setTeamDetailPermissions();
      this.generalService.showNavBarIcons = true;
      this.generalService.checkVisibility();
      this.generalService.storeLastLoggedIn();
    }
    catch (e) {
      this.localLoader = false;
      console.log(e);
    }
    console.log(teamId);

  }

 public getLogoPath(teamId : string, logo : string): string{
   let path =  environment.logoPrefix + teamId + '/' + logo;
   return path;
  }


}
