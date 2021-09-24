import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from 'src/app/service/notification.service';

import { ConfigureLogoComponent } from './configure-logo.component';

describe('ConfigureLogoComponent', () => {
  let component: ConfigureLogoComponent;
  let fixture: ComponentFixture<ConfigureLogoComponent>;
  let notificationService : NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ ConfigureLogoComponent ],
      providers : [{provide : NotificationService, useValue : notificationService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
