import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { EmailService } from '../../email/services/email.service';
import { TeamsModule } from '../../teams/teams.module';
import { UserController } from './controllers/user.controller';
import { User } from './model/entities/user.entity';
import { UserRole } from './model/entities/user_role.entity';
import { UserSession } from './model/entities/user_session.entity';
import { UserTeam } from './model/entities/user_team.entity';
import { UserPrivilegeService } from './services/user-privilege.service';
import { UserSessionDetailsService } from './services/user-session-details.service';
import { UserTeamService } from './services/user-team.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserTeam, UserSession, UserRole]),
    DashboardModule,
    TeamsModule,
    // forwardRef(() => TeamsModule),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'IUserTeamService',
      useClass: UserTeamService,
    },
    {
      provide: 'IUserPrivilegeService',
      useClass: UserPrivilegeService,
    },
    {
      provide: 'IUserSessionDetailsService',
      useClass: UserSessionDetailsService,
    },
    {
      provide: 'IEmailService',
      useClass: EmailService,
    },
  ],
  exports: ['IUserService', 'IUserTeamService', 'IUserPrivilegeService', 'IUserSessionDetailsService', 'IEmailService'],
})
export class UserModule {}
