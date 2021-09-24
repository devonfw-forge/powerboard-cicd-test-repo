import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxElectronModule } from 'ngx-electron';
import { LinksComponent } from './links.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LinksComponent }
];

@NgModule({
  declarations: [

    LinksComponent
  ],
  imports: [
    CommonModule,
    NgxElectronModule,
    RouterModule.forChild(routes) 
  ],
  exports:[
    LinksComponent
  ],
schemas:[NO_ERRORS_SCHEMA]
})
export class LinksModule { }
