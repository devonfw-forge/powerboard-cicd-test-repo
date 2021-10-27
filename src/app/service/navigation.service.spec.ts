import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from './general.service';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let httpTestingController : HttpTestingController;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  let generalService : GeneralService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: router },
                  {provide: GeneralService, useValue: generalService}]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationService);
    httpTestingController = TestBed.inject(HttpTestingController);
    generalService = TestBed.inject(GeneralService);
  });


 /*  it('should be created', () => {
    expect(service).toBeTruthy();
  }); */
});
