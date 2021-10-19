import { ADCenter } from '../../../ad-center/model/entities/ad-center.entity';

export interface TeamResponse {
  id: string;
  name: string;
  teamCode: string;
  projectKey: string;
  ad_center: string | ADCenter;
  logo: string;
}
