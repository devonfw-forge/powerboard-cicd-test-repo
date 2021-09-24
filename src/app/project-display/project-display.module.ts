import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectDisplayComponent } from '../project-display/project-display.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: ProjectDisplayComponent }
];

@NgModule({
  declarations: [
    ProjectsComponent,
    MyProjectsComponent,
    ProjectDisplayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports:[
    MyProjectsComponent,
    ProjectDisplayComponent,
    ProjectsComponent
  ]
})
export class ProjectDisplayModule { }
