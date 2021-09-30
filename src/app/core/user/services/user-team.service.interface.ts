import { DeleteResult } from 'typeorm';
import { TeamsMemberResponse } from '../../../shared/interfaces/teamMemberResponse';
import { UpdateUserRoleDTO } from '../model/dto/UpdateUserRoleDTO';
import { UserDTO } from '../model/dto/UserDTO';
import { User } from '../model/entities/user.entity';
import { UserTeam } from '../model/entities/user_team.entity';

export interface IUserTeamService {
  findUserTeamDetails(userId: string, teamId: string): Promise<UserTeam>;
  addUserToTeam(actualUser: User, userDTO: UserDTO): Promise<any>;
  deleteUserFromTeamById(id: string): Promise<DeleteResult>;
  getAllMemberOfTeam(teamId: string): Promise<TeamsMemberResponse[]>;
  updateUserRole(updateRoleDTO: UpdateUserRoleDTO): Promise<UserTeam>;
  findUserTeamsByUserId(id: string): any;
  findUserTeamForAdmin(userId: string): Promise<UserTeam>;
  isSystemAdmin(userId: string | undefined): Promise<any>;
}
