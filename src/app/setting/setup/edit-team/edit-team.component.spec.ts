import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SetupService } from '../service/setup.service';
import checkData from 'src/app/checkData.json'; 
import teamDetailsResponse from 'src/app/teamDetailsResponse.json';
import { EditTeamComponent } from './edit-team.component';

describe('EditTeamComponent', () => {
  let component: EditTeamComponent;
  let fixture: ComponentFixture<EditTeamComponent>;
  let generalService : GeneralService;
  let setupService : SetupService;
  let notificationService : NotificationService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ EditTeamComponent ],
      providers: [{provide  : GeneralService, useValue : generalService}, {provide  : SetupService, useValue : setupService}, {provide  : NotificationService, useValue : notificationService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(EditTeamComponent);
    component = fixture.componentInstance;
    generalService = TestBed.inject(GeneralService);
    setupService = TestBed.inject(SetupService);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
