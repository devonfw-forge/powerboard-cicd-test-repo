import { Controller, Get, Response } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { ADCenter } from '../model/entities/ad-center.entity';
import { Response as eResponse } from 'express';
import { IADCenterService } from '../services/ad-center.interface';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
@Crud({
  model: {
    type: ADCenter,
  },
})
@CrudType(ADCenter)
@Controller('ad-center')
export class ADCenterCrudController {
  constructor(@Inject('IADCenterService') public adCenterServiceInterface: IADCenterService) {}

  //View All Centers
  @Get('viewAllCenters')
  //@UseGuards(AuthGuard('jwt'))
  async getAllCenters(@Response() res: eResponse): Promise<void> {
    const result = await this.adCenterServiceInterface.getAllCenters();
    res.status(200).json(result);
  }
}
