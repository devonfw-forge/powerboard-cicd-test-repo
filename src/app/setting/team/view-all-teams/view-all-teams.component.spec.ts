import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';

import { ViewAllTeamsComponent } from './view-all-teams.component';

describe('ViewAllTeamsComponent', () => {
  let component: ViewAllTeamsComponent;
  let fixture: ComponentFixture<ViewAllTeamsComponent>;
  let notificationService : NotificationService;
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ ViewAllTeamsComponent ],
      providers : [{provide : NotificationService, useValue : notificationService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete team member should give error for null data', () =>{
    component.deleteTeam().catch((e)=>{
      expect(e).toEqual('Something went wrong, Please try again in some moment');
    })
  })

  it('get team details should run',() =>{
    component.getTeamDetails('46455bf7-ada7-495c-8019-8d7ab76d488e').then((data) => {
      expect(generalServiceSpy.showNavBarIcons).toEqual(true);
    })
  })

  it('get all teams and view teams', () =>{
    component.getAllTeams().then((data) =>{
      expect(data).toBeTruthy();
      component.getTeamDetails((data[0].teamId)).then((teamdata)=>{
        expect(generalServiceSpy.showNavBarIcons).toEqual(true);
      })
    })
  })
});
