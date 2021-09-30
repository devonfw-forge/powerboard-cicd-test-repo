import { Module } from '@nestjs/common';
import { Sprint } from './model/entities/sprint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintCrudService } from './services/sprint.crud.service';
import { SprintCrudController } from './controllers/sprint.crud.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint])],
  providers: [
    {
      provide: 'ISprintCrudService',
      useClass: SprintCrudService,
    },
  ],
  controllers: [SprintCrudController],
  exports: ['ISprintCrudService'],
})
export class SprintModule {}
