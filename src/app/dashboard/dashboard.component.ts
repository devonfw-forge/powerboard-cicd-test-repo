import { Component, OnInit } from '@angular/core';
import { SprintDetailResponse } from '../model/general.model';
import { SlideshowService } from '../slideshow/slideshow.service';

import { UrlPathConstants } from '../UrlPaths';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sprintDetails: SprintDetailResponse = new SprintDetailResponse();
  teamStatus: number;
  intervalID: any; 
  interval= UrlPathConstants.slideshowInterval;
  constructor(public slideshowService: SlideshowService) { }

  ngOnInit(): void {
    this.sprintDetails = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.sprintDetail;
    this.teamStatus = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.teamStatus;
 
  }
  ngAfterViewInit(){
    if(this.slideshowService.isSlideshowRunning){
     this.intervalID = setTimeout(()=>{
        if(this.slideshowService.isSlideshowRunning){
          this.slideshowService.moveSlideshowNextComponent();
        }
      },this.interval);
    }
   
  }
  ngOnDestroy() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

}
