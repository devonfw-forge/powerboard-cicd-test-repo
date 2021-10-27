import { Component, OnInit } from '@angular/core';
import { MultimediaFilesNew, MultimediaFolderResponse, rootNew, TeamDetailResponse } from 'src/app/model/general.model';
import { environment } from '../../../../environments/environment';
/* import { NotificationService } from 'src/app/service/notification.service'; */
import { ConfigureMultimediaServiceService } from './configure-multimedia-service.service';
import { DeleteResponse } from '../../model/setting.model';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-configure-multimedia',
  templateUrl: './configure-multimedia.component.html',
  styleUrls: ['./configure-multimedia.component.css'],
})
export class ConfigureMultimediaComponent implements OnInit {
  teamId: string;
  fileAndFolderIds : string[];
  currentFolder: string;
  checkStatus : boolean;
  deleteFiles_Folders : DeleteResponse = new DeleteResponse();
  newSubFolder : rootNew = new rootNew();
  multimedia: MultimediaFolderResponse = new MultimediaFolderResponse();
  multimediaFiles: MultimediaFilesNew[];
  homeFile:rootNew = new rootNew();
  isMasterSel: boolean = false;
  folderAddedInSlideshow: string[] = [];
  filesAddedInSlideshow: string[] = [];
  newFolderName: string = '';
  componentReady: boolean;
  /* multimediagallery: any; */
  tempPath: string;
  teamDetail: TeamDetailResponse = new TeamDetailResponse();
  
  constructor(
    public configureService: ConfigureMultimediaServiceService,
    /* private notifyService: NotificationService, */
    private generalService: GeneralService
  ) {
    this.checkStatus = false;
  }

  ngOnInit(): void {
    this.configureService.viewSubFolder = false;
    this.checkStatus = false;
    this.updateComponent();
  }

  updateComponent() {
    this.homeFile.folderName = 'Home';
    this.homeFile.folderId ='';
    this.homeFile.inSlideShow = false;
    this.homeFile.isSelected = false;
    this.homeFile.status = false;
    
    console.log('update Component');
    this.componentReady = false;
    this.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.multimedia = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.multimedia;
    this.multimediaFiles  = this.multimedia.display;

    this.currentFolder = '';
    for(let folder of this.multimedia.root){
      if(folder.status == true){
        this.currentFolder = folder.folderName;
      }
    }
    if(this.currentFolder == ''){
      this.currentFolder = this.homeFile.folderName;
    }
    if(this.multimediaFiles.length>0){
      this.checkImagesAndVideos();
      this.checkHomeInslideShowStatus();
    } 
  }

