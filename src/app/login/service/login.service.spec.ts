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
    service.Login("wrongusername", "wrongpassword").then((data) =>{
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
    ).catch(error => {
      result = error;
    });
      let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/change-password");
    req.flush("internal server error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
   
  })

  it('guest login should return data', async() => {
    let result : any;
    service.guestLogin().then((data) =>{
      result = data;
      expect(data).toBeTruthy();
    }).catch(error => {
      result = error;
    })
    const req = httpTestingController.expectOne(
      {
      method: "POST",
      url :   'http://localhost:3001/v1/auth/login/guest'
      });
    req.flush([response]);
    
  })

});
