import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,

  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { TeamDetailResponse } from '../model/general.model';
import { TeamDetailsService } from '../project-display/service/team-details.service';
import { GeneralService } from '../service/general.service';
import {environment} from '../../environments/environment'
import {  PowerboardLoginResponse } from './model/login.model';

import { LoginService } from './service/login.service';
import { NotificationService } from '../service/notification.service';
import { GlobalLoaderService } from '../service/global-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private authError: boolean;
  fieldTextType: boolean = false;
  private powerboardLoginResponse: PowerboardLoginResponse = new PowerboardLoginResponse();
  loginForm: FormGroup;
  multimediaPrefix = environment.multimediaPrefix;
  imagePath : string;
  localLoader : boolean;
  teamDetails : TeamDetailResponse = new TeamDetailResponse();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private teamDetailsService : TeamDetailsService,
    private generalService: GeneralService,
    public globalLoader :GlobalLoaderService,
    private notificationService : NotificationService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.authError = null;
    this.localLoader = false;
    this.imagePath = this.multimediaPrefix + "multimedia/46455bf7-ada7-495c-8019-8d7ab76d490e/Screenshot(3)2fd7e5fd-5340-47b3-b704-f18596a38656.png"
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async login() {
    try {
     this.localLoader = true;
      const data = await this.loginService.Login(
        this.loginForm.controls.id.value,
        this.loginForm.controls.password.value
      );
      this.powerboardLoginResponse = data;
      this.localLoader = false;
      this.generalService.setPermissions(
        this.powerboardLoginResponse.loginResponse.privileges
      );
      localStorage.setItem(
        'PowerboardDashboard',
        JSON.stringify(this.powerboardLoginResponse)
      );
      console.log(this.generalService.getPermissions());
      this.generalService.setLoginComplete(true);

      this.changeDetector.detectChanges();
      this.generalService.setpowerboardLoginResponse(this.powerboardLoginResponse);
    
      if (this.powerboardLoginResponse.loginResponse.isPasswordChanged) {
        
        this.generalService.checkLastLoggedIn();
      } else {
        this.router.navigateByUrl('/resetpassword');
      }
      this.teamDetailsService.setTeamDetailPermissions();
      this.generalService.checkVisibility();
      
      this.notificationService.showSuccess("", "Login Successful");
    } catch (e) {
      this.localLoader = false;
      console.log(e);
      this.globalLoader.stopLoader();

      window.alert(e.error.message);
      this.router.navigateByUrl('/');
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  keyPressed() {
    this.authError = false;
  }

  getAuthError() {
    return this.authError;
  }

  async GuestLogin(){

    try {
      const data:any = await this.loginService.guestLogin();
 
      this.powerboardLoginResponse.loginResponse.homeResponse = data.homeResponse;
      this.generalService.setisGuestLogin(true);
      this.generalService.setPermissions(
        
        null
      );
      localStorage.setItem(
        'PowerboardDashboard',
        JSON.stringify(this.powerboardLoginResponse)
      );
     
      this.generalService.setLoginComplete(true);
      this.changeDetector.detectChanges();
      this.router.navigate(['/projects']);
  
    } catch (e) {
      console.log(e);
      window.alert(e.error.message);
      this.router.navigateByUrl('/');
    }
  }
}
