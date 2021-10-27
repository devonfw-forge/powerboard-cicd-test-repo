import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  constructor(  private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['editTeam'], {relativeTo:this.route});
  }
  
  public showTeamLink(){
    this.router.navigate(['configure-links'], {relativeTo:this.route});
  }

  public showMultimedia(){
    
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
    this.router.navigate(['editTeam'], {relativeTo:this.route});
  }

}
