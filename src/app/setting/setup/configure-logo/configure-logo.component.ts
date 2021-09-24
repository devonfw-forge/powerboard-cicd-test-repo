import { Component, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { NotificationService } from 'src/app/service/notification.service';
import { SettingService } from '../../service/setting.service';
import { SetupService } from '../service/setup.service';

@Component({
  selector: 'app-configure-logo',
  templateUrl: './configure-logo.component.html',
  styleUrls: ['./configure-logo.component.css']
})
export class ConfigureLogoComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  teamId : string;
  constructor(private settingService : SettingService, private notifyService : NotificationService, private setupService : SetupService) { }

  ngOnInit(): void {
  }


  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }


  public dropped(files: NgxFileDropEntry[]) {
    /* let teamId = this._loginService.getUserStorage().loginResponse.team_id; */
    this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
   
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          try{
            const data = await this.setupService.addLogoToTeam(this.teamId, file);
            this.notifyService.showSuccess("Logo added successfully !!", "");
            console.log(data);
            
          }
          catch(e){
            console.log(e.error.message);
            this.notifyService.showError("", e.error.message);
           
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

}
