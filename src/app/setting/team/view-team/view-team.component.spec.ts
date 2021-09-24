import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from 'src/app/service/notification.service';

import { ViewTeamComponent } from './view-team.component';

describe('ViewTeamComponent', () => {
  let component: ViewTeamComponent;
  let fixture: ComponentFixture<ViewTeamComponent>;
  let notificationService : NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      
      declarations: [ ViewTeamComponent ],
      providers : [{provide : NotificationService, useValue : notificationService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
