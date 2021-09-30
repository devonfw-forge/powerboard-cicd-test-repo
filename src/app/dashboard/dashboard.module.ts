import { Module } from '@nestjs/common';

import { ClientStatusModule } from './client-status/client-status.module';
import { SprintModule } from './sprint/sprint.module';
import { TeamSpiritModule } from './team-spirit/team-spirit.module';
import { CodeQualitySnapshotModule } from './code-quality-snapshot/code-quality-snapshot.module';
import { DashboardService } from './services/dashboard.service';

@Module({
  imports: [ClientStatusModule, CodeQualitySnapshotModule, SprintModule, TeamSpiritModule],
  controllers: [],
  providers: [
    {
      provide: 'IDashboardService',
      useClass: DashboardService,
    },
  ],
  exports: ['IDashboardService'],
})
export class DashboardModule {}