  checkImagesAndVideos(){
    if(this.multimediaFiles.length>0){
      for(let file of this.multimediaFiles){
        this.tempPath = file.urlName;
        const isImage = this.isImage(file.urlName);
        if (!isImage) {
          const video_thumbnail = this.tempPath + '#t=5';
          file.urlName = video_thumbnail;
        } else {
          file.urlName = this.tempPath;
        }
      }
    }
  }
  checkHomeInslideShowStatus(){
    if(this.currentFolder == this.homeFile.folderName){
      this.checkStatus = true;
      for(let file of this.multimediaFiles){
        if(!file.inSlideShow){
          this.checkStatus = false;
        }
      }
      if(this.checkStatus){
        this.homeFile.inSlideShow = true;
      }
      else{
        this.homeFile.inSlideShow = false;
      }
      this.checkStatus = false;
    }
  }
  showHomeFiles(){
    this.deselectAll();
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
      this.multimediaFiles = this.multimedia.display;
    }
    this.currentFolder = 'Home';
    if(this.multimediaFiles.length>0){
      this.checkImagesAndVideos();
      this.checkHomeInslideShowStatus();
    }
    
  }

  async getFilesFromFolder(folderId:string,folderName:string){
    this.deselectAll();
    console.log(folderName);
    try{
      const data = await this.generalService.getAllFilesFromFolder(this.teamId, folderId);
      this.multimediaFiles = data;
      this.currentFolder = folderName;
      this.checkImagesAndVideos();
    }
    catch(e){
      console.log(e.error.message);
    }
  }


  isImage(url: string) {
    const images = ['jpg', 'jpeg', 'gif', 'png'];
    const videos = ['mp4', '3gp', 'ogg'];

    const tempextension = url.split(".");
    const  extension = tempextension[tempextension.length-1];
    if (images.includes(extension)) {
      return true;
    } else if (videos.includes(extension)) {
      return false;
    }
  }



  async uploadFile(event) {
     /* console.log(this.multimediagallery); */
     
     try {
      const file = (event.target as HTMLInputElement).files[0];
      if(this.currentFolder == this.homeFile.folderName){
        const data = await this.configureService.addFilesToTeam(this.teamId, file);
        console.log(data);
        let newFile = {
          id: data.id,
          urlName: data.fileName,
          isSelected : false,
          inSlideShow : false,
          isImage : this.isImage(data.fileName)
        };
        /* this.multimediagallery.display[0].push(newFile); */
        this.checkStatus = false;
        for(let folder of this.multimedia.root){
          if(folder.status){
            this.checkStatus = true;
          }
        }
        if(this.checkStatus){
          this.multimedia.display = [];
          for(let folder of this.multimedia.root){
            folder.status = false;
          }
        }
        this.multimedia.display.push(newFile);
        this.multimediaFiles = this.multimedia.display;
        this.checkImagesAndVideos();
        this.checkHomeInslideShowStatus();
        
        this.updateLocalStorage();
      }
      else{
        let folderId = '';
        for(let folder of this.multimedia.root){
          if(folder.folderName == this.currentFolder){
            folderId = folder.folderId;
            break;
          }
        }
        const data = await this.configureService.addFileInSubFolder(folderId, this.teamId,file);
        console.log(data);
        let newFile = {
          id : data.id,
          urlName : data.fileName,
          isSelected : false,
          inSlideShow : false,
          isImage : this.isImage(data.fileName)
        }
        for(let folder of this.multimedia.root){
          if(folder.folderId == folderId){
            if(folder.status){
              this.multimedia.display.push(newFile);
              this.updateLocalStorage();
              this.updateComponent();
            }
            else{
              this.tempPath = newFile.urlName;
              if(newFile.isImage){
                newFile.urlName = this.tempPath;
              } else {
                const video_thumbnail = this.tempPath + '#t=5';
                newFile.urlName = video_thumbnail;
              }
              this.multimediaFiles.push(newFile);
            }
            break;
          }
        }

      }
    
    
      
      this.updateComponent();
     /*  this.notifyService.showSuccess('', 'File Added Successfully'); */
    } catch (e) {
      console.log(e.error.message);
     /*  this.notifyService.showError('', e.error.message); */
    }
  }
  SelectAndDeselectAll(){
    if(this.isMasterSel){
      this.deselectAll()
    }
    else {
      this.selectAll();
    }  
  }
  selectAll(){
    this.isMasterSel = true;
      if(this.currentFolder == this.homeFile.folderName){
        this.homeFile.isSelected = true;
        for(let folder of this.multimedia.root){
          folder.isSelected= true;
        }
        for(let file of this.multimedia.display){
          file.isSelected = true;
        }
      }
      for(let file of this.multimediaFiles){
        file.isSelected = true;
      }
  }
  deselectAll(){
    this.isMasterSel = false;
      this.homeFile.isSelected = false;
      for(let folder of this.multimedia.root){
        folder.isSelected= false;
      }
      for(let file of this.multimedia.display){
        file.isSelected = false;
      }
      for(let file of this.multimediaFiles){
        file.isSelected = false;
      }
  }

  checkRootSelection(i:number){
    if(this.multimedia.root[i].isSelected){
      this.isMasterSel = false;
      this.multimedia.root[i].isSelected = false;
      
    }
    else{
      this.multimedia.root[i].isSelected = true;
      this.checkMasterForRootSelection();
    }
    if(this.currentFolder != this.homeFile.folderName){
      for(let file of this.multimediaFiles){
        file.isSelected = false;
      }
      for(let file of this.multimedia.display){
        file.isSelected = false;
      }
    }
    
  }
  checkMasterForRootSelection(){
    this.checkStatus = true;
      for(let folder of this.multimedia.root){
        if(!folder.isSelected){
          this.checkStatus = false;
        }
      }
      if(!this.homeFile.isSelected){
        this.checkStatus = false;
      }
      if(this.checkStatus){
        this.isMasterSel = true;
      }
      else{
        this.isMasterSel = false;
      }
  }
  checkHomeIsSelected(){
    if(this.homeFile.isSelected){
      this.isMasterSel = false;
      this.homeFile.isSelected = false;
      for(let file of this.multimediaFiles){
        file.isSelected = false;
      }
      for(let file of this.multimedia.display){
        file.isSelected = false;
      }
    }
    else{
      this.homeFile.isSelected = true;
      if(this.currentFolder == this.homeFile.folderName){
        if(this.multimediaFiles.length>0){
          for(let file of this.multimediaFiles){
            file.isSelected = true;
          }
          for(let file of this.multimedia.display){
            file.isSelected = true;
          }
        }
      }
      else{
        for(let file of this.multimediaFiles){
          file.isSelected = false;
        }
      }
      this.checkMasterForRootSelection();
    }
  }
  checkFilesSelection(i:number){
    if(this.currentFolder!== this.homeFile.folderName){
      for(let folder of this.multimedia.root){
        folder.isSelected = false;
      }
      this.homeFile.isSelected = false;
    }
    if(this.multimediaFiles[i].isSelected){
      this.multimediaFiles[i].isSelected = false;
      this.isMasterSel = false;
      if(this.currentFolder == this.homeFile.folderName){
        this.homeFile.isSelected = false;
      }
    }
    else {
      this.multimediaFiles[i].isSelected = true;
      this.homeFile.isSelected = false;
      
      if(this.currentFolder == this.homeFile.folderName){
        this.checkStatus = true;
        for(let file of this.multimediaFiles){
          if(!file.isSelected){
            this.checkStatus = false;
          }
        }
        if(this.checkStatus){
          this.homeFile.isSelected = true;
          for(let folder of this.multimedia.root){
            if(!folder.isSelected){
              this.checkStatus = false;
            }
          }
          if(this.checkStatus){
            this.isMasterSel = true;
          }
          else{
            this.isMasterSel = false;
          }
        }
        else{
          this.homeFile.isSelected = false;
          this.isMasterSel = false;
        }
      }
      else {
        this.checkStatus = true;
        for(let file of this.multimediaFiles){
          if(!file.isSelected){
            this.checkStatus = false;
          }
        }
        if(this.checkStatus){
          this.isMasterSel = true;
        }
        else{
          this.isMasterSel = false;
        }
      }
      
      
    }
  }

  getDeleteIds(){
    this.deleteFiles_Folders.filesId = [];
    this.deleteFiles_Folders.foldersId = [];
    this.deleteFiles_Folders.subFolderId = null;
    if(this.homeFile.isSelected){ //if home is selected
      console.log("if home is selected");
      this.deleteFiles_Folders.filesId = [];
      this.deleteFiles_Folders.foldersId = [];
      this.deleteFiles_Folders.subFolderId = null;

      this.checkStatus = true;
      for(let folder of this.multimedia.root){
        if(folder.isSelected){
          this.deleteFiles_Folders.foldersId.push(folder.folderId);
        }
        if(folder.status){
          this.checkStatus = false;
        }
      }
      if(this.checkStatus){
        if(this.multimedia.display.length>0){
          for(let file of this.multimedia.display){
            this.deleteFiles_Folders.filesId.push(file.id);
            file.isSelected = true;
          }
        }
      }
    }else{ //if home is not selected
      console.log("if home is not selected");
      this.deleteFiles_Folders.filesId = [];
      this.deleteFiles_Folders.foldersId = [];
      this.deleteFiles_Folders.subFolderId = null;

      if(this.currentFolder == this.homeFile.folderName){ // if home is current folder
        console.log("if current folder is home");
        this.deleteFiles_Folders.filesId = [];
        this.deleteFiles_Folders.foldersId = [];
        this.deleteFiles_Folders.subFolderId = null;

        for(let folder of this.multimedia.root){
          if(folder.isSelected){
            this.deleteFiles_Folders.foldersId.push(folder.folderId);
          }
        }
        for(let file of this.multimediaFiles){
          if(file.isSelected){
            this.deleteFiles_Folders.filesId.push(file.id);
          }
        }
      }
      else{ // if home is not selected
        console.log("if home is not current folder");
        this.deleteFiles_Folders.filesId = [];
        this.deleteFiles_Folders.foldersId = [];
        this.deleteFiles_Folders.subFolderId = null;

        this.checkStatus = false;
        for(let folder of this.multimedia.root){
          if(folder.isSelected){
            this.checkStatus = true;
          }
        }
        if(this.checkStatus){
          console.log("if only folders")
          for(let folder of this.multimedia.root){
            if(folder.isSelected){
              this.deleteFiles_Folders.foldersId.push(folder.folderId);
            }
          }
        }
        else{
          console.log("if only files with subfolder Id");
          for(let file of this.multimediaFiles){
            if(file.isSelected){
              this.deleteFiles_Folders.filesId.push(file.id);
            }
            for(let folder of this.multimedia.root){
              if(this.currentFolder == folder.folderName){
                this.deleteFiles_Folders.subFolderId = folder.folderId;
              }
            }
          }
        }
      }
    }

    if(this.deleteFiles_Folders.subFolderId !=null){
      if(this.deleteFiles_Folders.filesId.length<1){
        this.deleteFiles_Folders.subFolderId = null;
      }
    }
    console.log(this.deleteFiles_Folders);
  }

  async deleteFilesAndFolders() {
    this.getDeleteIds();
    try{
      await this.configureService.deleteFilesAndFolders(this.teamId, this.deleteFiles_Folders);
      /* this.notifyService.showSuccess("", "File deleted Successfully"); */
      this.removeIds();
    }
    catch(e){
      console.log(e.error.message);
     /*  this.notifyService.showError("", e.error.message); */
    } 
   
    console.log('delete');
  }
 removeIds(){
  for(let file of this.deleteFiles_Folders.filesId){
    this.multimedia.display = this. multimedia.display.filter(displayFile => displayFile.id!= file);
  }
  for(let file of this.deleteFiles_Folders.filesId){
    this.multimediaFiles = this. multimediaFiles.filter(multifile => multifile.id!= file);
  }
  for(let folder of this.deleteFiles_Folders.foldersId){
    this.multimedia.root = this. multimedia.root.filter(rootFolder => rootFolder.folderId!= folder);
  }
  this.updateLocalStorage();
 }
 updateLocalStorage(){
  this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
  this.teamDetail.powerboardResponse.multimedia = this.multimedia;
  localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetail));
 }
  
  close() {
    this.newFolderName = '';
  }

  async addFolder() {
    try{
      this.newSubFolder = new rootNew();
      const data = await this.configureService.addFolderToTeam(this.teamId, this.newFolderName);
      console.log(data);
      this.newSubFolder.folderId = data.id;
      this.newSubFolder.folderName = data.albumName;
      this.newSubFolder.status = false;
      this.newSubFolder.isSelected = false;
      this.multimedia.root.push(this.newSubFolder);
      this.multimedia.root.sort(function(a, b) {
        return a.folderName.localeCompare(b.folderName);
     });
     this.updateLocalStorage();
     this.newFolderName = '';
     if(this.isMasterSel){
       this.selectAll();
     }
     else{
       this.deselectAll();
     }
    }
    catch(e){
      console.log(e.error.message);
    }
    console.log(this.newFolderName);
  }

  
 async addToSlideShow(){
  this.checkSlideshowFilesAndFolders();
  try{
    const data = await this.configureService.addToSlideshow(this.teamId, this.fileAndFolderIds);
  /*   this.notifyService.showSuccess("", "Files & folders added to slide show successfully"); */
    for(let file of this.multimedia.display){
      if(file.isSelected){
       file.inSlideShow = true;
       file.isSelected = false;
      }
      else{
        file.inSlideShow = false;
      }
    }
    for(let folder of this.multimedia.root){
      if(folder.isSelected){
        folder.inSlideShow = true;
        folder.isSelected = false;
      }
      else{
        folder.inSlideShow = false;
      }
    }
    this.isMasterSel = false;
    this.updateLocalStorage();
  }
  catch(e){
    console.log(e.error.message);
   /*  this.notifyService.showError("", e.error.message); */
  } 
 
}


public checkSlideshowFilesAndFolders(){
  this.fileAndFolderIds = [];
  
  if(this.homeFile.isSelected){
    this.checkStatus = true;
    for(let file of this.multimedia.root){
      if(file.status){
        this.checkStatus = false;
      }
    }
    if(this.checkStatus){
      for(let file of this.multimedia.display){
          this.fileAndFolderIds.push(file.id);
      }
    }
  }
  else{
    if(this.currentFolder === this.homeFile.folderName){
      for(let file of this.multimediaFiles){
        if(file.isSelected){
          this.fileAndFolderIds.push(file.id);
        }
      }
    }
  }
  for(let folder of this.multimedia.root){
    if(folder.isSelected){
      this.fileAndFolderIds.push(folder.folderId);
    }
  }
  console.log(this.fileAndFolderIds);
}
}
