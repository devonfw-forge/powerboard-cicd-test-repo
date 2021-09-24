import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { TeamMemberDetailsResponse, UpdateRoles } from 'src/app/setting/model/setting.model';
import { SettingService } from 'src/app/setting/service/setting.service';
import { TeamService } from 'src/app/setting/team/service/team.service';

@Component({
  selector: 'app-edit-team-member',
  templateUrl: './edit-team-member.component.html',
  styleUrls: ['./edit-team-member.component.css']
})
export class EditTeamMemberComponent implements OnInit {

  currentMember : TeamMemberDetailsResponse = new TeamMemberDetailsResponse();
  updateRoleOfMember : UpdateRoles = new UpdateRoles();
  roleName : string;
 
  constructor(public settingService : SettingService, public generalService : GeneralService, private teamService : TeamService) {
    this.roleName = "Select Role";
   }
 
  ngOnInit(): void {
   
   
  }
  getCurrentTeamMember(member){
    this.currentMember = member;
 
    this.updateRoleOfMember.teamId = this.currentMember.teamId;
    this.updateRoleOfMember.userId = this.currentMember.userId;
    for(let role of this.settingService.roles){
      if(role.roleId == this.currentMember.roleId){
        this.roleName = role.roleName;
      }
    }
  }
  updateRole(roleId : string, roleName : string){
    this.roleName = roleName;
    this.updateRoleOfMember.roleId = roleId;
  }
 
  public async editTeamMember(){
    if(this.currentMember.roleId != this.updateRoleOfMember.roleId){
      return await this.teamService.updateAccessRole(this.updateRoleOfMember);
    }
  }
}
