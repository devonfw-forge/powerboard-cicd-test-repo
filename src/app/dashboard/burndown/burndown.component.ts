import { Component, OnInit } from '@angular/core';
import { BurndownResponse } from 'src/app/model/general.model';


@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css']
})
export class BurndownComponent implements OnInit {
  burnDown: BurndownResponse = new BurndownResponse();
  unit: string;
  constructor() {
   }
  
  

  ngOnInit(): void {
    
    this.burnDown = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.burndown; 
    
   
   if (this.burnDown?.remainingWork > 1) {
     this.unit = this.burnDown.workUnit + 's';
   } else {
     this.unit = this.burnDown?.workUnit;
   }
    
  }

  ngAfterViewInit() {
    
    
  
  }

}
