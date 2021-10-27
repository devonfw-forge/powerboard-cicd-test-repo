import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GeneralService } from './general.service';
import { PowerboardLoginResponse } from '../login/model/login.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private history: string[] = [];
  lastLocation: string;
  private powerboardLoginResponse: PowerboardLoginResponse = new PowerboardLoginResponse();
  currentLocation: string;
  constructor(
    private router: Router,
    private generalService: GeneralService
  ) {
    this.history = [];
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
    this.lastLocation = '';
    this.currentLocation = '';
  }

  back(): boolean {
    this.currentLocation = this.history.pop();

    if (this.history.length > 1) {
      console.log('inside if');
      console.log(this.history);
      this.lastLocation = this.history.pop();
      console.log(this.lastLocation);
      if (this.lastLocation.includes('/setting')) {
        while (
          this.lastLocation.includes('/setting') ||
          this.lastLocation.includes('/viewTeam')
        ) {
          console.log(this.history);
          this.lastLocation = this.history.pop();
        }
      }
      if (this.lastLocation.includes('/projects')) {
        this.moveToHome();
      } else {
        this.router.navigateByUrl('/' + this.lastLocation);
      }

      this.router.navigateByUrl('/' + this.lastLocation);
    } else {
      console.log('reached end');
      return false; //reached end of the navigation
    }
    return true; //array is there to go back
  }

  public clearRouterHistory() {
    this.history = [];
  }

  async moveToHome() {
    if (
      JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse
        .homeResponse === undefined
    ) {
      const userId = JSON.parse(localStorage.getItem('PowerboardDashboard'))
        .loginResponse.userId;
      const data = await this.generalService.getProjectDetails(userId);
      this.powerboardLoginResponse = JSON.parse(
        localStorage.getItem('PowerboardDashboard')
      );
      this.powerboardLoginResponse.loginResponse.homeResponse = data;

      localStorage.setItem(
        'PowerboardDashboard',
        JSON.stringify(this.powerboardLoginResponse)
      );
      console.log(data);
    }
    this.generalService.showNavBarIcons = false;
    this.router.navigate(['/projects']);
  }

  pushCurrentLocation(){
    this.history.push(this.currentLocation);
  }
}
