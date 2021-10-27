import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from 'src/app/service/notification.service';
import { UpdateRoles } from '../../model/setting.model';
import teamDetailsResponse from '/src/app/teamDetailsResponse.json';
import { ViewAllTeamMembersComponent } from './view-all-team-members.component';

describe('ViewAllTeamMembersComponent', () => {
  let component: ViewAllTeamMembersComponent;
  let fixture: ComponentFixture<ViewAllTeamMembersComponent>;
  let notificationService : NotificationService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ ViewAllTeamMembersComponent ],
      providers : [{provide : NotificationService, useValue : notificationService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTeamMembersComponent);
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
    expect(component).toBeTruthy();
  });

 /*
  it('delete team member should give error for null data', () =>{
    component.deleteMember().catch((e)=>{
      expect(e).toEqual('Something went wrong, Please try again in some moment');
    })
  }) */

/* it('view team members', ()=>{
  component.viewAllMembers().then((data)=>{
    expect(data).toBeTruthy();
    let updateRole : UpdateRoles = {
      "userId": data[0].userId,
      "teamId": data[0].teamId,
      "roleId": '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d'

    }
    component.updateRoleOfMember().
  })
}) */
});
