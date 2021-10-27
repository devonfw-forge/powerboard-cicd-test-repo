import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from '../service/general.service';
import checkData from 'src/app/checkData.json'; 
import { ProjectDisplayComponent } from './project-display.component';
import { TeamDetailsService } from './service/team-details.service';

describe('ProjectDisplayComponent', () => {
  let component: ProjectDisplayComponent;
  let fixture: ComponentFixture<ProjectDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDisplayComponent ],
      imports :[RouterTestingModule, HttpClientModule],
      providers : [TeamDetailsService, GeneralService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(ProjectDisplayComponent);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


