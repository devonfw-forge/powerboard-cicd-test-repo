import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { SetupService } from './setup.service';

describe('SetupService', () => {
  let service: SetupService;
  let httpTestingController : HttpTestingController;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule]
      
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add logo should get error for null', () =>{
    let result;
    let file: File = new File([],'sample');
    service.addLogoToTeam(null,file).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/uploadLogo/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });


  it('delete logo should get error for null value', () =>{
    let result;
    service.deleteLogo(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/deleteLogo/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });

  it('delete logo should get error for empty value', () =>{
    let result;
    service.deleteLogo("").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/deleteLogo/");
    req.flush("400 Bad Request",{
      status : 400,
      statusText : "Invalid param id. Number expected"
    });
  });

  it('update team should get error for empty team id', () =>{
    let result;
    service.updateTeam(null,"").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/team/update/");
    req.flush("404 Not Found",{
      status : 404,
      statusText : "Cannot PUT /v1/teams/team/update/"
    });
  });

  it('update team should get error for null value', () =>{
    let result;
    service.updateTeam(null,null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/team/update/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });



  it('delete link should get error for empty value', () =>{
    let result;
    service.deleteLink("").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/team-links/delete/");
    req.flush("400 Bad Request",{
      status : 400,
      statusText : "Invalid param id. Number expected"
    });
  });


  it('delete link should get error for null value', () =>{
    let result;
    service.deleteLink(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/team-links/delete/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });


  it('get links types should return data', () =>{
    let result;
    service.getLinkTypes().then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/team-links/getLinksCategory");
  });

  it('add link should get error for null value', () =>{
    let result;
    service.addLink(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/team-links/teamId/create");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });






  /* it('add team links should get error for null', () => {
    let result;
    service.addTeamLinks(null).then((data) => {
      result = data;
    });
    let req = httpTestingController.expectOne(
      'http://localhost:3001/v1/team-links/teamId/create'
    );
    req.flush('Internal Server Error', {
      status: 500,
      statusText: 'Something went wrong, Please try again in some moment',
    });
  }); */

 /*  it('add meeting links should get error for null', () => {
    let result;
    service
      .addMeetingLink(null)
      .then((data) => {
        result = data;
      })
      .catch((error) => {
        result = error;
      });
    let req = httpTestingController.expectOne(
      'http://localhost:3001/v1/daily-meeting/teamId/create'
    );
    req.flush('Internal Server Error', {
      status: 500,
      statusText: 'Something went wrong, Please try again in some moment',
    });
  }); */

  /* it('add Image should get error for null', ()=>{​​​​​​​​
let result;
let file : File ;
service.addImageToTeam(null, file).then((data) =>{​​​​​​​​
result = data;
    }​​​​​​​​).catch((error)=>{​​​​​​​​
result = error;
    }​​​​​​​​);
let req = httpTestingController.expectOne("http://localhost:3001/v1/images/uploadImage/");
req.flush("Not Found",{​​​​​​​​
status :404,
statusText :"Cannot POST /v1/images/uploadImage"
    }​​​​​​​​);
  }​​​​​​​​); */

  /* it('update team should get error for null', () => {
    let result;
    service
      .updateTeam(null)
      .then((data) => {
        result = data;
      })
      .catch((error) => {
        result = error;
      });
    let req = httpTestingController.expectOne(
      'http://localhost:3001/v1/admin/team/update'
    );
    req.flush('Not Found', {
      status: 404,
      statusText: 'Team Not Found',
    });
  });
 */
 /*  it('should add and delete team Links', async () => {
    let result;
    let teamLink: TeamLinksDetails = {
      title: 'google',
      links: 'www.google.com',
      teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
    };
    service
      .addTeamLinks(teamLink)
      .then((data) => {
        result = data;
        let req = httpTestingController.expectOne(
          'http://localhost:3001/v1/team-links/teamId/create'
        );
        service
          .deleteTeamLink(result.id)
          .then((deleteData) => {
            httpTestingController.expectOne(
              'http://localhost:3001/v1/team-links/delete/' + result.id
            );
          })
          .catch((error) => {
            result = error;
          });
      })
      .catch((error) => {
        result = error;
      });
  }); */

  /* it('should add and delete meeting Links', async () => {
    let result;
    let meetingLink: DailyMeetingLinksDetails = {
      title: 'google',
      type: 'TEAMS',
      links: 'www.google.com',
      teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
    };
    service
      .addMeetingLink(meetingLink)
      .then((data) => {
        result = data;
        let req = httpTestingController.expectOne(
          'http://localhost:3001/v1/daily-meeting/teamId/create'
        );
        service
          .deleteMeetingLink(result.id)
          .then((deleteData) => {
            httpTestingController.expectOne(
              'http://localhost:3001/v1/daily-meeting/delete/' + result.id
            );
          })
          .catch((error) => {
            result = error;
          });
      })
      .catch((error) => {
        result = error;
      });
  });
 */


/* it('add image should get error for null', () => {
  let result;
  let file: File = {
    name: 'random',
    size: 10,
    path: '',
    type: '',
    lastModified: 12,
    arrayBuffer: null,
    slice: null,
    stream: null,
    text: null,
  };
  service
    .addImageToTeam(null, file)
    .then((data) => {
      result = data;
      let req = httpTestingController.expectOne(
        'http://localhost:3001/v1/images/uploadImage/'
      );
    })
    .catch((error) => {
      result = error;
      let req = httpTestingController.expectOne(
        'http://localhost:3001/v1/images/uploadImage/'
      );
    });
}); */

/* it('add logo should get error for null', () => {
  let result;
  let file: File = {
    name: 'random',
    size: 10,
    path: '',
    type: '',
    lastModified: 12,
    arrayBuffer: null,
    slice: null,
    stream: null,
    text: null,
  };
  service
    .addLogoToTeam(null, file)
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      result = error;
    });
    let req = httpTestingController.expectOne(
      'http://localhost:3001/v1/teams/uploadLogo/null'
    );
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
}); */



/* it('add video should get error for null', () => {
  let result;
  let file: File = {
    name: 'random',
    size: 10,
    path: '',
    type: '',
    lastModified: 12,
    arrayBuffer: null,
    slice: null,
    stream: null,
    text: null,
  };
  service
    .addVideosToTeam(null, file)
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      result = error;
      console.log(error);
    });
    let req = httpTestingController.expectOne(
      'http://localhost:3001/v1/videos/uploadVideo/null'
    );
    req.flush("404 Not Found",{
      status : 404,
      statusText : "Cannot POST /v1/videos/uploadVideo/null"
    }); 

}); */

  
});
