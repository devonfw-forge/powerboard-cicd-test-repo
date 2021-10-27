import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/service/general.service';
import { SettingService } from 'src/app/setting/service/setting.service';
import { TeamService } from 'src/app/setting/team/service/team.service';

import { EditTeamMemberComponent } from './edit-team-member.component';

describe('EditTeamMemberComponent', () => {
  let component: EditTeamMemberComponent;
  let generalService : GeneralService;
  let settingService : SettingService;
  let teamService : TeamService;
  let fixture: ComponentFixture<EditTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      declarations: [ EditTeamMemberComponent ],
      providers:[{provide : GeneralService, useValue : generalService},
        {provide : SettingService, useValue : settingService},
        {provide : TeamService, useValue : teamService} ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    generalService = TestBed.inject(GeneralService);
    settingService = TestBed.inject(SettingService);
    teamService = TestBed.inject(TeamService);
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  });  */
});
