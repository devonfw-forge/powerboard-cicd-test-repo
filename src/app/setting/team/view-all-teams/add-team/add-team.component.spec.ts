import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from 'src/app/service/notification.service';
import { SettingService } from 'src/app/setting/service/setting.service';
import checkData from 'src/app/checkData.json'; 
import { AddTeamComponent } from './add-team.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddTeamComponent', () => {
  let component: AddTeamComponent;
  let fixture: ComponentFixture<AddTeamComponent>;
  let settingService : SettingService;
  let httpTestingController : HttpTestingController;
  let notificationService : NotificationService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ AddTeamComponent ],
      providers:[{provide : SettingService, useValue : settingService}, {provide : NotificationService, useValue : notificationService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(AddTeamComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    settingService = TestBed.inject(SettingService);
    notificationService = TestBed.inject(NotificationService);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update center', () =>{
    component.updateCenter('99055bf7-ada7-495c-8019-8d7ab62d488e','ADCenter Bangalore');
    expect(component.centerId).toEqual('99055bf7-ada7-495c-8019-8d7ab62d488e');
  })

  it('should not add team for null data', () =>{
    component.form.reset();
    component.addTeamWithLogo();
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/team/addTeam");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  })

  /* it('should get error for upload file', () =>{
    component.uploadFile(null);
    expect(component.form.get('logo')).toBe(null);
  }) */
});
