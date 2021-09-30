import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmailModule } from './email/email.module';
import { MultimediaModule } from './multimedia/multimedia.module';
import { TeamLinksModule } from './team-links/team-links.module';
import { VisibilityModule } from './visibility/visibility.module';
//import * as dotenv from 'dotenv';
//import { ConfigModule } from '@devon4node/config';
//dotenv.config();

@Module({
  imports: [
    // ConfigModule.forRoot(),
    CoreModule,
    DashboardModule,
    TeamLinksModule,
    MultimediaModule,
    VisibilityModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
