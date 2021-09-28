import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import {​​​​​​​​VgControlsModule}​​​​​​​​ from'@videogular/ngx-videogular/controls';
import {​​​​​​​​VgBufferingModule}​​​​​​​​ from'@videogular/ngx-videogular/buffering';

import { MultimediaComponent } from './multimedia.component';
import { RouterModule, Routes } from '@angular/router';
import { SlideshowMultimediaComponent } from './slideshow-multimedia/slideshow-multimedia.component';




const routes: Routes = [
  { path: '', component: MultimediaComponent }
];

@NgModule({
  declarations: [

    MultimediaComponent,
      SlideshowMultimediaComponent
  ],
  imports: [
    CommonModule,

    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    RouterModule.forChild(routes)

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class MultimediaModule { }
