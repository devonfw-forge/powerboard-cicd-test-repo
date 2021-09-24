import { Component, OnInit } from '@angular/core';
import { Multimedia, TeamDetailResponse } from 'src/app/model/general.model';
import { SetupService } from '../service/setup.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from 'src/app/service/notification.service';
import { Router } from '@angular/router';
import { ConfigureMultimediaServiceService } from './configure-multimedia-service.service';

@Component({
  selector: 'app-configure-multimedia',
  templateUrl: './configure-multimedia.component.html',
  styleUrls: ['./configure-multimedia.component.css'],
})
export class ConfigureMultimediaComponent implements OnInit {
  teamId: string;
  multimedia: any;
  isMasterSel: boolean = false;
  folderAddedInSlideshow: string[] = [];
  filesAddedInSlideshow: string[] = [];
  newFolderName: string = '';
  componentReady: boolean;
  multimediagallery: any;
  tempPath: string;
  teamDetail: TeamDetailResponse = new TeamDetailResponse();
  multimediaPrefix = environment.multimediaPrefix;
  localPrefix = environment.localPrefix;
  multimedia_mock = {
    commonResponse: [
      {
        fileId: 'aaad19f7-1b66-44aa-a443-4fcdd173f391',
        fileName: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
        inSlideshow: false,
      },
      {
        fileId: 'aaad19f7-1b66-44aa-a443-4fcdd173f392',
        fileName: 'cannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
        inSlideshow: true,
      },
    ],
    albumResponse: [
      {
        albumId: 'aaad19f7-1b66-44aa-a443-4fcdd173f390',
        albumName: 'festival',
        inSlideshow: true,
      },
      {
        albumId: 'aaad19f7-1b66-44aa-a443-4fcdd173f391',
        albumName: 'holidays',
        inSlideshow: false,
      },
    ],
  };

  constructor(
    public configureService: ConfigureMultimediaServiceService,
    private route: Router,
    private setupService: SetupService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.updateComponent();
  }

  updateComponent() {
    console.log('update Component');
    this.componentReady = false;
    this.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.multimedia = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.multimedia;

    this.multimedia.folderResponse.map((obj) => {
      obj.isSelected = false;
    });
    this.multimedia.rootResponse.map((obj) => {
      obj.isSelected = false;
    });
    this.multimediagallery = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.multimedia;
    // this.multimediagallery=this.multimedia_mock.commonResponse;
    for (let file of this.multimedia.rootResponse) {
      this.tempPath =
        // environment.multimediaPrefix + this.teamId + '/' + file.fileName;
        /* 'assets/uploads/multimedia/' + this.teamId + '/' + file.fileName; */

        environment.localPrefix + this.teamId + '/' + file.fileName;
      const isImage = this.isImage(file.fileName);

      if (!isImage) {
        const video_thumbnail = this.tempPath + '#t=5';
        file.fileName = video_thumbnail;
      } else {
        file.fileName = this.tempPath;
      }
    }
  }

  isImage(url: string) {
    const images = ['jpg', 'jpeg', 'gif', 'png'];
    const videos = ['mp4', '3gp', 'ogg'];

    const extension = url.split('.')[1];
    console.log(extension);
    if (images.includes(extension)) {
      return true;
    } else if (videos.includes(extension)) {
      return false;
    }
  }

  async uploadFile(event) {
     console.log(this.multimediagallery);
    const file = (event.target as HTMLInputElement).files[0];
    try {
      const data = await this.setupService.addFilesToTeam(this.teamId, file);
      console.log(data);
      let newFile = {
        fileId: data.id,
        fileName: data.fileName,
      };
      this.multimediagallery.rootResponse.push(newFile);
      this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
      this.teamDetail.powerboardResponse.multimedia = this.multimediagallery;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetail)
      );
      this.updateComponent();
      this.notifyService.showSuccess('', 'File Added Successfully');
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  // deleteFile(fileId:string){
  //   try{
  //     this.setupService.deleteFile(this.teamId,fileId);
  //     this.multimedia.rootResponse = this.multimedia.rootResponse.filter(obj => obj.fileId !== fileId);
  //     this.notifyService.showSuccess("", "File deleted Successfully");
  //   }
  //   catch(e){
  //     console.log(e.error.message);
  //     this.notifyService.showError("", e.error.message);
  //   }
  // }

  deleteFile() {
    console.log('delete');
  }

  viewSubFolder(id: string, name:string){
    this.configureService.selectedSubFolderName = name;
   this.configureService.selectedSubFolderId=id;
   this.configureService.viewSubFolder=true;
  }

  addOrRemoveFromFolderList(i: number) {
    this.multimedia.folderResponse[i].isSelected = !this.multimedia
      .folderResponse[i].isSelected;
    if (this.multimedia.folderResponse[i].isSelected) {
      this.folderAddedInSlideshow.push(
        this.multimedia.folderResponse[i].folderId
      );
    } else {
      const index = this.folderAddedInSlideshow.indexOf(
        this.multimedia.folderResponse[i].folderId
      );
      if (index > -1) {
        this.folderAddedInSlideshow.splice(index, 1);
      }
    }
    this.checkMasterSel();
  }
  addOrRemoveFromFileList(i: number) {
    this.multimedia.rootResponse[i].isSelected = !this.multimedia.rootResponse[
      i
    ].isSelected;
    if (this.multimedia.rootResponse[i].isSelected) {
      this.filesAddedInSlideshow.push(this.multimedia.rootResponse[i].fileId);
    } else {
      const index = this.filesAddedInSlideshow.indexOf(
        this.multimedia.rootResponse[i].fileId
      );
      if (index > -1) {
        this.filesAddedInSlideshow.splice(index, 1);
      }
    }
    this.checkMasterSel();
  }
  checkMasterSel() {
    let l1 =
      this.folderAddedInSlideshow.length + this.filesAddedInSlideshow.length;
    let l2 =
      this.multimedia.rootResponse.length +
      this.multimedia.folderResponse.length;
    if (l1 === l2) {
      this.isMasterSel = true;
    } else {
      this.isMasterSel = false;
    }
  }

  close() {
    this.newFolderName = '';
  }

  addFolder() {
    console.log(this.newFolderName);
  }

  checkUncheckAll() {
    this.isMasterSel = !this.isMasterSel;
    this.multimedia.folderResponse.map((obj) => {
      obj.isSelected = this.isMasterSel;
      if (this.isMasterSel) {
        this.folderAddedInSlideshow.indexOf(obj.folderId) === -1
          ? this.folderAddedInSlideshow.push(obj.folderId)
          : console.log('This item already exists');
      }
    });

    this.multimedia.rootResponse.map((obj) => {
      obj.isSelected = this.isMasterSel;
      if (this.isMasterSel) {
        this.filesAddedInSlideshow.indexOf(obj.fileId) === -1
          ? this.filesAddedInSlideshow.push(obj.fileId)
          : console.log('This item already exists');
      }
    });

    if (!this.isMasterSel) {
      this.folderAddedInSlideshow = [];
      this.filesAddedInSlideshow = [];
    }
  }
}
