import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { rm } from 'fs';
import { environment } from 'src/environments/environment';
import {
  HomeResponse,
  PowerboardLoginResponse,
  TeamDetails,
} from '../login/model/login.model';
import { MultimediaFilesNew, TeamDetailResponse } from '../model/general.model';
import { GetTeamDetails } from '../project-display/model/pbResponse.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  teamDetails: TeamDetailResponse = new TeamDetailResponse();
  userIdTeamIdDetails: GetTeamDetails = new GetTeamDetails();
  lastCheckedInProjectId: string;
  teamsAssociatedWithUser: TeamDetails[];

  private powerboardLoginResponse: PowerboardLoginResponse = new PowerboardLoginResponse();
  private permissions: string[] = [];
  public configureButton: string = 'team_configuration';
  public viewLinks: string = 'view_links';
  public addTeam: string = 'register_team';
  public viewTeams: string = 'view_all_team';
  public deleteTeam: string = 'delete_team';
  public updateTeam: string = 'update_team';
  public addTeamMember: string = 'add_team_member';
  public viewTeamMembers: string = 'view_members_of_team';
  public deleteTeamMember: string = 'delete_team_members';
  public updateRole: string = 'update_role';
  public addGuest: string = 'add_guest_user';
  public teamConfiguration: string = 'team_configuration';
  public addTeamAdmin: string = 'add_team_admin';
  

  private loginComplete: boolean;

  isHomeVisible: boolean;
  isSlideshowVisible: boolean;
  isDashboardVisible: boolean;

  isLinksVisible: boolean;
  isMultimediaVisible: boolean;
  isSettingsVisible: boolean;
  isLogoutVisible: boolean;
  isGuestLogin: boolean;
  /* isSettingFlag: boolean;
  isLinksFlag: boolean; */

  public showNavBarIcons: boolean;

  constructor(private router: Router, private http: HttpClient) {
    this.isHomeVisible = false;
    this.isLogoutVisible = false;
    this.isDashboardVisible = false;
    this.isMultimediaVisible = false;
    this.permissions = [];
    this.isLinksVisible = false;
    this.isSettingsVisible = false;
    this.isSlideshowVisible = false;
    this.isGuestLogin = false;
    this.loginComplete = false;
    this.showNavBarIcons = false;

    this.checkVisibility();
  }

  @HostListener('window:unload', ['$event'])
  public windowTabClosed($event: any) {
    this.logout();
    console.log('Window tab closed');
  }

  public getPermissions(): string[] {
    return this.permissions;
  }

  public setPermissions(value: string[]) {
    this.permissions = value;
  }

  public getpowerboardLoginResponse(): PowerboardLoginResponse {
    return this.powerboardLoginResponse;
  }

  public setpowerboardLoginResponse(value: PowerboardLoginResponse) {
    this.powerboardLoginResponse = value;
  }

  public appendPermissions(value: string[]) {
    if (this.permissions) {
      this.permissions = this.permissions.concat(value);
    }
    console.log(this.permissions);
  }

  public removeTeamDetailsPermissions(value: string[]) {
    console.log('filter teams per value');
    console.log(value);
    console.log('all permissions begore filter');
    console.log(this.permissions);
    if (this.permissions && value) {
      this.permissions = this.permissions.filter(
        (ar) => !value.find((rm) => rm === ar)
      );
    }

    console.log('all permissions after filter');
    console.log(this.permissions);
  }
  public logout() {
    this.sendLastLoggedIn();
    localStorage.removeItem('PowerboardDashboard');
    localStorage.removeItem('TeamDetailsResponse');
    localStorage.removeItem('currentTeam');
    this.setPermissions([]);
    this.setisGuestLogin(false);
    this.showNavBarIcons = false;
    this.setLoginComplete(false);
    this.checkVisibility();
    this.router.navigateByUrl('/');
  }

  checkVisibility() {
    if (this.getLoginComplete()) {
      this.isHomeVisible = true;
      this.isLogoutVisible = true;
     /*  this.isSettingFlag = false; */
     this.isSettingsVisible = false;
      if (this.getPermissions()) {
        for (let permission of this.getPermissions()) {
          if (this.configureButton == permission) {
            /* this.isSettingFlag = true; */
            this.isSettingsVisible =true;
          }
        }
        
      } 
    } else {
      this.isHomeVisible = false;
      this.isLogoutVisible = false;
      this.isSettingsVisible = false;
      this.isDashboardVisible = false;
      this.isMultimediaVisible = false;

      this.isLinksVisible = false;
      this.isSlideshowVisible = false;
    }


    if (this.showNavBarIcons && this.getLoginComplete()) {
      this.isDashboardVisible = true;
      this.isMultimediaVisible = true;
      /* this.isSettingFlag = false;
      this.isLinksFlag = false; */
      this.isSettingsVisible =false;
      this.isLinksVisible = false;
      this.isSlideshowVisible = false;
      if (this.getPermissions()) {
        for (let permission of this.getPermissions()) {
          if (this.configureButton == permission) {
           /*  this.isSettingFlag = true; */
           this.isSettingsVisible = true;
          }
          if (this.viewLinks == permission) {
            /* this.isLinksFlag = true; */
            this.isLinksVisible = true;
          }
        }
        
      } 
    } else {
      this.isDashboardVisible = false;
      this.isMultimediaVisible = false;

      this.isLinksVisible = false;
      this.isSlideshowVisible = false;
    }
  }

  public getLoginComplete(): boolean {
    return this.loginComplete;
  }

  public setLoginComplete(value: boolean) {
    this.loginComplete = value;
  }

  public getisGuestLogin(): boolean {
    return this.isGuestLogin;
  }

  public setisGuestLogin(value: boolean) {
    this.isGuestLogin = value;
  }

  public checkLastLoggedIn() {
    if (this.powerboardLoginResponse.loginResponse.powerboardResponse) {
      this.teamDetails.powerboardResponse = this.powerboardLoginResponse.loginResponse.powerboardResponse;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetails)
      );

      this.showNavBarIcons = true;
      this.checkVisibility();

      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigate(['/projects']);
    }
  }

  storeLastLoggedIn() {
    this.userIdTeamIdDetails.userId = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.userId;
    this.teamsAssociatedWithUser = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.homeResponse.My_Team;
    this.lastCheckedInProjectId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;

    if (this.teamsAssociatedWithUser.length > 0) {
      for (let team of this.teamsAssociatedWithUser) {
        if (this.lastCheckedInProjectId == team.teamId) {
          this.userIdTeamIdDetails.teamId = team.teamId;
        }
        //  else{
        //    this.userIdTeamIdDetails.teamId=this.lastCheckedInProjectId;
        //  }
      }
    } else {
      this.userIdTeamIdDetails.teamId = this.lastCheckedInProjectId;
    }
    // this.sendLastLoggedIn();
  }

  /* new end point call */
  async getProjectDetails(userId: string): Promise<HomeResponse> {
    return await this.http
      .get<HomeResponse>('http://localhost:3001/v1/auth/home/' + userId)
      .toPromise();
  }

  async sendLastLoggedIn() {
    await this.http
      .put<any>(
        'http://localhost:3001/v1/user/team/loggedProject',
        this.userIdTeamIdDetails
      )
      .toPromise();
  }

  public getLogoPath(){
    if(JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.logo){
      return environment.logoPrefix + JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id + '/'
       +JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.logo;
    }
    else{
      return null;
    }
   }


   async getAllFilesFromFolder(teamId: string, folderId : string): Promise<MultimediaFilesNew[]> {
    return await this.http
      .get<MultimediaFilesNew[]>('http://localhost:3001/v1/multimedia/getAllFilesInFolder/' + teamId + '/' + folderId)
      .toPromise();
  }

  async getAllFilesFromTeam(teamId: string): Promise<MultimediaFilesNew[]> {
    return await this.http
      .get<MultimediaFilesNew[]>('http://localhost:3001/v1/multimedia/getAllFilesForTeam/' + teamId)
      .toPromise();
  }
}
