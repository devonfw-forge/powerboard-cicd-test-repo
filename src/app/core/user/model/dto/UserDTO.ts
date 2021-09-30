import { Team } from '../../../../teams/model/entities/team.entity';

export interface UserDTO {
  username: string;
  fullName: string;
  email: string;
  role: string;
  team: Team;
}
