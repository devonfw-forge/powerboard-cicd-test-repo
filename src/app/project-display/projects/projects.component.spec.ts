import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/service/general.service';
import { TeamDetailsService } from '../service/team-details.service';
import checkData from 'src/app/checkData.json'; 
import { ProjectsComponent } from './projects.component';
import { GetTeamDetails } from '../model/pbResponse.model';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;
  let userIdTeamIdDetails : GetTeamDetails = new GetTeamDetails();
  let teamDetailsServiceSpy: jasmine.SpyObj<TeamDetailsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ ProjectsComponent ],
      providers : [{provide  : TeamDetailsService, useValue : teamDetailsServiceSpy},{provide  : GeneralService, useValue : generalServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('get team in adc should throw error on passing null',() =>{
    userIdTeamIdDetails.teamId = null;
    userIdTeamIdDetails.userId = null;
    component.getTeamsInADC(null).then((data) =>{

    }).catch((e) => {
      expect(e.error.message).toEqual('Invalid param id. Number expected');
    })
  })

 
  it('get team details should run',() =>{
    component.getTeamDetails('46455bf7-ada7-495c-8019-8d7ab76d488e').then((data) => {
      expect(generalServiceSpy.showNavBarIcons).toEqual(true);
    })
  }) 


  /* it('get teams in adc are updating', () =>{
    component.getTeamsInADC('98755bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Mumbai').then((data) =>{
      let powerboardLoginResponse = JSON.parse(localStorage.getItem('PowerboardDashboard'));
      expect(powerboardLoginResponse.loginResponse.Teams_In_ADC).toEqual(component.ADCTeams);
    })
  }) */
});
