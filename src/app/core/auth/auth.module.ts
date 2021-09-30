import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@devon4node/config';
import { Config } from '../../shared/model/config/config.model';
import { TeamsModule } from '../../teams/teams.module';
import { ADCenterModule } from '../../ad-center/ad-center.module';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Config>) => config.values.jwtConfig,
      inject: [ConfigService],
    }),
    // TypeOrmModule.forFeature([ UserTeam]),
    TeamsModule,
    ADCenterModule,
    DashboardModule,
    UserModule,
  ],
  providers: [
    AuthService,
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    JwtStrategy,
  ],
  exports: ['IAuthService', PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
