import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TeamMemberDetails } from 'src/app/setting/model/setting.model';
import { SettingService } from 'src/app/setting/service/setting.service';
import { TeamService } from 'src/app/setting/team/service/team.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  private authError: boolean;
  teamId : string;
  teamName : string;
  memberGroup:FormGroup;
  error: boolean=false;
teamMember : TeamMemberDetails = new TeamMemberDetails();

  roleName : string;
  constructor(public settingService : SettingService, public generalService : GeneralService, private notifyService : NotificationService, private teamService : TeamService, private fb: FormBuilder,) {
    this.roleName = "Select Role";
   }

  ngOnInit(): void {
    this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
    this.teamName = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_name;
    this.memberGroup=this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['',[Validators.required]],
      team:['',[Validators.required]]
    });
  }
 /*  keyPressed() {
    this.authError = false;
  }

  
  getAuthError() {
    return this.authError;
  } */

  /* async addMember(){
    this.teamMember.team.id=  this.teamId;
    this.memberGroup.controls.team.setValue(this.teamMember.team);


    if(this.memberGroup.valid){
      this.error=false;
    console.log(this.memberGroup.value);
    const result= await this.addTeamMember();
    console.log(result);
    return result;
  }
  else{
    this.error=true;
    return false;
    this.updateTeam.teamId = this.team.teamId;
    this.updateTeam.teamName = this.form.get('teamName').value;
  }
  } */

  
  async addTeamMember(){
    
    try{
      console.log("teamMemberDetails");
      this.teamMember.team.id = this.teamId;
      this.teamMember.username = this.memberGroup.get('username').value
      this.teamMember.email = this.memberGroup.get('email').value
      this.teamMember.role = this.memberGroup.get('role').value
      console.log(this.teamMember);
      const data = await this.teamService.addTeamMember(this.teamMember);
      this.notifyService.showSuccess("Team member added successfully","");
      this.memberGroup.reset();
      this.roleName="Select Role";
      console.log(data);
      return true;
      
    }
    catch(e){
      console.log(e.error.message);
      this.notifyService.showError("", e.error.message);
      return false;
     
    }   

  }

  updateRole(roleId : string, roleName : string){
    this.roleName = roleName;
    this.teamMember.role = roleId;
    this.memberGroup.controls.role.setValue(this.teamMember.role);
  }

}
