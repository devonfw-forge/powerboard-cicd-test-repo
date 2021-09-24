import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
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
        'http://localhost:3001/v1/auth/login',
        {
          username: userName,     //'raj11',
          password: password              //'password'

        }
      ).toPromise();
      
  }

  public async resetPassword(resetPassword : PasswordResetForm): Promise<any>{
       return await this.http.put<any>('http://localhost:3001/v1/auth/change-password', resetPassword).toPromise();
  }

  public async guestLogin(): Promise<HomeResponse> {
    return await this.http
      .post<HomeResponse>(
        'http://localhost:3001/v1/auth/login/guest',
        {
          username: "guest",  
          password: "guest"              

        }
      ).toPromise();
      
  }

}
