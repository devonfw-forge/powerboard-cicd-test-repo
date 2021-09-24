import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { GuestDetails } from '../../model/setting.model';
import { SettingService } from '../../service/setting.service';
import { GuestService } from '../service/guest.service';

@Component({
  selector: 'app-view-all-guests',
  templateUrl: './view-all-guests.component.html',
  styleUrls: ['./view-all-guests.component.css']
})
export class ViewAllGuestsComponent implements OnInit {
   guests : GuestDetails[] = [];
   deleteId: string;
  constructor(public settingService : SettingService, private notifyService : NotificationService, private guestService : GuestService) { }

  ngOnInit(): void {
    this.viewAllGuests();
  }


  async viewAllGuests(){
    try{
      const data = await this.guestService.getAllGuests();

      this.guests = data;
      
    }
    catch(e){
      console.log(e);
      
    }
 }

 public storeDeleteId(guestId : string){
  this.deleteId = guestId;
}
public hideModel(){
  document.getElementById('id01').style.display='none';
}

public openModel(){
  document.getElementById('id01').style.display='block';
}

 async deleteGuest(){
  try{
    const data = await this.guestService.deleteGuest(this.deleteId);
    this.notifyService.showSuccess("Guest deleted successfully !!", "")
    console.log(data);
   
    await this.viewAllGuests();
   
  }
  catch(e){
    this.notifyService.showError("", e.error.message);
    console.log(e.error.message);
    
  }
  
 }
 
 snackBar(msg : string) {
  var x = document.getElementById("snackbar");
  x.style.backgroundColor = "#333";
  x.className = "show";
  x.innerHTML = msg;
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


errorSnackBar(msg : string) {
  var x = document.getElementById("snackbar");
  x.style.backgroundColor = "red";
  x.innerHTML = msg;
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
}
