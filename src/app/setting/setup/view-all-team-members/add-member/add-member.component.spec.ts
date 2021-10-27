import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SettingService } from 'src/app/setting/service/setting.service';
import { TeamService } from 'src/app/setting/team/service/team.service';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'; 

import { AddMemberComponent } from './add-member.component';

describe('AddMemberComponent', () => {
  let component: AddMemberComponent;
  let settingService : SettingService;
  let fixture: ComponentFixture<AddMemberComponent>;
  let notificationService : NotificationService;
  let generalService : GeneralService;
  let toastrService : ToastrService;
  let teamService : TeamService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule,ToastrModule.forRoot()],
      declarations: [ AddMemberComponent ],
      providers:[ SettingService,  NotificationService, GeneralService, TeamService, {provide : ToastrService, usevalue : toastrService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    /* settingService = TestBed.inject(SettingService);
    notificationService = TestBed.inject(NotificationService);
    generalService = TestBed.inject(GeneralService);
    teamService = TestBed.inject(TeamService); */
    toastrService = TestBed.inject(ToastrService); 
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add team member', () =>{
    component.memberGroup.controls.username.setValue(null)
    component.memberGroup.controls.email.setValue(null);
    component.memberGroup.controls.role.setValue(null);
    component.memberGroup.controls.team.setValue(null);
    let result =component.addTeamMember();
   
  })

  it('should update role', () =>{

    component.updateRole("TestingRoleId", "team_admin");
    expect(component.roleName).toEqual("team_admin");
    expect(component.teamMember.role).toEqual("TestingRoleId");
    
  })
  
});
