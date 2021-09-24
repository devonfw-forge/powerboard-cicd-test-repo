import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { constants } from 'buffer';
import { PasswordResetForm, PowerboardLoginResponse } from '../model/login.model';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController : HttpTestingController;
  let response : PowerboardLoginResponse;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
    response = {
      "loginResponse": {
          "userId": "10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d",
          "isPasswordChanged": true,
          "My_Center": {
              "centerId": "99055bf7-ada7-495c-8019-8d7ab62d488e",
              "centerName": "ADCenter Bangalore"
          },
          "My_Team": [
              {
                  "teamId": "46455bf7-ada7-495c-8019-8d7ab76d488e",
                  "teamName": "",
                  "myRole": "team_member",
                  "teamStatus": 1
              }
          ],
          "Teams_In_ADC": [
              {
                  "teamId": "46455bf7-ada7-495c-8019-8d7ab76d488e",
                  "teamName": " ",
                  "teamStatus": 1
              },
              {
                  "teamId": "46455bf7-ada7-495c-8019-8d7ab76d489e",
                  "teamName": ""
              },
              {
                  "teamId": "46455bf7-ada7-495c-8019-8d7ab76d490e",
                  "teamName": "",
                  "teamStatus": 1
              }
          ],
          "ADC_List": [
              {
                  "centerId": "98655bf7-ada7-495c-8019-8d7ab62d488e",
                  "centerName": "ADCenter Valencia"
              },
              {
                  "centerId": "98755bf7-ada7-495c-8019-8d7ab62d488e",
                  "centerName": "ADCenter Mumbai"
              },
              {
                  "centerId": "98855bf7-ada7-495c-8019-8d7ab62d488e",
                  "centerName": "ADCenter Poland"
              },
              {
                  "centerId": "98955bf7-ada7-495c-8019-8d7ab62d488e",
                  "centerName": "ADCenter Murcia"
              },
              {
                  "centerId": "99055bf7-ada7-495c-8019-8d7ab62d488e",
                  "centerName": "ADCenter Bangalore"
              }
          ],
          "privileges": []
      },
     
  };
  });
 
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', async() => {
    let result = response;
    service.Login("raj11", "password").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    const req = httpTestingController.expectOne(
      {
      method: "POST",
      url :   'http://localhost:3001/v1/auth/login'
      });
    req.flush([response]);
    expect(result).toEqual(response);
  })

  it('login should throw erorr for null data', () =>{
    let result = response;
    service.Login(null, null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/login");
    req.flush("Unauthorized",{
      status : 401,
      statusText : "Wrong username or password, Please try again"
    });
  })

  it('login should throw erorr for incorrect data', () =>{
    let result = response;
    service.Login("qwerty", "wrongpassword").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/login");
    req.flush("Unauthorized",{
      status : 401,
      statusText : "Wrong username or password, Please try again"
    });
  })


  it('reset password should throw error', async() =>{
    let result;
    let resetpasswordForm : PasswordResetForm = {
      userId : "incorrectdata",
      oldPassword : "wrongpassword",
      newPassword : "invaliddatda"
    }
    
    service.resetPassword(resetpasswordForm).then((data) =>{
      result = data;
    },
    );
      let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/change-password");
    req.flush("internal server error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
   
  })
});
