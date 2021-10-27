import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigureMultimediaServiceService } from './configure-multimedia-service.service';

describe('ConfigureMultimediaServiceService', () => {
  let service: ConfigureMultimediaServiceService;
  let httpTestingController : HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigureMultimediaServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should throw error for add files to team for null data', () =>{
    let result;
    let file: File = new File([],'sample');
    service.addFilesToTeam(null, file).then((data) =>{
      result = data;
    },
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/uploadFile/null");
    req.flush("internal server error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
   
  })


  it('should throw error for add files to team for empty data',() =>{
    let result;
    let file: File = new File([],'sample');
    
    service.addFilesToTeam('', file).then((data) =>{
      result = data;
    },
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/uploadFile/");
    req.flush("Not Found",{
      status : 404,
      statusText : "Cannot POST /v1/multimedia/uploadFile/"
    });
   
  })



  it('should throw error for add folder to team for null data', () =>{
    let result;

    
    service.addFolderToTeam(null, null).then((data) =>{
      result = data;
    },
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/addFolder/null");
    req.flush("internal server error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
   
  })


  it('should throw error for add folder to team for empty data', () =>{
    let result;

    
    service.addFolderToTeam('', null).then((data) =>{
      result = data;
    },
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/addFolder/");
    req.flush("Not Found",{
      status : 404,
      statusText : "Cannot POST /v1/multimedia/addFolder/"
    });
   
  })




  it('should throw error for add files in sub folder for null data',() =>{
    let result;
    let file: File = new File([],'sample');
    
    service.addFileInSubFolder(null, null, file).then((data) =>{
      result = data;
    },
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/uploadFileToFolder/null/null");
    req.flush("internal server error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
   
  })


  it('should throw error for add files in sub folder for empty data', () =>{
    let result;
    let file: File = new File([],'sample');
    
    service.addFileInSubFolder('','', file).then((data) =>{
      result = data;
    },
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/uploadFileToFolder//");
    req.flush("Not Found",{
      status : 404,
      statusText : "Cannot POST /v1/multimedia/uploadFileToFolder/"
    });
   
  })



  
  it('should throw error for delete files and folders',() =>{
    let result;
    let file: File = new File([],'sample');
    
    service.deleteFilesInSubFolder(null, null).then((data) =>{
      result = data;
    },
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/deleteFilesAndFolders/null");
    req.flush("internal server error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
   
  })


  it('should throw error for add to slideshow for null data',() =>{
    let result;
    service.addToSlideshow(null, null).then((data) =>{
      result = data;
    },
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/addToSlideshow/null");
    req.flush("internal server error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
   
  })


  it('should throw error for add to slideshow for empty data',() =>{
    let result;
    service.addToSlideshow("",null).then((data) =>{
      result = data;
    },
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/addToSlideshow/");
    req.flush("Not Found",{
      status : 404,
      statusText : "Cannot POST /v1/multimedia/addToSlideshow/"
    });
   
  })
});
