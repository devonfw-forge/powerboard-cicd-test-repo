// import { MyCenter } from 'src/app/teams/model/dto/MyCenter';
// import { ViewCentersResponse } from '../../../ad-center/model/dto/ViewCentersResponse';
import { PowerboardResponse } from '../../../teams/model/dto/PowerboardResponse';
import { HomeResponse } from './HomeResponse';
// import { TeamsInADC } from '../../../teams/model/dto/TeamsInADC';
// import { MyProject } from '../../user/model/dto/my_project.interface';

export interface LoginResponse {
  userId: string;
  isPasswordChanged: boolean;
  // My_Center: MyCenter | undefined;
  // My_Team?: MyProject[];
  // Teams_In_ADC: TeamsInADC[];
  // ADC_List: ViewCentersResponse[];
  privileges: string[];
  homeResponse?: HomeResponse;
  powerboardResponse?: PowerboardResponse;
}
