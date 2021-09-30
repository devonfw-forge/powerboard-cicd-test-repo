import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamLinksCrudController } from './controllers/team-links.crud.controller';
import { LinksCategory } from './model/entities/link-category.entity';
import { TeamLinks } from './model/entities/team-links.entity';
import { TeamLinksCrudService } from './services/team-links.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamLinks, LinksCategory])],
  providers: [
    {
      provide: 'ITeamLinksService',
      useClass: TeamLinksCrudService,
    },
  ],
  controllers: [TeamLinksCrudController],
  exports: ['ITeamLinksService'],
})
export class TeamLinksModule {}
