import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

import { GeneralService } from './service/general.service';
import { SlideshowService } from './slideshow/slideshow.service';
import { TeamDetailsService } from './project-display/service/team-details.service';

import { GlobalLoaderService } from './service/global-loader.service';
import { NavigationService } from './service/navigation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PowerboardFW_new';
  teamName: string;/* 
  isElectronRunning: boolean; */
  checklocationPath : string;
  
 
  constructor(public generalService: GeneralService, public slideShowService: SlideshowService,public navigation: NavigationService, public router: Router, public location: Location, public teamDetailService : TeamDetailsService, public globalLoader : GlobalLoaderService) {

    this.teamName = "";
    /* if (electronService.isElectronApp) {
    
      this.isElectronRunning = true;
    } else {
      
      this.isElectronRunning = false;
    } */
  }

  ngOnInit() {
    this.router.navigate(['login']);
    
  }


  public toggle() {
    let toggle = document.getElementById('togglebtn');
    if (toggle.className == "btn btn-sm btn-toggle active") {
      toggle.className = "btn btn-sm btn-toggle";
      this.slideShowService.stopSlideShow();
    }
    else {
      toggle.className = "btn btn-sm btn-toggle active";
      this.slideShowService.startSlideShow();
    }
  }


  getTeamName() {
    if (this.generalService.showNavBarIcons) {
      if (localStorage.getItem('TeamDetailsResponse') != null) {
        return this.teamName = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_name;
      }
    }
    return "";
  }

  highlight(btnName: string) {
    if (this.generalService.showNavBarIcons) {
      let dashboard = document.getElementById('dashboard');
      let multimedia = document.getElementById('multimedia');
      if (btnName == 'dashboard') {
        dashboard.style.color = "white";
        dashboard.style.backgroundColor = "#0070AD";
        dashboard.style.border = "none";

        multimedia.style.color = "#0070AD";
        multimedia.style.backgroundColor = "#FEFEFE";
        multimedia.style.border = "2px solid #0070AD";

        if (this.generalService.isLinksVisible) {
          let links = document.getElementById('links');
          links.style.color = "#0070AD";
          links.style.backgroundColor = "#FEFEFE";
          links.style.border = "2px solid #0070AD";

        }
      }
      if (btnName == 'links') {
        dashboard.style.color = "#0070AD";
        dashboard.style.backgroundColor = "#FEFEFE";
        dashboard.style.border = "2px solid #0070AD";

        multimedia.style.color = "#0070AD";
        multimedia.style.backgroundColor = "#FEFEFE";
        multimedia.style.border = "2px solid #0070AD";

        if (this.generalService.isLinksVisible) {
          let links = document.getElementById('links');
          links.style.color = "white";
          links.style.backgroundColor = "#0070AD";
          links.style.border = "none";
        }
      }
      if (btnName == 'multimedia') {
        dashboard.style.color = "#0070AD";
        dashboard.style.backgroundColor = "#FEFEFE";
        dashboard.style.border = "2px solid #0070AD";

        multimedia.style.color = "white";
        multimedia.style.backgroundColor = "#0070AD";
        multimedia.style.border = "none";

        if (this.generalService.isLinksVisible) {
          let links = document.getElementById('links');
          links.style.color = "#0070AD";
          links.style.backgroundColor = "#FEFEFE";
          links.style.border = "2px solid #0070AD";

        }
      }
    }
  }

  public checkLocation() {
    if (this.location.path() == "/dashboard") {
      this.highlight('dashboard');
    }
    else {
      if (this.generalService.showNavBarIcons) {
        let dashboard = document.getElementById('dashboard');
        dashboard.style.color = "#0070AD";
        dashboard.style.backgroundColor = "#FEFEFE";
        dashboard.style.border = "2px solid #0070AD";
      }
    }
    
    if(this.location.path() == "/links"){
      this.highlight('links')
    }
    else{
      if (this.generalService.showNavBarIcons) {
        if (this.generalService.isLinksVisible) {
          let links = document.getElementById('links');
          links.style.color = "#0070AD";
          links.style.backgroundColor = "#FEFEFE";
          links.style.border = "2px solid #0070AD";

        }
      }
    }
    if(this.location.path() == "/multimedia"){
      this.highlight('multimedia')
    }
    else{
      
      if (this.generalService.showNavBarIcons) {
        let multimedia = document.getElementById('multimedia');
        multimedia.style.color = "#0070AD";
        multimedia.style.backgroundColor = "#FEFEFE";
        multimedia.style.border = "2px solid #0070AD";
      }
    }
  }

  

  back() {
    
    if(!this.navigation.back()){
      console.log("call modal");
      document.getElementById("openLogoutModal").click();
    }
    /* if(this.location.path() == "/login" || this.location.path() == "/projects"){
      this.location.forward();
      this.moveToHome();
    } */
   
  }
confirmLogout(){
this.navigation.clearRouterHistory();
this.generalService.logout();
this.teamDetailService.resetTeamDetailPermissions();
}
confirmStay(){
  this.navigation.pushCurrentLocation();
}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.slideShowService.stopSlideShow();
  }

  public moveToSetings(){
   this.checklocationPath = this.location.path();
    if(this.checklocationPath.includes("setting")){
      console.log("already in setting");
    }
    else{
      this.router.navigateByUrl("/setting");
    }
  }
}

