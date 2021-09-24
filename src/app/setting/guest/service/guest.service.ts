import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestDetails, GuestInfo } from '../../model/setting.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http: HttpClient) { }

  async addGuest(addGuest: GuestInfo):Promise<any>{
    return await this.http.post<any>(
      'http://localhost:3001/v1/auth/add-guest', addGuest).toPromise();
  }

  async getAllGuests():Promise<GuestDetails[]>{
    return await this.http.get<GuestDetails[]>(
      'http://localhost:3001/v1/admin/viewAllGuests' ).toPromise();
  }

  async deleteGuest(guestId : string):Promise<any>{

    const requestOptions: Object = {
      
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   }
    return await this.http.delete<any>(
      'http://localhost:3001/v1/admin/delete/guest/' + guestId, requestOptions).toPromise();
  }

}
