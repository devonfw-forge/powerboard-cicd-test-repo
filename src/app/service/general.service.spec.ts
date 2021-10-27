import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PowerboardLoginResponse } from '../login/model/login.model';

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
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should check visibility', () => {
    let permissions : string[] = ["add","remove"];
    service.setPermissions(permissions);
    service.checkVisibility();
    if(service.getLoginComplete()){
      expect(service.isHomeVisible).toEqual(true);
      expect(service.isLogoutVisible).toEqual(true);
    }
    else{
      expect(service.isHomeVisible).toEqual(false);
      expect(service.isLogoutVisible).toEqual(false);
      expect(service.isSettingsVisible).toEqual(false);
      expect(service.isDashboardVisible).toEqual(false);
      expect(service.isMultimediaVisible).toEqual(false);
      expect(service.isLinksVisible).toEqual(false);
      expect(service.isSlideshowVisible).toEqual(false);
    }
    if(service.getLoginComplete() && service.showNavBarIcons){
      expect(service.isDashboardVisible).toEqual(true);
      expect(service.isMultimediaVisible).toEqual(true);
    }
    else{
      expect(service.isDashboardVisible).toEqual(false);
      expect(service.isMultimediaVisible).toEqual(false);
      expect(service.isLinksVisible).toEqual(false);
      expect(service.isSlideshowVisible).toEqual(false);
    }

  });

  it('should check last logged in', () => {
    let loginResponse = new PowerboardLoginResponse();
    service.setpowerboardLoginResponse(loginResponse);
    service.checkLastLoggedIn();
    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });

  it('getProject details should throw erorr for empty data', () =>{
    let result;
    service.getProjectDetails("").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/home/");
    req.flush("404 Not Found",{
      status : 404,
      statusText : "Cannot GET /v1/auth/home/"
    });
  });

  it('getProject details should throw erorr for null data', () =>{
    let result;
    service.getProjectDetails(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/home/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });

  it('send last logged project should throw erorr for incorrect data', () =>{
    let result;
    service.userIdTeamIdDetails.teamId= "incorrectteamId";
    service.userIdTeamIdDetails.userId= "incorrectuserid";
    service.sendLastLoggedIn().then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/user/team/loggedProject");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });

  it('get files from folder should throw erorr for empty data', () =>{
    let result;
    service.getAllFilesFromFolder("","").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesInFolder//");
    req.flush("404 Not Found",{
      status : 404,
      statusText : "Cannot GET /v1/auth/home/"
    });
  });

  it('get files from folder should throw erorr for null data', () =>{
    let result;
    service.getAllFilesFromFolder(null,null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesInFolder/null/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });


  it('get files from team should throw erorr for empty data', () =>{
    let result;
    service.getAllFilesFromTeam("").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesForTeam/");
    req.flush("400 Bad Request",{
      status : 400,
      statusText : "Invalid param id. Number expected"
    });
  });

  it('get files from team should throw erorr for null data', () =>{
    let result;
    service.getAllFilesFromTeam(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesForTeam/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });

  it('get slideshow files should throw erorr for empty data', () =>{
    let result;
    service.getSlideshowFiles("").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/slideshow/");
    req.flush("400 Bad Request",{
      status : 400,
      statusText : "Invalid param id. Number expected"
    });
  });

  it('get slideshow files should throw erorr for null data', () =>{
    let result;
    service.getSlideshowFiles(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/slideshow/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });

});
