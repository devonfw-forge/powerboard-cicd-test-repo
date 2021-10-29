import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { environment } from 'src/environments/environment';
import { HomeResponse, PasswordResetForm, PowerboardLoginResponse } from '../model/login.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
   
  constructor(private http: HttpClient) 
  {

   }

   public async Login(userName: string, password: string): Promise<PowerboardLoginResponse> {
 
    return await this.http
      .post<PowerboardLoginResponse>(
        environment.API_URL + UrlPathConstants.loginEndPoint,
        {
          username: userName,     //'raj11',
          password: password              //'password'

        }
      ).toPromise();
      
  }

  public async resetPassword(resetPassword : PasswordResetForm): Promise<any>{
       return await this.http.put<any>(environment.API_URL + UrlPathConstants.resetPasswordEndPonit, resetPassword).toPromise();
  }

  public async guestLogin(): Promise<HomeResponse> {
    return await this.http
      .post<HomeResponse>(
        environment.API_URL + UrlPathConstants.guestLoginEndPoint,
        {
          username: "guest",  
          password: "guest"              

        }
      ).toPromise();
      
  }

}
