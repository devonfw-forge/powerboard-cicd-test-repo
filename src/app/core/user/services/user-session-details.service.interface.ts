import { UpdateLastLoggedTeamDTO } from '../model/dto/UpdateLastLoggedTeamDTO';
import { UserSession } from '../model/entities/user_session.entity';

export interface IUserSessionDetailsService {
  getUserSessionDetails(userId: string): Promise<UserSession>;
  updateUserSessionAfterPasswordChange(userId: string): Promise<UserSession>;
  registerUserIntoUserSession(userId: string): Promise<UserSession>;
  updateLastLoggedInProject(loggedTeam: UpdateLastLoggedTeamDTO): Promise<void>;
}
