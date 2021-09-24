import { Component, OnInit } from '@angular/core';
import { VisibilityService } from '../service/visibility.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  constructor( public visibilityService : VisibilityService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['editTeam'], {relativeTo:this.route});
  }
  


  public showMeetingLink(){
    this.visibilityService.hideAll();
    this.visibilityService.ShowMeetingLink();
  }

  public showTeamLink(){
    this.router.navigate(['configure-links'], {relativeTo:this.route});
  }

  public showMultimedia(){
 /*    this.visibilityService.hideAll();
    this.visibilityService.ShowMultimedia(); */
    
    this.router.navigate(['configure-multimedia'], {relativeTo:this.route});
  }

  

  public showViewTeamMember(){
    this.router.navigate(['view-members'], {relativeTo:this.route});
  }

  public changeActive(index:number){
    let list = document.querySelectorAll('.list');
    let j=0;
    while(j<list.length){
      list[j++].className = 'list';
    }
    list[index-1].className = 'list active';
  }

  public showEditTeam(){
    /* this.visibilityService.hideAll();
    this.visibilityService.ShowEditTeam();  */
    this.router.navigate(['editTeam'], {relativeTo:this.route});
  }

}
