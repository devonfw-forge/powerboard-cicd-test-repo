import { Component, OnInit } from '@angular/core';
import { VelocityResponse } from 'src/app/model/general.model';


@Component({
  selector: 'app-velocity-comparsion',
  templateUrl: './velocity-comparsion.component.html',
  styleUrls: ['./velocity-comparsion.component.css']
})
export class VelocityComparsionComponent implements OnInit {
  velocity:VelocityResponse = new VelocityResponse();
  workUnit : string;
  constructor() {
    
   }

 
  ngOnInit(): void {
    this.velocity = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.velocity;
    this.workUnit =  JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.sprintWorkUnit;
    if(this.velocity){
    if(this.velocity.Avg==null){
      this.velocity.Avg= 90;
    }
      }
   
  }
  

}
