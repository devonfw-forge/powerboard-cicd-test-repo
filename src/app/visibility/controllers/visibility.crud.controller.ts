import { Body, Controller, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Visibility } from '../model/entities/visibility.entity';
import { VisibilityCrudService } from '../services/visibility.crud.service';
import { VisibilityDTO } from '../model/dto/VisibilityDTO';

@Crud({
  model: {
    type: Visibility,
  },
})
@CrudType(Visibility)
@Controller('visibility')
export class VisibilityCrudController {
  constructor(public visibilityService: VisibilityCrudService) {}

  @Post('teamId/create')
  async setVisibility(@Body() visibilityDTO: VisibilityDTO): Promise<Visibility> {
    return await this.visibilityService.setVisibility(visibilityDTO);
  }
}
