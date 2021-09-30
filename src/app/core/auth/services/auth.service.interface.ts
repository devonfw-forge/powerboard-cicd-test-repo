import { MyProject } from '../../user/model/dto/my_project.interface';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { User } from '../../user/model/entities/user.entity';
import { UserTeam } from '../../user/model/entities/user_team.entity';
import { ChangePasswordDTO } from '../model/ChangePasswordDTO';
import { LoginDTO } from '../model/LoginDTO';

export interface IAuthService {
  validateUser(username: string, pass: string): Promise<User | undefined>;
  signIn(username: string, password: string): Promise<string>;
  login(user: LoginDTO): Promise<any>;
  loginGuest(user: LoginDTO): Promise<any>;
  systemAdminHome(): Promise<any>;
  getPrivileges(userId: string): Promise<any>;
  teamMemberTeamAdminHome(userTeam: UserTeam[]): Promise<any>;

  homeDetailsForTeamMemberAdmin(teamId: string, teamsDTOArray: MyProject[]): Promise<any>;
  getHomeDetailsForUserId(userId: string): Promise<any>;
  register(user: UserDTO): Promise<User>;
  changePassword(changePassword: ChangePasswordDTO): Promise<any>;
}
