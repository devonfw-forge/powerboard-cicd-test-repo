/* import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VisibilityService } from '../service/visibility.service';

import { SetupComponent } from './setup.component';
class MockVisibilityService{

}
describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  let visibilityService : VisibilityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ SetupComponent ],
      providers : [{provide : VisibilityService, useClass : MockVisibilityService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
 */



import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VisibilityService } from '../service/visibility.service';
 
import { SetupComponent } from './setup.component';
 
describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  let visibilityService : VisibilityService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ SetupComponent ],
      providers: [VisibilityService]
    })
    .compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    visibilityService = TestBed.inject(VisibilityService);
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should enable show logo', ()=>{
    component.showLogo();
    expect(visibilityService.getShowLogo()).toEqual(true);
  });
 
  it('should enable show meeting link', ()=>{
    component.showMeetingLink();
    expect(visibilityService.getShowMeetingLink()).toEqual(true);
  });
 
  it('should enable show team link', ()=>{
    component.showTeamLink();
    expect(visibilityService.getShowTeamLink()).toEqual(true);
  });
 
  it('should enable show images', ()=>{
    component.showImages();
    expect(visibilityService.getShowImages()).toEqual(true);
  });
 
  it('should enable show videos', ()=>{
    component.showVideos();
    expect(visibilityService.getShowVideo()).toEqual(true);
  });
 
  it('should enable show add team member', ()=>{
    component.showAddTeamMember();
    expect(visibilityService.getShowAddTeamMember()).toEqual(true);
  });
 
  it('should enable show view team member', ()=>{
    component.showViewTeamMember();
    expect(visibilityService.getShowViewTeamMember()).toEqual(true);
  });
 
  it('should enable show edit team', ()=>{
    component.showEditTeam();
    expect(visibilityService.getShowEditTeam()).toEqual(true);
  });
});