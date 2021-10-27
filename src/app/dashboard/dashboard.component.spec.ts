import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from 'ngx-electron';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'; 
import { SlideshowService } from '../slideshow/slideshow.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
 
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientModule],
      declarations: [ DashboardComponent ],
      providers:[SlideshowService, ElectronService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should check is slideshow running',() =>{
    let slideshowService = TestBed.inject(SlideshowService);
    slideshowService.isSlideshowRunning = true;
    expect(component.intervalID).toBeTruthy();
  }) */
});
