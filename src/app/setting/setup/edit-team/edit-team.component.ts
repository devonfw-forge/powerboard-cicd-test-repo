import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamDetailResponse } from 'src/app/model/general.model';
import { ADCListDetails } from 'src/app/project-display/my-projects/model/team.model';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';
import { TeamsResponse, UpdateTeam } from '../../model/setting.model';
import { SettingService } from '../../service/setting.service';
import { SetupService } from '../service/setup.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent implements OnInit {
  isLogo: boolean;
  spinner: boolean;
  teamDetail : TeamDetailResponse = new TeamDetailResponse();
  team: TeamsResponse = new TeamsResponse();
  ADCList: ADCListDetails[] = [];
  updateTeam: UpdateTeam = new UpdateTeam();
  logo: string;
  
  newLogoPath : string;
  
  editLogoPath : string;
  form: FormGroup;
  constructor(
    public generalService: GeneralService,
    private setupService: SetupService,
    private notifyService : NotificationService,
    public fb: FormBuilder
  ) {
    this.isLogo = false;
   
  
    this.form = this.fb.group({
      teamName: [''],
      projectKey: [''],
      teamCode: ['']
    });
    this.spinner = false;
  }

  ngOnInit(): void {
    this.team.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.team.teamName = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_name;
    this.team.teamCode = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_code;
    this.team.projectKey = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.project_key;
    this.team.adCenter = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.center;
    this.logo = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.logo;
    if (this.logo) {
      this.isLogo = true;
    
      this.editLogoPath =  this.logo;
    } else {
      this.isLogo = false;
    
    }
if(JSON.parse(
  localStorage.getItem('PowerboardDashboard')
).loginResponse.homeResponse){

  this.ADCList = JSON.parse(
    localStorage.getItem('PowerboardDashboard')
  ).loginResponse.homeResponse.ADC_List;
  console.log(this.ADCList);
}

    this.form.controls['teamName'].setValue(this.team.teamName);
    this.form.controls['teamCode'].setValue(this.team.teamCode);
    this.form.controls['projectKey'].setValue(this.team.projectKey);
  }
  public changeADCenter(centerName: string) {
    this.team.adCenter = centerName;
  }


  async setDeleteLogo() {
    
    try{
    await this.setupService.deleteLogo(this.team.teamId);
    this.isLogo = false; 
    this.notifyService.showSuccess("", "Logo Deleted Successfully");
    }
    catch(e){
      console.log(e.error.message);
      this.notifyService.showError("", e.error.message);
    }
   
  }

  async uploadFile(event){
    const file = (event.target as HTMLInputElement).files[0];
    try{
      this.spinner = true;
     const data = await this.setupService.addLogoToTeam(this.team.teamId, file);
     console.log(data);
     this.editLogoPath = data.logo; 
     this.spinner = false;
     this.isLogo = true;
     this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
     this.teamDetail.powerboardResponse.logo = data.logo;
     localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetail));
     var image = <HTMLImageElement>document.getElementById('output');
     image.src = URL.createObjectURL(file); 
     this.notifyService.showSuccess("","Logo Uploaded Successfully");
     /* this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
     this.teamDetail.powerboardResponse.logo = data.logo;
     localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetail)); */
    }catch(e){
      console.log(e);
      this.spinner = false;
      this.notifyService.showError("", e);
    }


  }

  async submitForm() {
    var formData: any = new FormData();
    formData.append('teamName', this.form.get('teamName').value);
    formData.append('projectKey', this.form.get('projectKey').value);
    formData.append('teamId', this.team.teamId);
    formData.append('teamCode', this.form.get('teamCode').value);
    this.updateTeam.teamId = this.team.teamId;
    this.updateTeam.teamName = this.form.get('teamName').value;
    this.updateTeam.projectKey = this.form.get('projectKey').value;
    this.updateTeam.teamCode = this.form.get('teamCode').value;

    try {
      
      const data = await this.setupService.updateTeam(this.updateTeam, this.team.teamId);
     this.notifyService.showSuccess("", "Team Updated Successfully");
    
      console.log(data);
    } catch (e) {
     
      console.log(e);
      this.notifyService.showError("", e);
    }
  }
}
