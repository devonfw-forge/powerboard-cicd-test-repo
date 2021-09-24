import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { PowerboardLoginResponse } from './login/model/login.model';
import { TeamDetailResponse } from './model/general.model';

describe('AppComponent', () => {
  var teamDetails : TeamDetailResponse;
  var loginTestResponse : PowerboardLoginResponse;

  beforeAll(() => {

    /* teamDetails = new TeamDetailResponse();
    loginTestResponse = new PowerboardLoginResponse();
    teamDetails.powerboardResponse.teamLinks = [{
      teamLinkId: "",
    title: "",
    links: ""
    },
    {
      teamLinkId: "",
    title: "",
    links: ""
    }],
   
    loginTestResponse.loginResponse.ADC_List =[{
      centerId : "",
    centerName : ""
    }, 
   
   
  ];*/


  let loginResponse = {
    "loginResponse": {
        "userId": "10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d",
        "isPasswordChanged": true,
        "My_Center": {
            "centerId": "99055bf7-ada7-495c-8019-8d7ab62d488e",
            "centerName": "ADCenter Bangalore"
        },
        "My_Team": [
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d488e",
                "teamName": " ",
                "myRole": "team_member",
                "teamStatus": 1
            }
        ],
        "Teams_In_ADC": [
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d488e",
                "teamName": " ",
                "teamStatus": 1
            },
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d489e",
                "teamName": ""
            },
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d490e",
                "teamName": "",
                "teamStatus": 1
            }
        ],
        "ADC_List": [
            {
                "centerId": "98655bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Valencia"
            },
            {
                "centerId": "98755bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Mumbai"
            },
            {
                "centerId": "98855bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Poland"
            },
            {
                "centerId": "98955bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Murcia"
            },
            {
                "centerId": "99055bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Bangalore"
            }
        ],
        "privileges": []
    },
   
};

let teamResponse = {
  "powerboardResponse": {
      "team_id": "46455bf7-ada7-495c-8019-8d7ab76d488e",
      "team_name": " ",
      "center": "ADCenter Bangalore",
      "team_code": "10012345",
      "logo": null,
      "dashboard": {
          "teamId": "46455bf7-ada7-495c-8019-8d7ab76d488e",
          "codeQuality": {
              "bugs": 3,
              "debt": 13,
              "codeCoverage": 85,
              "status": "PASSED"
          },
          "clientStatus": {
              "clientSatisfactionRating": 5,
              "sprintNumber": 10
          },
          "teamSpirit": {
              "teamSpiritRating": 7
          },
          "burndown": {
              "workUnit": "story point",
              "remainingDays": 3,
              "remainingWork": 122,
              "count": 107,
              "burndownStatus": "Behind Time"
          },
          "sprintDetail": {
              "Sprint_current_day": 25,
              "sprint_number": 11,
              "Sprint_days": 28
          },
          "velocity": {
              "Avg": 115,
              "Committed": 140,
              "Completed": 18
          },
          "teamStatus": 1
      },
      "meetingLinks": [
          {
              "dailyMeetingId": "43000bf7-ada7-495c-8019-8d7ab76d490e",
              "type": "TEAMS",
              "title": "Stand Up",
              "links": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d"
          }
      ],
      "teamLinks": [
          {
              "teamLinkId": "51055bf7-ada6-495c-8019-8d7ab76d488e",
              "title": "Jira Cloud",
              "links": "https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3"
          },
          {
              "teamLinkId": "51055bf8-ada5-495c-8019-8d7ab76d488e",
              "title": "GitHub",
              "links": "https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/"
          }
      ],
      "images": [
          {
              "ImageId": "aaad19f7-1b66-44aa-a443-4fcdd173f385",
              "ImagePath": "bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg"
          },
          {
              "ImageId": "89cbb47b-5454-440d-a0e8-98b681ed6f83",
              "ImagePath": "Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg"
          },
          {
              "ImageId": "fbf8ea11-62a2-433a-936f-9fddfb90b1c6",
              "ImagePath": "chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg"
          },
          {
              "ImageId": "dc6a6a55-23f9-4edf-90e5-a18c6b07a0be",
              "ImagePath": "dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg"
          },
          {
              "ImageId": "8c4f8d5d-b3b7-4efb-868e-4336474094b3",
              "ImagePath": "france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg"
          }
      ],
      "videos": [
          {
              "videoId": "79b90a96-bd52-4fab-9b8f-e119cf4e66ab",
              "videoPath": "CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4"
          },
          {
              "videoId": "0176b6eb-6336-4efc-9710-edfc4af25a31",
              "videoPath": "CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4"
          }
      ],
      "privileges": [
          "view_meeting_links",
          "view_team_links"
      ]
  }
};
 let currentTeam = {
teamId: "46455bf7-ada7-495c-8019-8d7ab76d488e",
teamName: " ",
teamCode: "10012345",
projectKey : "P1112222",
adCenter: "ADCenter Bangalore"
 }

    
    localStorage.setItem('PowerboardDashboard', JSON.stringify(loginResponse));
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamResponse));
    localStorage.setItem('currentTeam', JSON.stringify(currentTeam));
  });
  


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PowerBoard'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PowerBoard');
  });

  /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('PowerboardFW_new app is running!');
  }); */
});
