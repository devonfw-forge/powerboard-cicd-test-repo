import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADCListDetails } from 'src/app/project-display/my-projects/model/team.model';
import { GeneralService } from 'src/app/service/general.service';
import { TeamInfo, TeamsResponse, UpdateTeam } from '../../model/setting.model';
import { SettingService } from '../../service/setting.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {


  constructor( public generalService : GeneralService, private router : Router) {
   }

  ngOnInit(): void {
this.router.navigateByUrl('/setting');
  
}



}
