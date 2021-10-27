import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { MultimediaFolderResponse, MultimediaFilesNew, SlideshowFiles } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { SlideshowService } from 'src/app/slideshow/slideshow.service';
import { UrlPathConstants } from 'src/app/UrlPaths';


@Component({
  selector: 'app-slideshow-multimedia',
  templateUrl: './slideshow-multimedia.component.html',
  styleUrls: ['./slideshow-multimedia.component.css']
})
export class SlideshowMultimediaComponent implements OnInit {
  
  currentItem: string;
  teamId : string;
  intervalID: any;  
  componentReady: boolean;
  currentIndex: number = 0;
  interval: number = UrlPathConstants.slideshowInterval;
  slideshowFiles : SlideshowFiles[]=[];
  slideshowTempFiles : SlideshowFiles[]=[];
  api: VgApiService;
  is_image : boolean;
  is_video : boolean

  constructor(public slideshowService: SlideshowService, private generalService : GeneralService,  private changeDetector: ChangeDetectorRef) { 
    this.slideshowFiles = [];
    this.slideshowTempFiles = [];
    this.currentIndex = 0;
    this.is_image = false;
    this.is_video = false;
  }
  async ngOnInit() {
    await this.updateComponent(); 
  }

   async updateComponent() {
     try{
    this.componentReady = false;
    this.slideshowTempFiles = [];
    this.slideshowFiles = [];
    this.currentIndex = 0;
    this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
    const data = await this.generalService.getSlideshowFiles(this.teamId);
    this.slideshowTempFiles = data;
    if(this.slideshowTempFiles.length > 0){
     /*  this.slideshowFiles = this.slideshowFiles.filter(file =>this.isImage(file.fileURL) == true); */
    for(let file of this.slideshowTempFiles){
      if(this.isImage(file.fileURL)){
        this.slideshowFiles.push(file);
      }
    }
    for(let file of this.slideshowTempFiles){
      if(!this.isImage(file.fileURL)){
        this.slideshowFiles.push(file);
      }
    }
     console.log(this.slideshowFiles);
     this.slideshowControl();
    /* this.currentItem = this.slideshowFiles[this.counter].fileURL;
    this.counter++;
    this.automateSlideshow(); */
    }
    else{
      this.slideshowService.moveSlideshowNextComponent();
    }
    /* this.currentItem = this.slideshowFiles[this.currentIndex].fileURL; */
    /* this.processFiles(); */
    /* for(let folder of this.multimedia.root){
      if(folder.status == true){
        this.currentFolder = folder.folderName;
      }
    } */
    }
    catch(e){
      console.log(e);
    }
  } 
  
  isImage(url: string) {
    const images = ["jpg", "jpeg", "gif", "png"];
    const videos = ["mp4", "3gp", "ogg"];


    const tempextension = url.split(".");
    const  extension = tempextension[tempextension.length-1];
    console.log(extension);
    if (images.includes(extension)) {
      return true;
    } else if (videos.includes(extension)) {
      return false;
    }
  }

  ngOnDestroy() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  public slideshowControl(){
    if(this.isImage(this.slideshowFiles[this.currentIndex].fileURL)){
      this.is_image = true;
      this.is_video = false;
      
      this.currentItem = this.slideshowFiles[this.currentIndex].fileURL;
      this.currentIndex++;
      if(this.currentIndex >= this.slideshowFiles.length){
        console.log("reached end");
        setTimeout(()=>{
          console.log("move to next component");
          if (this.slideshowService.isSlideshowRunning) {
            this.slideshowService.moveSlideshowNextComponent();
          }
        },this.interval);

      }
      else{
        setTimeout(this.slideshowControl.bind(this), this.interval);
      }
      
    }
    else{
      this.is_image = false;
      this.is_video = true;
      if(this.currentIndex <= this.slideshowFiles.length){
        this.currentItem = this.slideshowFiles[this.currentIndex].fileURL;
      }
      else{
        if (this.slideshowService.isSlideshowRunning) {
          this.slideshowService.moveSlideshowNextComponent();
        }
      }
     /*  if (this.api) {
        if(this.api.state === 'playing'){
          setTimeout(this.slideshowControl.bind(this), this.interval);
        }
        
      }
      else{
        this.currentItem = this.slideshowFiles[this.currentIndex].fileURL;
        this.currentIndex++;
        setTimeout(this.slideshowControl.bind(this), this.interval);
      } */
    }
  }


  //videos to slideshow
  /* onPlayerReady(api: VgApiService) {
    console.log("api value");
    console.log(api);
    this.api = api;

    if (this.componentReady) {
      this.api.volume = 0;
    }


  } */




  onPlayerReady(api: VgApiService) {
    this.api = api;

    if (this.componentReady) {
      this.api.volume = 0;
    }

    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe({
      next: this.playVideo.bind(this),
      error: (reason) => {
        console.error('Error while loading video metadata?');
        // console.log(reason);
      }
    });
    this.api.getDefaultMedia().subscriptions.ended.subscribe({
      next: this.nextVideo.bind(this),
      error: (reason) => {
        console.error('Error when loaded video metadata?');
        // console.log(reason);
      }
    });
  }



  nextVideo() {
    this.currentIndex++;
    if (this.currentIndex === this.slideshowFiles.length) {
      if (this.slideshowService.isSlideshowRunning) {
        this.slideshowService.moveSlideshowNextComponent();
      }
    }
    else{
      this.currentItem = this.slideshowFiles[this.currentIndex].fileURL;
    }
    this.changeDetector.detectChanges();
  }

  playVideo() {
    this.api.play();
  }

  onTap() {
    if (this.api.state === 'playing') {
      this.api.pause();

    } else {
      this.api.play();
    }
  }

}
