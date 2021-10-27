import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamSpiritResponse } from 'src/app/model/general.model';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'; 
import { TeamSpiritComponent } from './team-spirit.component';

describe('TeamSpiritComponent', () => {
  let component: TeamSpiritComponent;
  let fixture: ComponentFixture<TeamSpiritComponent>;
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientModule],
      declarations: [ TeamSpiritComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(TeamSpiritComponent);
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should have precise data',inject([HttpClient], async (http:HttpClient) => {
    let teamSpirit : TeamSpiritResponse = {
      "teamSpiritRating": 7,
      "sprintNumber": 10
  }
    
   let data :any = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.teamSpirit;
   component.teamSpirit= data;
   
    fixture.detectChanges();
 expect(component.teamSpirit).toEqual(teamSpirit);
   })); 
 */

   it('should check all conditions for lower team spirit rating', () =>{
    let teamDetails = teamDetailsResponse;
    teamDetails.powerboardResponse.dashboard.teamSpirit.teamSpiritRating = 3;
 localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
expect(component).toBeTruthy();

})

it('should check all conditions for higher team spirit rating', () =>{
 let teamDetails = teamDetailsResponse;
 teamDetails.powerboardResponse.dashboard.teamSpirit.teamSpiritRating = 9;
localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
expect(component).toBeTruthy();

})
});
