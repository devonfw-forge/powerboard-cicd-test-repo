import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SlideshowModule } from './slideshow/slideshow.module';
import { MultimediaModule } from './multimedia/multimedia.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProjectDisplayModule } from './project-display/project-display.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxElectronModule } from 'ngx-electron';
import { SettingModule } from './setting/setting.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ToastrModule } from 'ngx-toastr';
import { LinksModule } from './links/links.module';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [


    BrowserModule,
    AppRoutingModule,
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    SlideshowModule,
    FormsModule,
    MultimediaModule,
    DashboardModule,
    LinksModule,
    ProjectDisplayModule,
    SettingModule,
 
    NgxFileDropModule,
    ToastrModule.forRoot({ timeOut: 3000, progressBar: true }),
    NgxElectronModule,

    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
