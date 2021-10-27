import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/service/general.service';
import { TeamDetailsService } from '../service/team-details.service';
import checkData from 'src/app/checkData.json'; 
import { MyProjectsComponent } from './my-projects.component';
import { SlideshowService } from 'src/app/slideshow/slideshow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElectronService } from 'ngx-electron';
class MockRouter{
  navigateByUrl(url : string){
    return url ;
  }
}
describe('MyProjectsComponent', () => {
  let component: MyProjectsComponent;
  
  let fixture: ComponentFixture<MyProjectsComponent>;


  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      
      imports :[RouterTestingModule, HttpClientTestingModule],
      declarations: [ MyProjectsComponent ],
      providers : [TeamDetailsService,GeneralService, SlideshowService, ElectronService]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(MyProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 /*  it('get team details should throw error on passing team Id as null',() =>{
    component.getTeamDetails(null).then((data) =>{

    }).catch((e) => {
      expect(e.error.message).toEqual('Team Not Found');
    })
  }) */

  it('get team details should run',() =>{
    let generalService = TestBed.inject(GeneralService)
    component.getTeamDetails('46455bf7-ada7-495c-8019-8d7ab76d488e').then((data) => {
      expect(generalService.showNavBarIcons).toEqual(true);
    })
  })
});
