import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisibilityCrudController } from './controllers/visibility.crud.controller';
import { Visibility } from './model/entities/visibility.entity';
import { VisibilityCrudService } from './services/visibility.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([Visibility])],
  providers: [VisibilityCrudService],
  controllers: [VisibilityCrudController],
  exports: [VisibilityCrudService],
})
export class VisibilityModule {}
