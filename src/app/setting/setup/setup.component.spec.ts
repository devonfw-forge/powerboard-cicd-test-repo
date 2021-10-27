import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
 
import { SetupComponent } from './setup.component';
 
describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  let route: ActivatedRoute; 
  /* let router = {
    navigate: jasmine.createSpy('navigate')
  } */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ SetupComponent ],
      providers: []
    })
    .compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  /* it('should show team link',() =>{
    component.showTeamLink();
    expect(router.navigate).toHaveBeenCalledWith('configure-links');
  }) */


  it('should change active',() =>{
    component.changeActive(1);
  
  })
});