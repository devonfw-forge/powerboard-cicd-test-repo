import { TeamLinkResponse } from 'src/app/team-links/model/dto/TeamLinkResponse';
import { DashBoardResponse } from '../../../dashboard/model/DashBoardResponse';
import { MultimediaResponse } from '../../../multimedia/model/dto/MultimediaResponse';

export interface PowerboardResponse {
  team_id: string;
  team_name: string;
  project_key: string;
  center: string;
  logo: string;
  team_code: string;
  privileges: string[];
  dashboard: DashBoardResponse;
  teamLinks: TeamLinkResponse[] | undefined;
  multimedia: MultimediaResponse;
}
