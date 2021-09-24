
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PowerboardResponse, TeamDetailResponse } from 'src/app/model/general.model';

import { TeamDetailsService } from './team-details.service';

describe('TeamDetailsService', () => {
  let service: TeamDetailsService;
  let httpTestingController : HttpTestingController;
  let response : PowerboardResponse;

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
    response =  {

      "team_id": "46455bf7-ada7-495c-8019-8d7ab76d490e",
      "team_name": "Team C",
      "center": "ADCenter Bangalore",
      "team_code": "10012347",
      "logo": null,
      "multimedia" : [],
      "dashboard": {
          "teamId": "46455bf7-ada7-495c-8019-8d7ab76d490e",
          "codeQuality": {
              "bugs": 5,
              "codeSmells": 21,
              "codeCoverage": 80,
              "status": "PASSED"
          },
          "clientStatus": {
              "clientSatisfactionRating": 7,
              "sprintNumber": 21
          },

          "teamSpirit": {
            "teamSpiritRating": 7,
            "sprintNumber": 21
        },
          "burndown": {
              "workUnit": "hour",
              "remainingDays": 19,
              "remainingWork": 87,
              "count": 11,
              "burndownStatus": "Behind Time"
          },
          "sprintDetail": {
              "Sprint_current_day": 9,
              "sprint_number": 22,
              "Sprint_days": 28
          },
          "velocity": {
              "Avg": 90,
              "Committed": 112,
              "Completed": 25
          },
          "teamStatus": 1
      },
      
      "teamLinks": [],
      "images": [
          {
              "ImageId": "73eaf00a-f1fe-4573-8cbb-324499c39431",
              "ImagePath": "altrand72e3352-0353-4e5f-8fa3-5a25444f0c62.jpg"
          },
          {
              "ImageId": "b76075b9-744b-46d8-adce-ed94efbdc91d",
              "ImagePath": "manyata_collagedbd58693-3e4a-4e88-9b98-35db5f8b5582.jpg"
          },
          {
              "ImageId": "df6f2d70-cd9e-48dd-8040-e15fe0cd9e4d",
              "ImagePath": "media-handler5eb3609d-b8ab-4c2d-abb0-0d434076c4e9.jpg"
          }
      ],
      "videos": [
          {
              "videoId": "30b230a3-ad4f-4c3b-bfd1-1df1565cca55",
              "videoPath": "Capgemini_GetTheFutureYouWant8dac72f9-be9d-43ef-b94e-4f6fc3a076d6.mp4"
          },
          {
              "videoId": "ced443de-abb9-43e5-8643-a8908bfe3462",
              "videoPath": "Servicesef81820c-6674-42ea-80e1-dc4513bbad52.mp4"
          }
      ],
      "privileges": []
  }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* it('should return data', async() => {
    let result = response;
    service.getTeamDetails("10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d", "46455bf7-ada7-495c-8019-8d7ab76d490e").then((data) =>{
      result = data;
    });
    const req = httpTestingController.expectOne(
      {
      method: "POST",
      url :   'http://localhost:3001/v1/teams/powerboard/team'
      });
    req.flush([response]);
    expect(result).toEqual(response);
  })

it('get team details should throw error for null values', () =>{
  let result;
    service.getTeamDetails(null, null).then((data) =>{
      result = data;
    });
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/powerboard/team");
    req.flush("Not Found",{
      status : 404,
      statusText : "Team Not Found"
    });
})


it('get team details should throw error for incorrect values', () =>{
  let result;
    service.getTeamDetails("22323232", "23232323232").then((data) =>{
      result = data;
    });
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/powerboard/team");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
})
 */

it('get teams in ADCenter should throw error for null values', () =>{
  let result;
    service.getTeamsInADCenter(null).then((data) =>{
      result = data;
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
    });
   httpTestingController.expectOne("http://localhost:3001/v1/teams/center/99055bf7-ada7-495c-8019-8d7ab62d488e");
   
})
});
