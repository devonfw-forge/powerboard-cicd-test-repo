import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkResponse, LinksCategory } from 'src/app/model/general.model';
import { ConfigureTeamSpirit, DailyMeetingLinksDetails, TeamLinksDetails, UpdateTeam } from '../../model/setting.model';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private http: HttpClient) { }



 

  async addVideosToTeam(teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await this.http
    .post<any>('http://localhost:3001/v1/videos/uploadVideo/' + teamId, formData).toPromise();
  }

  async addLogoToTeam(teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await this.http
    .post<any>('http://localhost:3001/v1/teams/uploadLogo/' + teamId, formData).toPromise();
  }


  async deleteLogo(teamId:string):Promise<any>{
    return await this.http.delete<any>(
      'http://localhost:3001/v1/teams/deleteLogo/' + teamId).toPromise();
  }



  
  async sendDetailsTeamSpirit(teamSpiritDetails :ConfigureTeamSpirit ):Promise<any>{
    return await this.http.put<any>(
      'http://localhost:3001/v1/team-spirit/updateTeam/' + teamSpiritDetails.Name, teamSpiritDetails).toPromise();
  }

  async updateTeam(formData: UpdateTeam, teamId : string):Promise<any>{
    return await this.http.put<any>(
      'http://localhost:3001/v1/teams/team/update/'+ teamId, formData ).toPromise();
  }


  
  async deleteLink(teamLinkId:string):Promise<any>{
    return await this.http.delete<any>(
      'http://localhost:3001/v1/team-links/delete/' + teamLinkId).toPromise();
  }

  async getLinkTypes(): Promise<any>{
    return await this.http.get<any>('http://localhost:3001/v1/team-links/getLinksCategory').toPromise();
  }


   async deleteFile(teamId:string, imageId : string):Promise<LinksCategory[]>{
    return await this.http.delete<LinksCategory[]>(
      'http://localhost:3001/v1/multimedia/deleteFile/' + teamId+'/'+imageId).toPromise();
  }

  async deleteVideos(videoId : string):Promise<any>{
    return await this.http.delete<any>(
      'http://localhost:3001/v1/videos/delete/' + videoId).toPromise();
  }

  async addLink(addLinkForm: LinksCategory){
    return await this.http.post('http://localhost:3001/v1/team-links/teamId/create', addLinkForm).toPromise();
  }


}
