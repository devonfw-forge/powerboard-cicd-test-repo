import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ADCListDetails } from 'src/app/project-display/my-projects/model/team.model';
import { NotificationService } from 'src/app/service/notification.service';
import { TeamInfo } from 'src/app/setting/model/setting.model';
import { SettingService } from 'src/app/setting/service/setting.service';
import { TeamService } from '../../service/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  private authError: boolean;
  centerId :string;
  team:TeamInfo = new TeamInfo();
  ADCList: ADCListDetails[] = [];
  centerName : string = 'Select Center';

  form: FormGroup;

  constructor(private settingService : SettingService, private notifyService : NotificationService, private teamService : TeamService,public fb: FormBuilder) {
    this.form = this.fb.group({
      teamName: ['',  [Validators.required]],
      projectKey: ['',  [Validators.required]],
      teamCode: ['',  [Validators.required]],
      logo: [null],
      ad_center: ['',  [Validators.required]]
    });
   }

  ngOnInit(): void {

    this.ADCList = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.ADC_List;
  }

  async addTeam(addTeamForm : NgForm){
     
  
   this.team.ad_center.id = this.centerId; 
   
    console.log(this.team);
   try{
    const data = await this.teamService.addTeam(this.team);
    this.notifyService.showSuccess("Team added successfully", "");
    addTeamForm.reset();
    console.log(data);
    
  }
  catch(e){
    console.log(e.error.message);
    this.notifyService.showError("", e.error.message);
   
  }   
   }


   keyPressed() {
    this.authError = false;
  }
  
  getAuthError() {
    return this.authError;
  }

  public updateCenter(centerId , centerName){
    this.centerName = centerName;
    this.team.ad_center.id = centerId;
  this.centerId = centerId;
  this.form.controls['ad_center'].setValue(centerId);
  }


  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      logo: file,
    });
    this.form.get('logo').updateValueAndValidity();
 
    var image = <HTMLImageElement>document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
  }

  async addTeamWithLogo() {
    var formData: any = new FormData();
    formData.append('teamName', this.form.get('teamName').value);
    formData.append('projectKey', this.form.get('projectKey').value);
    formData.append('ad_center', this.form.get('ad_center').value);
    formData.append('teamCode', this.form.get('teamCode').value);
    formData.append('logo', this.form.get('logo').value);
    try {
      const data = await this.teamService.addTeamWithLogo(
        formData
      );
      console.log(data);
      var image = <HTMLImageElement>document.getElementById('output');
      image.src = "../../../../../assets/layoutAssets/logo/uploadLogo.PNG";
      this.form.reset();
      return data;
    } catch (e) {
      console.log(e);
    }
  }





  
}
