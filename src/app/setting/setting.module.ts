import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from '../setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SetupComponent } from './setup/setup.component';
import { ConfigureTeamLinksComponent } from './setup/configure-team-links/configure-team-links.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxElectronModule } from 'ngx-electron';
import { TeamComponent } from './team/team.component';

import { RouterModule, Routes } from '@angular/router';
import { ViewAllTeamsComponent } from './team/view-all-teams/view-all-teams.component';


import { EditTeamComponent } from './setup/edit-team/edit-team.component';
import { RemoveUnderscorePipe } from './model/setting.model';
import { ShortUrlPipe } from './setup/configure-team-links/pipes/short-url.pipe';
import { LinkTypeFilterPipe } from './setup/configure-team-links/pipes/link-type-filter.pipe';
import { AddLinksComponent } from './setup/configure-team-links/add-links/add-links.component';
import { AddTeamComponent } from './team/view-all-teams/add-team/add-team.component';
import { ADcenterFilterPipe } from './team/view-all-teams/pipes/adcenter-filter.pipe';
import { ConfigureMultimediaComponent } from './setup/configure-multimedia/configure-multimedia.component';
import { ViewAllTeamMembersComponent } from './setup/view-all-team-members/view-all-team-members.component';
import { AddMemberComponent } from './setup/view-all-team-members/add-member/add-member.component';
import { EditTeamMemberComponent } from './setup/view-all-team-members/edit-team-member/edit-team-member.component';
import { ViewTeamComponent } from './team/view-team/view-team.component';

const routes: Routes = [{
  path: '',
  component: SettingComponent,
  children: [
    {
      path: 'team', component: TeamComponent,
      children: [
        { path: '', redirectTo: 'viewAllTeams', pathMatch: 'full' },
        { path: 'viewAllTeams', component: ViewAllTeamsComponent },
      ]
    },
    {
      path: 'setup', component: SetupComponent,
      children: [
        { path: '', redirectTo: 'editTeam', pathMatch: 'full' },
        { path: 'editTeam', component: EditTeamComponent },
        {
          path: 'configure-multimedia', component: ConfigureMultimediaComponent,

        },

        { path: 'configure-links', component: ConfigureTeamLinksComponent },
        { path: 'view-members', component: ViewAllTeamMembersComponent },
      ]
    }
  ]
},]



@NgModule({
  declarations: [
    SettingComponent,
    SetupComponent,

    ConfigureTeamLinksComponent,
    TeamComponent,
    AddTeamComponent,
    ViewAllTeamsComponent,
    ViewAllTeamMembersComponent,
    ViewTeamComponent,
    EditTeamComponent,
    RemoveUnderscorePipe,
    AddMemberComponent,
    ShortUrlPipe,
    LinkTypeFilterPipe,
    AddLinksComponent,
    ADcenterFilterPipe,
    ConfigureMultimediaComponent,
    EditTeamMemberComponent,


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxElectronModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    SettingComponent,
    ShortUrlPipe
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SettingModule { }
