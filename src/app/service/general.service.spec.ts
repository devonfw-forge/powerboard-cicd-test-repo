import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { GeneralService } from './general.service';

describe('GeneralService', () => {
  let service: GeneralService;
  let httpTestingController : HttpTestingController;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: router }]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should append permissions', () => {
    let permissions : string[] = ["add","remove"];
    service.setPermissions(permissions);
    let newPermissions : string[] = ["add","remove","edit"];
    service.appendPermissions(["edit"]);
    expect(JSON.stringify(service.getPermissions())).toEqual(JSON.stringify(newPermissions));
  });

  it('should remove some permissions', () => {
    let newPermissions : string[] = ["add","remove"];
    let permissions : string[] = ["add","remove","edit"];
    service.setPermissions(permissions);
    service.removeTeamDetailsPermissions(["edit"]);
    expect(JSON.stringify(service.getPermissions())).toEqual(JSON.stringify(newPermissions));
  });

  it('should logout', () => {
    service.logout();
    expect(localStorage.getItem('PowerboardDashboard')).toBeNull();
    expect(localStorage.getItem('TeamDetailsResponse')).toBeNull();
    expect(localStorage.getItem('currentTeam')).toBeNull();
    expect(service.getPermissions().length).toEqual(0);
    expect(service.showNavBarIcons).toEqual(false);
    expect(service.getLoginComplete()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });


});
