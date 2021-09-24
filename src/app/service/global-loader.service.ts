import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoaderService {
isLoading : boolean;
  constructor() {
    this.isLoading = false;
   }
  public startLoader(){
    this.isLoading = true;
  }

  public stopLoader(){
    this.isLoading = false;
  }
  
  public getLoader(): boolean{
    return this.isLoading;
  }
  
}
