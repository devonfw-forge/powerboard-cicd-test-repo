import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import checkData from 'src/app/checkData.json'; 
import { ViewAllTeamsComponent } from './view-all-teams.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('ViewAllTeamsComponent', () => {
  let component: ViewAllTeamsComponent;
  let fixture: ComponentFixture<ViewAllTeamsComponent>;
  let notificationService : NotificationService;
  let httpTestingController : HttpTestingController;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule,  HttpClientTestingModule],
      declarations: [ ViewAllTeamsComponent ],
      providers : [{provide : NotificationService, useValue : notificationService}, {provide : Router, useValue : router}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(ViewAllTeamsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete team should give error for null data', () =>{
    component.storeDeleteId(null);
    component.deleteTeam();
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/team/delete/null");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
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
  it('should get all teams', () =>{
    component.getAllTeams();
    expect(component.allTeams).toBeTruthy();
  })


  it('should get center name from center id', () =>{
    expect(component.centerIdToname('99055bf7-ada7-495c-8019-8d7ab62d488e')).toEqual('ADCenter Bangalore')
  })

 
});
