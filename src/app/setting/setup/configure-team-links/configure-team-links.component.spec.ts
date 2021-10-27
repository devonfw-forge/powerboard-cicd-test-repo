import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { url } from 'inspector';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { LinkResponse } from 'src/app/model/general.model';
import { NotificationService } from 'src/app/service/notification.service';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'
import { ConfigureTeamLinksComponent } from './configure-team-links.component';
import { LinkTypeFilterPipe } from './pipes/link-type-filter.pipe';
import { ShortUrlPipe } from './pipes/short-url.pipe';


describe('ConfigureTeamLinksComponent', () => {
  let component: ConfigureTeamLinksComponent;
  let fixture: ComponentFixture<ConfigureTeamLinksComponent>;
  let notificationService : NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, NgxElectronModule, ReactiveFormsModule],
      declarations: [ ConfigureTeamLinksComponent,ShortUrlPipe,LinkTypeFilterPipe ],
      providers : [{provide : NotificationService, useValue : notificationService}, ElectronService, ChangeDetectorRef]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(ConfigureTeamLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get links', ()=>{
    component.getLinks();
    expect(component.usefullLinks).toBeTruthy();
  })

/*   it('should open link for a web link', () =>{
    let link : LinkResponse = {
      teamLinkId: "51055bf8-ada5-495c-8019-8d7ab76d488e",
      linkName: "testing",
      linkType: "web_link",
      links: "www.testingweb.com"
    }
  
    component.openLink(link);
    expect(link.linkType).toEqual("web_link");
  
    
  }) */


 /*  it('should open link for a meeting link', () =>{
    let link : LinkResponse = {
      teamLinkId: "51055bf8-ada5-495c-8019-8d7ab76d488e",
      linkName: "testing",
      linkType: "meeting_link",
      links: "www.testingMeeting.com"
    }
  
    component.openLink(link);
    expect(link.linkType).toEqual("meeting_link");
   
    
  }) */

  it('should check save selected link', () =>{
    component.saveSeletedLink("104");
    expect(component.selectedLinkId).toEqual("104");
  })

  it('should add and delete Link', () =>{
    component.addLink().then(() =>{
      component.saveSeletedLink(component.addedLink.teamLinkId);
      component.deleteLink();
      expect(component.addedLink).toBeTruthy();
    })
  })
 

  it('should not delete for null ids', () =>{
    component.saveSeletedLink(null);
   /*  const spy = spyOn(component.notifyService, 'showError'); */
    component.deleteLink().catch(e =>{
      expect(e).toBeTruthy();
    })
   /*  expect(spy).toHaveBeenCalled(); */
  })
});
