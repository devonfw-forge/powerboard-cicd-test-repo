import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamSpiritCrudService } from './services/team-spirit.crud.service';
import { TeamSpiritCrudController } from './controllers/team-spirit.crud.controller';
import { Sprint } from '../sprint/model/entities/sprint.entity';
import { Team } from '../../teams/model/entities/team.entity';
import { TeamSpiritMedian } from './model/entities/team-spirit-median.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamSpiritMedian, Sprint, Team]), HttpModule],
  providers: [
    {
      provide: 'ITeamSpiritService',
      useClass: TeamSpiritCrudService,
    },
  ],
  controllers: [TeamSpiritCrudController],
  exports: ['ITeamSpiritService'],
})
export class TeamSpiritModule {}
