import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { MultimediaFolderResponse, MultimediaFilesNew } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { SlideshowService } from 'src/app/slideshow/slideshow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slideshow-multimedia',
  templateUrl: './slideshow-multimedia.component.html',
  styleUrls: ['./slideshow-multimedia.component.css']
})
export class SlideshowMultimediaComponent implements OnInit {

  currentPath : string;
  currentIndex = 0;
  currentItem: string;
  api: VgApiService;
  thumbnailData: string[];
  //multimediaData: string[];
  thumbnailIsImage: boolean[] = [];
  intervalID: any;
  teamId: string;
  realItem: string;
  currentFolder : string;
  multimedia: MultimediaFolderResponse = new MultimediaFolderResponse();
  /* multimediaFiles: MultimediaFilesNew[]; */
  componentReady: boolean;
  tempPath: string;
  is_image: boolean = true;
  is_video: boolean = false;
  counter: number = 0;
  interval: number = environment.slideshowInterval;
  slideshowFiles : { fileURL : string}[]=[];

  constructor(public slideshowService: SlideshowService, private generalService : GeneralService) { 
    this.thumbnailData = [];
    /* this.multimediaFiles = []; */
    this.slideshowFiles = [];
    this.currentFolder = '';
    this.currentIndex = 0;
    this.currentPath = '';
  }
  async ngOnInit() {
    await this.updateComponent(); 
  }

   async updateComponent() {
     try{
    this.componentReady = false;
    this.currentFolder = '';
    this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
    const data = await this.generalService.getSlideshowFiles(this.teamId);
    this.slideshowFiles = data;
    console.log(this.slideshowFiles);
    this.currentItem = this.slideshowFiles[this.currentIndex].fileURL;
    this.processFiles();
    for(let folder of this.multimedia.root){
      if(folder.status == true){
        this.currentFolder = folder.folderName;
      }
    }
    }
    catch(e){
      console.log(e.error.message);
    }
  } 
  

  

  processFiles(){
  
      for (let file of this.slideshowFiles) {
         this.tempPath = file.fileURL; 
        const isImage = this.isImage(file.fileURL);
        if (isImage && this.slideshowService.isSlideshowRunning) {
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

    if (this.counter != this.thumbnailData.length - 1 && this.slideshowService.isSlideshowRunning) {
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
    }


  }

  automatePlaylist(interval: number) {
    if (this.counter === 0) {
      this.onClickPlaylistItem(this.thumbnailData[this.counter], this.counter);
    }
    else {
      this.intervalID = setInterval(() => this.onClickPlaylistItem(this.thumbnailData[this.counter], this.counter), interval);
    }
  }

  isImage(url: string) {
    const images = ["jpg", "jpeg", "gif", "png"];
    const videos = ["mp4", "3gp", "ogg"];


    const extension = url.split(".")[1]
    console.log(extension);
    if (images.includes(extension)) {
      return true;
    } else if (videos.includes(extension)) {
      return false;
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

}
