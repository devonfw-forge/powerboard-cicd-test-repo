import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { VisibilityService } from '../service/visibility.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(public generalService : GeneralService, public visibilityService : VisibilityService) { }

  ngOnInit(): void {
  }

  public openAddGuest(){
  this.visibilityService.hideAll();
  this.visibilityService.showAddGuestForm();
  }

  public openViewAllGuests(){
    this.visibilityService.hideAll();
    this.visibilityService.displayViewAllGuests();
  }


  public changeActive(index:number){
    let list = document.querySelectorAll('.list');
    let j=0;
    while(j<list.length){
      list[j++].className = 'list';
    }
    list[index-1].className = 'list active';
  }
}
