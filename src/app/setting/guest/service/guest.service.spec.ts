import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GuestInfo } from '../../model/setting.model';

import { GuestService } from './guest.service';

describe('GuestService', () => {
  let service: GuestService;
  let httpTestingController : HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      
    })
    .compileComponents();
  });


  beforeEach(() => {
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

it('should throw bad request for null values', async () => {
  let result;
service.addGuest(null).then((data) => {
result = data;
});
let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/add-guest");
    req.flush("Bad Request",{
      status : 400,
      statusText : "User is not guest, Try diffrent method to register diffrent users"
    });
})


it('should throw internal server error', async () => {
  let result;
  let guest : GuestInfo = {
    "username": null,
    "email": null,
    "role":"558f1dfd-43e9-4cc4-8257-a6ba5c70e34d"
  }
service.addGuest(guest).then((data) => {
result = data;
});
let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/add-guest");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
})
 
it('should view all the guests', () =>{
  let viewData;
service.getAllGuests().then((data) => {
viewData = data;
expect(data).toEqual(viewData);
})
})


 it('should add and delete Guest', async () =>{
  let result;
  let guest : GuestInfo = {
    "username": "sampletest1",
    "email": "test1@gsample.com",
    "role":"558f1dfd-43e9-4cc4-8257-a6ba5c70e34d"
  }
service.addGuest(guest).then((data) => {
result = data;
let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/add-guest");
service.deleteGuest(result.id).then((deleteData) => {

httpTestingController.expectOne("http://localhost:3001/v1/admin/delete/guest/" + result.id);
}
).catch(error => {
  result = error;
})
}).catch(error => {
  result = error;
})

}) 
});
