
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PowerboardResponse, TeamDetailResponse } from 'src/app/model/general.model';
import { GetTeamDetails } from '../model/pbResponse.model';

import { TeamDetailsService } from './team-details.service';

describe('TeamDetailsService', () => {
  let service: TeamDetailsService;
  let httpTestingController : HttpTestingController;
  let response : PowerboardResponse;
  let userIdTeamIdDetails : GetTeamDetails = new GetTeamDetails();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamDetailsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get team details should return data', async() => {
    let result : any;

    let userIdTeamId : GetTeamDetails = {
      userId : "10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d",
      teamId :"46455bf7-ada7-495c-8019-8d7ab76d490e"
    }
    console.log(userIdTeamId);
    service.getTeamDetails(userIdTeamId).then((data) =>{
      
      expect(data).toBeTruthy();
    }).catch(error => {
      result = error;
    });
    const req = httpTestingController.expectOne(
      {
      method: "POST",
      url :   'http://localhost:3001/v1/teams/powerboard/team'
      });
    
   
  })

it('get team details should throw error for null values', () =>{
  let result : any;
  userIdTeamIdDetails.teamId = null;
   userIdTeamIdDetails.userId = null;
    service.getTeamDetails(userIdTeamIdDetails).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/powerboard/team");
    req.flush("Not Found",{
      status : 404,
      statusText : "Team Not Found"
    });
})


it('get team details should throw error for incorrect values', () =>{
  let result : any;
  userIdTeamIdDetails.teamId = 'incorrectTeamId';
   userIdTeamIdDetails.userId = 'incorrectUserId';
    service.getTeamDetails(userIdTeamIdDetails).then((data) =>{
      result = data;
    })
    .catch(error => {
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/powerboard/team");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
})
 

it('get teams in ADCenter should throw error for null values', () =>{
  let result;
    service.getTeamsInADCenter(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/center/null");
    req.flush("Bad Request",{
      status : 400,
      statusText : "Invalid param id. Number expected"
    });
})

it('get teams in ADCenter should throw error for incorrect values', () =>{
  let result;
    service.getTeamsInADCenter("2121212121212").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/center/2121212121212");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
})

it('get teams in ADCenter should return data', () =>{
  let result;
    service.getTeamsInADCenter("99055bf7-ada7-495c-8019-8d7ab62d488e").then((data) =>{
      result = data;
      expect(data).toBeDefined();
    }).catch(error => {
      result = error;
    });
   httpTestingController.expectOne("http://localhost:3001/v1/teams/center/99055bf7-ada7-495c-8019-8d7ab62d488e");
   
})
});
