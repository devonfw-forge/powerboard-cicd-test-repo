import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ClientSatisfactionComponent } from './client-satisfaction/client-satisfaction.component';
import { CodeQualityComponent } from './code-quality/code-quality.component';
import { TeamSpiritComponent } from './team-spirit/team-spirit.component';
import { BurndownComponent } from './burndown/burndown.component';
import { VelocityComparsionComponent } from './velocity-comparsion/velocity-comparsion.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { BurndownResponse, ClientStatusResponse, CodeQualityResponse, Dashboard, PowerboardResponse, SprintDetailResponse, TeamSpiritResponse, VelocityResponse } from '../model/general.model';
import { RouterModule, Routes } from '@angular/router';
/* import { NgxEchartsModule } from 'ngx-echarts/lib/ngx-echarts.module'; */


const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ClientSatisfactionComponent,
    CodeQualityComponent,
    TeamSpiritComponent,
    BurndownComponent,
    VelocityComparsionComponent
  ],
  imports: [
    CommonModule,
     NgxEchartsModule,
     RouterModule.forChild(routes)


  ],
  exports:[
    DashboardComponent
    
  ],
  providers:[Dashboard, CodeQualityResponse, ClientStatusResponse,TeamSpiritResponse, BurndownResponse, VelocityResponse, SprintDetailResponse ]
})
export class DashboardModule { }
