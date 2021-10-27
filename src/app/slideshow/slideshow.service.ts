import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../service/general.service';
import {Location} from '@angular/common';
import { ElectronService } from 'ngx-electron';
@Injectable({
  providedIn: 'root'
})
export class SlideshowService {
isSlideshowRunning : boolean;
isElectronRunning: boolean;
slideshowIndex:number;
lastCheckPoint:string;
slideshowArray: string[] = [];
  constructor(private generalService: GeneralService, private router: Router,public location : Location, private electronService: ElectronService) { 
    this.isSlideshowRunning =false;
  this.slideshowIndex = 0;
  this.lastCheckPoint= "/dashboard";

  if (electronService.isElectronApp) {
    // Do electron stuff
    this.isElectronRunning = true;
  } else {
    // Do other web stuff
    this.isElectronRunning = false;
  }

  }

  public getSlideShow():boolean{
 return  this.isSlideshowRunning ;
  }
  public startSlideShow(){
    this.isSlideshowRunning =true;
  }
  public stopSlideShow(){
    this.isSlideshowRunning = false;
    this.router.navigateByUrl(this.lastCheckPoint);
  }

/* public checkValue(){
    console.log(this.isSlideshowRunning);
    if(this.isSlideshowRunning){
      const { BrowserWindow } = require('electron');
const win = new BrowserWindow({ width: 800, height: 600, frame: false });
win.show();
      const win = new BrowserWindow({ width: 800, height: 600, frame: false });
      win.show();
      const win= new BrowserWindow();
      win.maximize();
    }
  } */

  public checkSlideshowArray(){
    this.slideshowIndex = 0;
    this.slideshowArray = [];
    this.slideshowArray.push("/dashboard");
    if(this.generalService.isLinksVisible && this.isElectronRunning){

      this.slideshowArray.push("/links");
    }
    this.slideshowArray.push("/slideshow-multimedia");
    console.log(this.slideshowArray);


    if(this.isSlideshowRunning){
      this.router.navigateByUrl("/slideshow");
    }
  }

  public moveSlideshowNextComponent(){
    if(this.isSlideshowRunning){
    if(this.slideshowIndex == this.slideshowArray.length-1){
      this.slideshowIndex = 0;
    }else{
      this.slideshowIndex = this.slideshowIndex + 1;
    }
    this.router.navigateByUrl(this.slideshowArray[this.slideshowIndex]);
  }
  }

  public moveSlideshowPreviousComponent(){
    if(this.isSlideshowRunning){
    if(this.slideshowIndex == 0){
      this.slideshowIndex = this.slideshowArray.length-1;
    }else{
      this.slideshowIndex = this.slideshowIndex - 1
    }
    this.router.navigateByUrl(this.slideshowArray[this.slideshowIndex]);
  }
  }

  /* public registerCheckPoint(){
    this.lastCheckPoint= this.location.path();
  } */

}
