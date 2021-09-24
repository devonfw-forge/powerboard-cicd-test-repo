import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MultimediaModule } from '../multimedia/multimedia.module';
import { LinksModule } from '../links/links.module';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', component: SlideshowComponent }
];

@NgModule({
  declarations: [
    SlideshowComponent
  ],
  imports: [
    CommonModule,
    DashboardModule,
    MultimediaModule,
    LinksModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SlideshowComponent
  ]
})
export class SlideshowModule { }
