import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../service/general.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  teamName : string;
  


  constructor( private router : Router, public generalService : GeneralService, private route: ActivatedRoute) {   
  }

  ngOnInit(): void {
    if(this.generalService.showNavBarIcons){
      this.router.navigate(['setup'], {relativeTo:this.route});
    }else{
      this.router.navigate(['team'], {relativeTo:this.route});
    }
  }
}
