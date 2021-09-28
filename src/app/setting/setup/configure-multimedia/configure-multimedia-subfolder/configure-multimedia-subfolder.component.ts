import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultimediaFilesNew, rootNew } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import { DeleteResponse } from 'src/app/setting/model/setting.model';

import { ConfigureMultimediaServiceService } from '../configure-multimedia-service.service';

@Component({
  selector: 'app-configure-multimedia-subfolder',
  templateUrl: './configure-multimedia-subfolder.component.html',
  styleUrls: ['./configure-multimedia-subfolder.component.css']
})
export class ConfigureMultimediaSubfolderComponent implements OnInit {
  teamId: string;

  folderId : string;
  selectAll : boolean;
  thumbnailData: string[];
  tempPath: string;
 /*  multimediaFiles: MultimediaFilesNew[]; */
  thumbnailIsImage: boolean[] = [];
  checkedFileIds : string[];
  deleteFilesFromsubFolder : DeleteResponse = new DeleteResponse();
  multimediaSubFolderFiles : MultimediaFilesNew[];
  constructor(public configureService: ConfigureMultimediaServiceService, private notifyService : NotificationService, private generalService: GeneralService) { 
    this.checkedFileIds = [];
    this.selectAll = false;
    this.multimediaSubFolderFiles = [];
  }

  ngOnInit(): void {
    
    this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
    this.getFilesFromFolder();
  }

  

  back(){
    this.configureService.viewSubFolder=false;
  }

  async uploadFile(event) {
    this.folderId = this.configureService.selectedSubFolderId;
    const file = (event.target as HTMLInputElement).files[0];
    try{
     const data = await this.configureService.addFileInSubFolder(this.folderId, this.teamId,file);
     console.log(data);
     let newFile = {
       id : data.id,
       urlName : data.fileName,
       isSelected : false,
       isImage : this.isImage(data.fileName)
     }
     this.multimediaSubFolderFiles.push(newFile);
     this.notifyService.showSuccess("","File Added Successfully");
    }
    catch(e){
      console.log(e.error.message);
      this.notifyService.showError("", e.error.message);
    }
  }
    public itemsChecked(e,id){
      if(e.target.checked){
        this.addTOCheckedArray(id);
      }
      else{
        document.getElementsByName('checkAll')[0].removeAttribute('checked');
        this.removeFromCheckedArray(id);
      }
      console.log(this.checkedFileIds);
    }
 public addTOCheckedArray(id){
  this.checkedFileIds.push(id);
 }
 public removeFromCheckedArray(id){
  this.checkedFileIds = this.checkedFileIds.filter(Fileid => Fileid !== id );
 }

 public deleteCheckedFiles(){
   this.checkDeleteArray();
  try{
    this.configureService.deleteFilesInSubFolder(this.teamId, this.deleteFilesFromsubFolder);
    this.notifyService.showSuccess("", "File deleted Successfully");
    this.removeIds();
  }
  catch(e){
    console.log(e.error.message);
    this.notifyService.showError("", e.error.message);
  } 
 
 }

 removeIds(){
  for(let file of this.deleteFilesFromsubFolder.filesId){
    this.multimediaSubFolderFiles = this.multimediaSubFolderFiles.filter(subFile => subFile.id!= file);
  }
 }
public  selectAllItems(){
  if(!this.selectAll){
    this.selectAll = true;
    for(let file of this.multimediaSubFolderFiles){
      file.isSelected = true;
    }

  }
  else{
    this.selectAll = false;
    for(let file of this.multimediaSubFolderFiles){
      file.isSelected = false;
    }
  }
  
}

public checkDeleteArray(){
  this.deleteFilesFromsubFolder = new DeleteResponse();
  this.deleteFilesFromsubFolder.foldersId = null;
  this.deleteFilesFromsubFolder.subFolderId = this.configureService.selectedSubFolderId;
  this.deleteFilesFromsubFolder.filesId = [];
 
  for(let file of this.multimediaSubFolderFiles){
    if(file.isSelected == true){
      this.deleteFilesFromsubFolder.filesId.push(file.id);
    }
  }
  console.log(this.deleteFilesFromsubFolder);
}

public printArray(index : number){
  if(this.multimediaSubFolderFiles[index].isSelected){
    this.multimediaSubFolderFiles[index].isSelected = false;
  }
  else{
    this.multimediaSubFolderFiles[index].isSelected = true;
  }
  let count  = 0;
  for(let file of this.multimediaSubFolderFiles){
    if(file.isSelected){
      count++;
    }
  }
  if(count == this.multimediaSubFolderFiles.length){
    this.selectAll = true;
  }
  else{
    this.selectAll = false;
  }
console.log(this.multimediaSubFolderFiles);
}


async getFilesFromFolder(){
    
  try{
    const data = await this.generalService.getAllFilesFromFolder(this.teamId, this.configureService.selectedSubFolderId);
    this.multimediaSubFolderFiles = data;
    this.processFiles();

  }
  catch(e){
    console.log(e.error.message);
  }
}

processFiles(){
  for(let file of this.multimediaSubFolderFiles){
    file.isSelected = false;
    if(this.isImage(file.urlName)){
      file.isImage = true;
    }
    else{
      file.isImage = false;
      file.urlName = file.urlName + '#t=5';
    }
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
}
