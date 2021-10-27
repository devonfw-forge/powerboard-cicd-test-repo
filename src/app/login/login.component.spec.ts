import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { verify } from 'crypto';
import { GeneralService } from '../service/general.service';
import { NotificationService } from '../service/notification.service';

import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let generalService : GeneralService;
  let notificationService : NotificationService;
  let router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ LoginComponent ],
       providers:[{provide : GeneralService, useValue : generalService},
      {provide : Router, useValue : router},
      {provide : NotificationService, useValue : notificationService} ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    generalService = TestBed.inject(GeneralService);
    notificationService = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return auth error value', () => {
   expect(component.getAuthError()).toEqual(null);
  });

  it('should make auth error value to false', () => {
    component.keyPressed();
    expect(component.getAuthError()).toEqual(false);
   });
   it('should get login complete', () =>{
     component.loginForm.controls.id.setValue("raj11");
     component.loginForm.controls.password.setValue("password");
     component.login().then((data) =>{
      expect(generalService.getLoginComplete()).toEqual(true);
     })
     
   })

   it('should get error for login with null values', () =>{
    component.loginForm.controls.id.setValue("raj11");
     component.loginForm.controls.password.setValue("password");
    component.login().then((data) =>{
     
    }).catch((e) =>{
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      expect(window.alert()).toHaveBeenCalled();
    })
    
  })

  /* it('should login for guest users',async () =>{
   await component.GuestLogin()
    }) */
})