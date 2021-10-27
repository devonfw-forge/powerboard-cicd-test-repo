import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from '../service/general.service';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'; 
import { MultimediaComponent } from './multimedia.component';


describe('MultimediaComponent', () => {
  let component: MultimediaComponent;
  let fixture: ComponentFixture<MultimediaComponent>;
  let generalService : GeneralService;
  let httpTestingController : HttpTestingController;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientTestingModule],
      declarations: [ MultimediaComponent ],
      providers:[{provide : GeneralService, useValue : generalService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(MultimediaComponent);
    component = fixture.componentInstance;
    generalService = TestBed.inject(GeneralService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should show current folder as home', () =>{
    component.showHomeFiles();
    expect(component.currentFolder).toEqual('Home');
  })

 /*  it('should throw error for null data while getting files from folder', () =>{
    component.getFilesFromFolder(null, null).catch(e => {
      expect(e.error.message).toEqual('Something went wrong, Please try again in some moment');
    })
  }) */

  /* it('should throw error for empty data while getting files from folder', () =>{
    component.getFilesFromFolder("", "").then(data =>{
      expect(data).toBeTruthy();
    }).catch(e => {
      expect(e).toEqual('Cannot GET /v1/auth/home/');
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesInFolder/");
    req.flush("404 Not Found",{
      status : 404,
      statusText : "Cannot GET /v1/auth/home/"
    });
  }) */


  it('should get data while getting files from folder', () =>{
    if(component.multimedia.root.length > 0){
      component.getFilesFromFolder(component.multimedia.root[0].folderId, component.multimedia.root[0].folderName).then(data =>{
        expect(data).toBeTruthy();
        expect(component.currentFolder).toEqual(component.multimedia.root[0].folderName);
      });
    
    }
  })
});
