
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { MultimediaFilesNew, MultimediaFolderResponse } from 'src/app/model/general.model';
import { environment } from 'src/environments/environment';
import { GeneralService } from '../service/general.service';
import { UrlPathConstants } from '../UrlPaths';




@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})
export class MultimediaComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
/*   currentPath : string; */
  currentIndex = 0;
  currentItem: string;
  api: VgApiService;
  thumbnailData: string[];
  checkStatus :  boolean;
  //multimediaData: string[];
  thumbnailIsImage: boolean[] = [];
  intervalID: any;
  teamId: string;
  realItem: string;
  currentFolder : string;
  multimedia: MultimediaFolderResponse = new MultimediaFolderResponse();
  multimediaFiles: MultimediaFilesNew[];
  componentReady: boolean;
  tempPath: string;
  is_image: boolean = true;
  is_video: boolean = false;
  counter: number = 0;
 
  interval: number = UrlPathConstants.slideshowInterval;

  constructor(private generalService : GeneralService) { 
    this.thumbnailData = [];
    this.multimediaFiles = [];
    this.currentFolder = '';
    this.currentIndex = 0;
    this.multimedia = new MultimediaFolderResponse();
    /* this.currentPath = ''; */
  
  }
  async ngOnInit() {
    await this.updateComponent(); 
  }

   updateComponent() {
    this.componentReady = false;
    this.currentFolder = '';
    this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
    this.multimedia = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.multimedia;
    this.multimediaFiles  = this.multimedia.display;
    this.currentItem = this.multimediaFiles[this.currentIndex].urlName;
   
    for(let folder of this.multimedia.root){
      if(folder.status == true){
        this.currentFolder = folder.folderName;
      }
    }
    if(this.currentFolder == ''){
      this.currentFolder = 'Home';
    }
    this.processFiles();
   
  } 
  showHomeFiles(){
    this.multimediaFiles = [];
    this.checkStatus = false;
    for(let folder of this.multimedia.root){
      if(folder.status){
       this.checkStatus = true;
      }
    }
    if(this.checkStatus){
      this.multimediaFiles  = [];
    }
    else{
      this.multimediaFiles  = [];
      this.multimediaFiles = this.multimedia.display;
    }
    this.currentFolder = 'Home';
    if(this.multimediaFiles.length > 0){
      this.processFiles();
    }
    
  }
  async getFilesFromFolder(folderId:string,folderName:string){
    
    console.log(folderName);
    try{
      const data = await this.generalService.getAllFilesFromFolder(this.teamId, folderId);
      this.multimediaFiles = data;
      this.currentFolder = folderName;
      this.thumbnailData = [];
      this.thumbnailIsImage = [];
      this.currentIndex = 0;
      this.currentItem = this.multimediaFiles[this.currentIndex].urlName;
      this.processFiles();
  
    }
    catch(e){
      console.log(e.error.message);
    }
  }

  

  processFiles(){
  this.thumbnailData = [];
  this.thumbnailIsImage = [];
      for (let file of this.multimediaFiles) {
         this.tempPath = file.urlName; 
        const isImage = this.isImage(file.urlName);
        if (!isImage) {
          const video_thumbnail = this.tempPath + '#t=5';
          this.thumbnailData.push(video_thumbnail);
          this.thumbnailIsImage.push(isImage);
        }
        else {
          this.thumbnailData.push(this.tempPath);
          this.thumbnailIsImage.push(isImage);
        }
      }
    this.onClickPlaylistItem(this.thumbnailData[0], 0);
  }


  onClickPlaylistItem(item: string, index: number) {

    if (this.thumbnailIsImage[index]) {
      this.is_video = false;

      this.is_image = true;
      this.realItem = this.thumbnailData[index];

    }
    else {
      this.is_video = true;
      this.is_image = false;
      this.realItem = this.thumbnailData[index].split('#')[0];
    }

    this.currentIndex = index;
    this.currentItem = item;

    /* if (this.counter != this.thumbnailData.length - 1 && this.slideshowService.isSlideshowRunning) {
      console.log(this.counter + "-> on click before +1");
      this.counter = this.counter + 1;
      console.log(this.counter + "-> on click after +1");
      if (this.counter === 1) {
        this.automatePlaylist(this.interval);
      }

    }
    else if (this.counter === this.thumbnailData.length - 1 && this.slideshowService.isSlideshowRunning) {
      console.log("automate done");

      clearInterval(this.intervalID);
      setTimeout(() => {
        if (this.slideshowService.isSlideshowRunning) {
          this.slideshowService.moveSlideshowNextComponent();
        }
      }, this.interval);
    } */


  }

  /* automatePlaylist(interval: number) {
    if (this.counter === 0) {
      this.onClickPlaylistItem(this.thumbnailData[this.counter], this.counter);
    }
    else {
      this.intervalID = setInterval(() => this.onClickPlaylistItem(this.thumbnailData[this.counter], this.counter), interval);
    }
  } */

  isImage(url: string) {
    const images = ["jpg", "jpeg", "gif", "png"];
    const videos = ["mp4", "3gp", "ogg"];


    const tempextension = url.split(".");
    const  extension = tempextension[tempextension.length-1];
    if (images.includes(extension)) {
      return true;
    } else if (videos.includes(extension)) {
      return false;
    }
  }

  onPlayerReady(api: VgApiService) {
    console.log("api value");
    console.log(api);
    this.api = api;

    if (this.componentReady) {
      this.api.volume = 0;
    }


  }

  onTap() {
    if (this.api.state === 'playing') {
      this.api.pause();

    } else {
      this.api.play();
    }
  }

  toggleFullScreen() {
    this.api.fsAPI.toggleFullscreen();
  }

  previousItem() {
    console.log("previous");
    this.counter = this.counter - 1;
    console.log(this.counter + "-> previous");
    this.onClickPlaylistItem(this.thumbnailData[this.currentIndex - 1], this.currentIndex - 1);

  }
  nextItem() {
    console.log("Next");
    this.counter = this.counter + 1;
    console.log(this.counter + "-> next");
    this.onClickPlaylistItem(this.thumbnailData[this.currentIndex + 1], this.currentIndex + 1);
  }

  ngOnDestroy() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }





  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }

  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += 150;
  }


  async seeAll(){
    try{
      const data = await this.generalService.getAllFilesFromTeam(this.teamId);
      this.multimediaFiles = data;
      this.currentFolder = "seeAll";
      this.thumbnailData = [];
      this.thumbnailIsImage = [];
      this.currentIndex = 0;
      this.currentItem = this.multimediaFiles[this.currentIndex].urlName;
      this.processFiles();
  
    }
    catch(e){
      console.log(e.error.message);
    }
  }

}
