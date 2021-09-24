import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/service/general.service';
import { TeamDetailsService } from '../service/team-details.service';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;
  let teamDetailsServiceSpy: jasmine.SpyObj<TeamDetailsService>;
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
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ ProjectsComponent ],
      providers : [{provide  : TeamDetailsService, useValue : teamDetailsServiceSpy},{provide  : GeneralService, useValue : generalServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(loginResponse));
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('get team in adc should throw error on passing null',() =>{
    component.getTeamsInADC(null, null).then((data) =>{

    }).catch((e) => {
      expect(e.error.message).toEqual('Invalid param id. Number expected');
    })
  })


  it('get team details should run',() =>{
    component.getTeamDetails('46455bf7-ada7-495c-8019-8d7ab76d488e').then((data) => {
      expect(generalServiceSpy.showNavBarIcons).toEqual(true);
    })
  })


  it('get teams in adc are updating', () =>{
    component.getTeamsInADC('98755bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Mumbai').then((data) =>{
      let powerboardLoginResponse = JSON.parse(localStorage.getItem('PowerboardDashboard'));
      expect(powerboardLoginResponse.loginResponse.Teams_In_ADC).toEqual(component.ADCTeams);
    })
  })
});
