import { PowerboardResponse } from '../../../teams/model/dto/PowerboardResponse';
import { HomeResponse } from './HomeResponse';

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
