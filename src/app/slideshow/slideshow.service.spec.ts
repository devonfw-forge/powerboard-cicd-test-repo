import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from 'ngx-electron';
import { GeneralService } from '../service/general.service';

import { SlideshowService } from './slideshow.service';

describe('SlideshowService', () => {
  let service: SlideshowService;
  let router = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  }
  /* let generalService : GeneralService;
  let electronService : ElectronService; */


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientTestingModule],
      providers:[GeneralService, ElectronService,{ provide: Router, useValue: router }]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideshowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check slideshow array', () => {
    service.checkSlideshowArray();

    expect(service.slideshowArray).toBeTruthy();
  });
  it('should move to next component', () => {
    service.checkSlideshowArray();
    expect(service.slideshowArray).toBeTruthy();
    /* expect(router.navigate).toHaveBeenCalledWith("/slideshow"); */
    service.startSlideShow();
    expect(service.getSlideShow()).toEqual(true);
    service.moveSlideshowNextComponent();
    let url = service.slideshowArray[service.slideshowIndex]
    expect(router.navigateByUrl).toHaveBeenCalledWith(url);
    service.stopSlideShow();
    expect(service.getSlideShow()).toEqual(false);
  });  


  it('should move to previouscomponent', () => {
    service.checkSlideshowArray();
    expect(service.slideshowArray).toBeTruthy();
    /* expect(router.navigate).toHaveBeenCalledWith("/slideshow"); */
    service.startSlideShow();
    expect(service.getSlideShow()).toEqual(true);
    service.moveSlideshowPreviousComponent();
    let url = service.slideshowArray[service.slideshowIndex]
    expect(router.navigateByUrl).toHaveBeenCalledWith(url);
    service.stopSlideShow();
    expect(service.getSlideShow()).toEqual(false);
  });  


  it('should check is electron running', () =>{
    service.isElectronRunning = true;
    service.startSlideShow();
    expect(service.getSlideShow()).toEqual(true);
    service.checkSlideshowArray();
    expect(service.slideshowArray).toBeTruthy();
    service.stopSlideShow();
    expect(service.getSlideShow()).toEqual(false);
  })




  it('should move to next component and check else condition', () => {
    service.checkSlideshowArray();
    expect(service.slideshowArray).toBeTruthy();
    /* expect(router.navigate).toHaveBeenCalledWith("/slideshow"); */
    service.startSlideShow();
    expect(service.getSlideShow()).toEqual(true);
    service.slideshowIndex = service.slideshowArray.length - 1;
    service.moveSlideshowNextComponent();
    let url = service.slideshowArray[service.slideshowIndex]
    expect(router.navigateByUrl).toHaveBeenCalledWith(url);
    service.stopSlideShow();
    expect(service.getSlideShow()).toEqual(false);
  });  


  it('should move to previous component and check else condition', () => {
    service.checkSlideshowArray();
    expect(service.slideshowArray).toBeTruthy();
    /* expect(router.navigate).toHaveBeenCalledWith("/slideshow"); */
    service.startSlideShow();
    expect(service.getSlideShow()).toEqual(true);
    service.slideshowIndex = 0;
    service.moveSlideshowPreviousComponent();
    let url = service.slideshowArray[service.slideshowIndex]
    expect(router.navigateByUrl).toHaveBeenCalledWith(url);
    service.stopSlideShow();
    expect(service.getSlideShow()).toEqual(false);
  });  
});
