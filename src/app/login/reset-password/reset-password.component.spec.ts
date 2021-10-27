import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordComponent } from './reset-password.component';
class MockRouter{
  navigate(url : string){
    return url ;
  }
}
describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  let loginResponse = {
    "loginResponse": {
        "userId": "10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d",
        "isPasswordChanged": true,
        "My_Center": {
            "centerId": "99055bf7-ada7-495c-8019-8d7ab62d488e",
            "centerName": "ADCenter Bangalore"
        },
        "My_Team": [
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d488e",
                "teamName": " ",
                "myRole": "team_member",
                "teamStatus": 1
            }
        ],
        "Teams_In_ADC": [
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d488e",
                "teamName": " ",
                "teamStatus": 1
            },
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d489e",
                "teamName": ""
            },
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d490e",
                "teamName": "",
                "teamStatus": 1
            }
        ],
        "ADC_List": [
            {
                "centerId": "98655bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Valencia"
            },
            {
                "centerId": "98755bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Mumbai"
            },
            {
                "centerId": "98855bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Poland"
            },
            {
                "centerId": "98955bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Murcia"
            },
            {
                "centerId": "99055bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Bangalore"
            }
        ],
        "privileges": []
    },
   
};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule],
      declarations: [ ResetPasswordComponent ],
      providers:[{provide : Router, useClass : MockRouter}] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(loginResponse));
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
