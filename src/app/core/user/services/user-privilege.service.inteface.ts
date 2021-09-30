import { UserRolesDTO } from '../model/dto/UserRolesDTO';
import { UserRole } from '../model/entities/user_role.entity';
import { UserTeam } from '../model/entities/user_team.entity';

export interface IUserPrivilegeService {
  getUserPrivilegeForTeam(userId: string | undefined, teamId: string, isAdminOrGuest: boolean): Promise<any>;
  getPrivilegeList(userTeam: UserTeam): any;
  getAllPrivilegeForAdmin(userId: string): Promise<string[]>;
  getAllUserRoles(): Promise<UserRolesDTO[]>;
  findRole(roleId: string): Promise<UserRole>;
}
