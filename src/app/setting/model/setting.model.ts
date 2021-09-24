export class TeamInfo{
  teamName: string;
  teamCode: string;
  projectKey: string;
  // logo?: string;
  member_number?: number;
  frequency?: number;
  start_date?: string;
  ad_center: ADCenter = new ADCenter();


}

export class UpdateTeam{
  teamId: string;
  teamCode: string;
  projectKey: string;
  teamName : string;
  //ad_center: ADCenter;
}
export class ADCenter{
id: string;
}

export class TeamMemberDetails{
   username: string;
  email: string;
  role: string;
  team: TeamIdDetail = new TeamIdDetail();

}
export class TeamIdDetail{
    id:string;
}
export class DailyMeetingLinksDetails{

    type: string;
    title : string;
    links: string;
    teamId: string;
}


export class TeamLinksDetails{
  title : string;
  links : string;
  teamId : string;
}

export class TeamsResponse{
  teamId: string;
  teamName: string;
  teamCode: string;
  projectKey : string;
  adCenter: string;
}

export class RolesResponse{
  roleId :string;
  roleName : string;
}

export class TeamMemberDetailsResponse{
       userTeamId: string;
        userId: string;
        teamId: string;
        roleId: string;
        userName: string;
        email:string;
}

export class UpdateRoles{
  userId: string;
  teamId: string;
  roleId: string;
}

export class GuestInfo {
  username: string;
  email: string;
  role:string;
}

export class ConfigureTeamSpirit{
    Name: string;
    Num_mumbers: number;
    StartDate: string;
    Frequency: number;
}

export class GuestDetails{
  id: string;
  username: string;
  email: string;
  isPasswordChanged: boolean
}

import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';
 
@Pipe({ name: 'removeUnderscore' })
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.replace(/_/g, " ");
  }
}


export class ReceiveAddLink{
  id : string
link :string;
linkName: string;
linkType : string;
}

export class MultimediaFilesChecked{
  fileId : string;
  fileName : string;
  isChecked? : boolean;
}