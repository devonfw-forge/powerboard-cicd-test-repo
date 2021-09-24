import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamInfo, TeamMemberDetails } from '../../model/setting.model';

import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;
  let httpTestingController : HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      
    })
    .compileComponents();
  });


  beforeEach(() => {
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('add team member should throw internal server error', async () => {
    let result;
    let teamMember : TeamMemberDetails = {
      "email": null,
      "username": null,
      "role":"558f1dfd-43e9-4cc4-8257-a6ba5c70e34d",
      "team": {
        "id": "46455bf7-ada7-495c-8019-8d7ab76d488e"
        }

    }
  service.addTeamMember(teamMember).then((data) => {
  result = data;
  }).catch(error => {
    result = error;
  });
  let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/register");
      req.flush("Internal Server Error",{
        status : 500,
        statusText : "Something went wrong, Please try again in some moment"
      });
  }) 




/* 
   it('should view all team members', () =>{
    let viewData;
  service.viewTeamMembersOfTeam().then((data) => {
  viewData = data;
  expect(data).toEqual(viewData);
  })
  })  */


  it('view all team members should throw error for null ', async () => {
    let result;
  service.viewTeamMembersOfTeam(null).then((data) => {
  result = data;
  }).catch(error => {
    result = error;
  });
  let req = httpTestingController.expectOne("http://localhost:3001/v1/admin/viewAllMemberOfTeam/null" );
      req.flush("Internal Server Error",{
        status : 500,
        statusText : "Something went wrong, Please try again in some moment"
      });
  }) 



  it('change team member role should get error for null', ()=>{
    let result;
    service.updateAccessRole(null).then((data) =>{
      result = data;
    }).catch((error)=>{
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3001/v1/admin/update/userRole");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });

  it('should add and delete team member', async () =>{
    let result;
    let teamMember : TeamMemberDetails = {
      "email": "test@gmail.com",
      "username": "test",
      "role":"558f1dfd-43e9-4cc4-8257-a6ba5c70e34d",
      "team": {
        "id": "46455bf7-ada7-495c-8019-8d7ab76d488e"
        }
      
    }
  service.addTeamMember(teamMember).then((data) => {
  result = data;
  let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/register");
  service.deleteTeamMember(result.id).then((deleteData) => {
  
  httpTestingController.expectOne("http://localhost:3001/v1/admin/delete/userTeam/" + result.id);
  }
  ).catch(error => {
    result = error;
  })
  }).catch(error => {
    result = error;
  })
  })


  it('add team should throw internal server error', async () => {
    let result;
    let team : TeamInfo = 
    {
      "teamName": null,
      "teamCode": null,
      "projectKey": null,
      "ad_center":{
      "id":"98955bf7-ada7-495c-8019-8d7ab62d488e"
      },
      "member_number": null,
      "frequency": null,
      "start_date": null
      }
  service.addTeam(team).then((data) => {
  result = data;
  }).catch(error => {
    result = error;
  });
  let req = httpTestingController.expectOne("http://localhost:3001/v1/admin/team/addTeam");
      req.flush("Internal Server Error",{
        status : 500,
        statusText : "Something went wrong, Please try again in some moment"
      });
  }) 


it('should view all the teams', () => {
  let viewTeam;
  service.viewAllTeams().then((data) => {
    viewTeam = data;
    expect(data).toEqual(viewTeam);
  })
})

});
