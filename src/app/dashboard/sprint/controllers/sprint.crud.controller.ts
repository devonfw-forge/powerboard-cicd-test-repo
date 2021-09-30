import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Sprint } from '../model/entities/sprint.entity';

@Crud({
  model: {
    type: Sprint,
  },
})
@CrudType(Sprint)
@Controller('sprint')
export class SprintCrudController {
  constructor() {}

  // @Get('burndown/demo/:teamId')
  // //@UseGuards(AuthGuard('jwt'))
  // async getBurndown(@Param('teamId') teamId: string): Promise<BurndownResponse | undefined> {
  //   return await this.service.getBurndown(teamId);
  // }

  // @Get('velocity/demo/:id')
  // //@UseGuards(AuthGuard('jwt'))
  // async getVelocityComparison(@Param('id') teamId: string): Promise<VelocityComparisonResponse | undefined> {
  //   return await this.service.getVelocityComparison(teamId);
  // }
}
