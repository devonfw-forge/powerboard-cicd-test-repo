import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { UpdateLastLoggedTeamDTO } from '../model/dto/UpdateLastLoggedTeamDTO';
import { UserSession } from '../model/entities/user_session.entity';
import { IUserSessionDetailsService } from './user-session-details.service.interface';

@Injectable()
export class UserSessionDetailsService extends TypeOrmCrudService<UserSession> implements IUserSessionDetailsService {
  constructor(
    @InjectRepository(UserSession) private readonly userSessionDetailsRepository: Repository<UserSession>, //private readonly userTeamService: UserTeamService, // @InjectRepository(UserInfo) private readonly userInfoRepository: Repository<UserInfo>, // @Inject('IUserTeamService') private readonly userTeamService: IUserTeamService,
  ) {
    super(userSessionDetailsRepository);
  }

  async registerUserIntoUserSession(userId: string): Promise<UserSession> {
    let userSession = new UserSession();
    console.log(userId);
    userSession.userId = userId;
    userSession.isPasswordChanged = false;
    console.log('Registering inside user session db');
    console.log(userSession);
    return await this.userSessionDetailsRepository.save(userSession);
  }

  async getUserSessionDetails(userId: string): Promise<any> {
    return (await this.userSessionDetailsRepository.findOne({ where: { userId: userId } })) as UserSession;
  }

  async updateUserSessionAfterPasswordChange(userId: string): Promise<UserSession> {
    const userSession = (await this.userSessionDetailsRepository.findOne({ where: { userId: userId } })) as UserSession;
    userSession.isPasswordChanged = true;
    return await this.userSessionDetailsRepository.save(userSession);
  }

  async updateLastLoggedInProject(loggedTeam: UpdateLastLoggedTeamDTO): Promise<void> {
    const result = (await this.userSessionDetailsRepository.findOne({
      where: { userId: loggedTeam.userId },
    })) as UserSession;
    const session = new UserSession();
    console.log(';;;;;;;;;;;;;;;;;');
    console.log(result);
    if (result) {
      session.id = result.id;
      session.lastCheckedInProjectId = loggedTeam.teamId;
      await this.userSessionDetailsRepository.save(session);
    }
  }
}
