import { TeamSpiritRolesDTO } from './TeamSpiritRolesDTO.dto';
import { TeamDTO } from './TeamDTO.dto';

export class TeamSpiritUserDTO {
  RoleID?: number;
  Email?: string;
  Full_Name?: string;
  Id?: number;
  Password?: string;
  Role?: TeamSpiritRolesDTO;
  Teams?: TeamDTO[];
}
