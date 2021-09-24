import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SettingService } from './setting.service';

describe('SettingService', () => {
  let service: SettingService;
  let httpTestingController : HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    httpTestingController.match(
      'http://localhost:3001/v1/admin/viewAllUserRoles'
    );
    expect(service).toBeTruthy();
  });

  it('should got roles', () => {
    service.getRoles().then((data)=>{
      expect(data).toBeDefined();
    });
    httpTestingController.match(
      'http://localhost:3001/v1/admin/viewAllUserRoles'
    );
  });

});
