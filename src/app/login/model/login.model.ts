import { PowerboardResponse } from 'src/app/model/general.model';

export class PowerboardLoginResponse
{
loginResponse : LoginResponse = new LoginResponse();


}
export class LoginResponse
{
userId : string;
isPasswordChanged : boolean;
/* My_Center : ADCDetails = new ADCDetails(); */
privileges: string[];
/* My_Team? : TeamDetails[];
Teams_In_ADC : TeamDetails[];
ADC_List : ADCDetails[] ; */
homeResponse : HomeResponse;
powerboardResponse?: PowerboardResponse;
  loginResponse: PowerboardLoginResponse;

}

export class HomeResponse{
    My_Center : ADCDetails = new ADCDetails();
    My_Team? : TeamDetails[];
    Teams_In_ADC : TeamDetails[];
ADC_List : ADCDetails[] ;
}
/* export class MyCenterDetails { 
    centerId : string;
    centerName: string;
} */

export class TeamDetails
{
teamId: string;
teamLogo? : string;
teamName : String;
myRole? : string;
teamStatus? : number;

}
export class ADCDetails
{
centerId : string;
centerName : string;
}

export class PasswordResetForm
{
    userId:string;
    oldPassword:string;
    newPassword:string;
}