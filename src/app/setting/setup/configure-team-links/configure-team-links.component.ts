import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { WebviewTag } from 'electron';
import { link } from 'fs';
import { ElectronService } from 'ngx-electron';
import { LinkResponse, TeamDetailResponse } from 'src/app/model/general.model';
import { NotificationService } from 'src/app/service/notification.service';
import { TeamLinksDetails } from '../../model/setting.model';
import { SettingService } from '../../service/setting.service';
import { SetupService } from '../service/setup.service';
import { AddLinksComponent } from './add-links/add-links.component';

@Component({
  selector: 'app-configure-team-links',
  templateUrl: './configure-team-links.component.html',
  styleUrls: ['./configure-team-links.component.css']
})
export class ConfigureTeamLinksComponent implements OnInit {
  src: string;
  public webview: WebviewTag;
  isElectronRunning: boolean;
  url: FormControl;
  usefullLinks: LinkResponse[];
  selectedLinkId:string;
  addedLink : any;
  teamDetail : TeamDetailResponse = new TeamDetailResponse();
  @ViewChild(AddLinksComponent) child;




  constructor( private setupService: SetupService,
    private ref: ChangeDetectorRef, private electronService : ElectronService, private notifyService : NotificationService, private settingService: SettingService) 
    {
      this.usefullLinks=[];
       if (electronService.isElectronApp) {
        // Do electron stuff
        this.isElectronRunning = true;
      } else {
        // Do other web stuff
        this.isElectronRunning = false;
      } 
     }

  ngOnInit(): void {
     this.getLinks();
  }


  public getLinks(){
    
    this.usefullLinks = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.teamLinks;
  
   if(this.usefullLinks.length > 0){
    console.log(this.usefullLinks);
   }
   else{
     this.notifyService.showInfo("" ,"No links are available")
   }
   
  }

  openLink(link: LinkResponse){
    if(link.linkType==='meeting_link'){
      this.openMeetingLink(link.links);
    }
    else if(link.linkType==='web_link'){
      this.openTeamLink(link.links);
    }
  }

  openMeetingLink(meetingLink: string) {
    if (!this.isElectronRunning) {
      window.open(meetingLink, '_blank');
    } else {
      let myWindow =  window.open(meetingLink, '_system');
      setTimeout(() => {
        myWindow.close();
    }, 5000);
    }
  }

  openTeamLink(link: string) {
    console.log(link);
    if (!this.isElectronRunning) {
      let myWindow = window.open(link, "myWindow", "width=1000,height=1000");
    }
    else {
      this.src = link;
      this.webview.setAttribute('src', link);
      this.ref.detectChanges();
    }
  }

  saveSeletedLink(id: string){
    this.selectedLinkId=id; 
  }

  async deleteLink(){
    try{
      console.log(this.selectedLinkId);
      const data = await this.setupService.deleteLink(this.selectedLinkId);
      this.notifyService.showSuccess("Team Link deleted successfully !!", "")
      console.log(data);
    /*   this.settingService.getTeamDetails(); */
        /* for(let link of this.settingService.teamDetails.powerboardResponse.teamLinks){
          if(link.teamLinkId == this.selectedLinkId){
            this.settingService.teamDetails.powerboardResponse.teamLinks = this.settingService.teamDetails.powerboardResponse.teamLinks.filter(item => item !== link);
          }
        }
        this.settingService.setTeamDetails();
        this.getLinks(); */
       this.usefullLinks = this.usefullLinks.filter(link => link.teamLinkId != this.selectedLinkId);
        this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
        this.teamDetail.powerboardResponse.teamLinks = this.usefullLinks;
        localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetail));
    }
    catch(e){
      console.log(e.error.message);
      this.notifyService.showError("", e.error.message);
     
    }
  }

   async addLink(){
   
    const data = await this.child.onSubmit();
   
    this.addedLink = {
      linkName : data.linkName,
      teamLinkId : data.id,
      linkType : data.linkType.title,
      links : data.link

      
    }
    
    this.usefullLinks.push(this.addedLink);
    console.log(this.usefullLinks);
    this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
    this.teamDetail.powerboardResponse.teamLinks = this.usefullLinks;
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetail));
    
  }

  close(){
    this.child.selectedLinkType="select Type";
    this.child.memberGroup.reset();
  }

}
