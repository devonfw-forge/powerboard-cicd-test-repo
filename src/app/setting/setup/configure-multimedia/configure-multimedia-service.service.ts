import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigureMultimediaServiceService {

  viewSubFolder: boolean= false;
  selectedSubFolderId: string='';
  selectedSubFolderName: string= '';

  constructor(private http: HttpClient) { }

  addFolder(){

  }

  addFileInRoot(){

  }
  

  async addFileInSubFolder(folderId, teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await this.http
    .post<any>('http://localhost:3001/v1/multimedia/uploadFileToFolder/' + folderId + '/' + teamId, formData).toPromise();
  }
  deleteItemsInRoot(){

  }
  
  async deleteFilesInSubFolder(fileIds: string[]):Promise<any>{
    return await this.http.delete<any>(
      'http://localhost:3001/v1/multimedia/deleteFiles/' + fileIds).toPromise();
  }
}
