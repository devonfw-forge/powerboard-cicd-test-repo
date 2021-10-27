import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamDetails } from 'src/app/login/model/login.model';

import { TeamDetailResponse } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { SlideshowService } from 'src/app/slideshow/slideshow.service';
import { GetTeamDetails } from '../model/pbResponse.model';

import { TeamDetailsService } from '../service/team-details.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css'],
})
export class MyProjectsComponent implements OnInit {
  myTeams: TeamDetails[] = [];

  constructor(
    private teamDetailsService: TeamDetailsService,
    public generalService: GeneralService,
    public slideShowService: SlideshowService
  ) {}

  ngOnInit(): void {
    this.myTeams = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.homeResponse.My_Team;
    console.log(this.myTeams);
  }

  async getTeamDetails(teamId: string) {
    try {
      await this.teamDetailsService.processTeamDetails(teamId);
    } catch (e) {
      console.log(e.error.message);
    }
  }
}
