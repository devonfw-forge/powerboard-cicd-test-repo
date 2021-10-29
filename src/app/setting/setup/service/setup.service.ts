import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkResponse, LinksCategory } from 'src/app/model/general.model';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { environment } from 'src/environments/environment';
import { ConfigureTeamSpirit, DailyMeetingLinksDetails, TeamLinksDetails, UpdateTeam } from '../../model/setting.model';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private http: HttpClient) { }



 
  async addLogoToTeam(teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('logo', file, file.name);
    return await this.http
    .post<any>(environment.API_URL + UrlPathConstants.uploadLogoEndPoint + teamId, formData).toPromise();
  }


  async deleteLogo(teamId:string):Promise<any>{
    return await this.http.delete<any>(
      environment.API_URL + UrlPathConstants.deleteLogoEndPoint + teamId).toPromise();
  }


  async updateTeam(formData: UpdateTeam, teamId : string):Promise<any>{
    return await this.http.put<any>(
      environment.API_URL + UrlPathConstants.updateTeamEndPoint+ teamId, formData ).toPromise();
  }


  
  async deleteLink(teamLinkId:string):Promise<any>{
    return await this.http.delete<any>(
      environment.API_URL + UrlPathConstants.deleteLinkEndPoint + teamLinkId).toPromise();
  }

  async getLinkTypes(): Promise<any>{
    return await this.http.get<any>(environment.API_URL + UrlPathConstants.getLinksCategoryEndPoint).toPromise();
  }



  async addLink(addLinkForm: LinksCategory){
    return await this.http.post(environment.API_URL + UrlPathConstants.addLinkEndPoint, addLinkForm).toPromise();
  }


}
