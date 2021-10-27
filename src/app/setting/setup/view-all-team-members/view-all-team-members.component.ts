import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TeamMemberDetailsResponse, UpdateRoles } from '../../model/setting.model';
import { SettingService } from '../../service/setting.service';
import { TeamService } from '../../team/service/team.service';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditTeamMemberComponent } from './edit-team-member/edit-team-member.component';

@Component({
  selector: 'app-view-all-team-members',
  templateUrl: './view-all-team-members.component.html',
  styleUrls: ['./view-all-team-members.component.css']
})
export class ViewAllTeamMembersComponent implements OnInit {

  teamId : string;
  deleteId: string;
  teamMembers : TeamMemberDetailsResponse[] = [];
  updateRole : UpdateRoles = new UpdateRoles();
  @ViewChild(AddMemberComponent) child;
  @ViewChild(EditTeamMemberComponent) editChild;
   
    constructor(public settingService : SettingService, public generalService : GeneralService, private notifyService : NotificationService, public teamService : TeamService) { }
   
    async ngOnInit() {  
   
    await this.viewAllMembers();
   
    }
   async viewAllMembers(){
     this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id; 
     await this.teamService.viewTeamMembersOfTeam(this.teamId).then(
    (data)=>{
      if(data){
        this.teamMembers = data;
      }
      else{
        this.teamMembers = [];
      }
    },
    (reason)=>{
      console.log("error viewing team members", reason);
      this.notifyService.showError(reason.error.message,'');
    }
  )
  }
   
  public storeDeleteId(userteamId : string){
    this.deleteId = userteamId;
  }
   
  async deleteMember(){
  await this.teamService.deleteTeamMember(this.deleteId).then(
    (data)=>{
      if(data){
        console.log(data);
        this.notifyService.showSuccess("team member deleted successfully !!", "");
      }
      this.viewAllMembers();
    },
    (reason)=>{
      console.log("error deleting team member", reason);
      this.notifyService.showError("", reason.error.message);
    }
  )
   
  }
  
  
  
   
  async addMember(){
    const result=await this.child.addTeamMember();
    console.log(result);
    if(result){
      await this.viewAllMembers();
    }
  }
   
  close(){
    this.child.roleName="select Role";
    this.child.memberGroup.reset();
  }
   
    async editTeamMember(){
    try{
     const data = await this.editChild.editTeamMember();
     this.viewAllMembers();
    }
    catch(e){
      console.log(e);
    }
    
   
  }
   
  setCurrentTeamMember(member){
    this.editChild.getCurrentTeamMember(member);
  }

}
