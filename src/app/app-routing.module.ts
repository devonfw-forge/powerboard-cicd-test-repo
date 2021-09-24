import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { ViewTeamComponent } from './setting/team/view-team/view-team.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'projects', loadChildren: () => import('./project-display/project-display.module').then(m => m.ProjectDisplayModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'links', loadChildren: () => import('./links/links.module').then(m => m.LinksModule) },
  { path: 'multimedia', loadChildren: () => import('./multimedia/multimedia.module').then(m => m.MultimediaModule)},
  { path: 'slideshow', loadChildren: () => import('./slideshow/slideshow.module').then(m => m.SlideshowModule)},

  {path:'setting', loadChildren: () => import('./setting/setting.module').then(m=> m.SettingModule)},

  { path: 'viewTeam', component: ViewTeamComponent },


  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), NgxEchartsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
