import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ViewCentersResponse } from '../model/dto/ViewCentersResponse';
import { ADCenter } from '../model/entities/ad-center.entity';

@Injectable()
export class ADCenterCrudService extends TypeOrmCrudService<ADCenter> {
  constructor(@InjectRepository(ADCenter) private readonly centerRepository: Repository<ADCenter>) {
    super(centerRepository);
  }
  /**
   * getAllCenters method will fetch all center
   * @param {} .Takes nothing as input
   * @return {[]} return adcenter array as response
   */
  async getAllCenters(): Promise<ViewCentersResponse[]> {
    const centerList = await this.centerRepository.find();
    let viewCentersResponse: ViewCentersResponse = {} as ViewCentersResponse;
    let viewCenterList = [],
      i;
    for (i = 0; i < centerList.length; i++) {
      viewCentersResponse.centerId = centerList[i].id;
      viewCentersResponse.centerName = centerList[i].name;

      viewCenterList.push(viewCentersResponse);
      viewCentersResponse = {} as ViewCentersResponse;
    }
    return viewCenterList;
  }
}
