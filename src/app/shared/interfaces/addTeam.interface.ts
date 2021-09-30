import { ADCenter } from '../../ad-center/model/entities/ad-center.entity';

export interface AddTeam {
  teamName: string;
  teamCode: string;
  projectKey: string;
  logo?: File;
  ad_center: ADCenter;
  member_number?: number;
  frequency?: number;
  start_date?: string;
}
