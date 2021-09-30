import { Module } from '@nestjs/common';
import { CodeQualitySnapshot } from './model/entities/code-quality-snapshot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeQualitySnapshotCrudService } from './services/code-quality-snapshot.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([CodeQualitySnapshot])],
  providers: [
    {
      provide: 'ICodeQualityService',
      useClass: CodeQualitySnapshotCrudService,
    },
  ],
  exports: ['ICodeQualityService'],
})
export class CodeQualitySnapshotModule {}
