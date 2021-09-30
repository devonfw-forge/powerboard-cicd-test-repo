import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ADCenterRepositoryMock } from '../../../../test/mockCrudRepository/crudRepository.mock';

import { ViewCentersResponse } from '../model/dto/ViewCentersResponse';
import { ADCenter } from '../model/entities/ad-center.entity';
import { ADCenterCrudService } from './ad-center.crud.service';

describe('ADCenterCrudService', () => {
  let service: ADCenterCrudService;
  let adCenterRepo: ADCenterRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ADCenterCrudService,
        {
          provide: getRepositoryToken(ADCenter),
          useClass: ADCenterRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ADCenterCrudService>(ADCenterCrudService);
    adCenterRepo = module.get<ADCenterRepositoryMock>(getRepositoryToken(ADCenter));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(adCenterRepo).toBeDefined();
  });

  describe('getAllADCenter', () => {
    it('should return all center list', async () => {
      const adcenter: ADCenter[] = [
        {
          id: '98655bf7-ada7-495c-8019-8d7ab62d488e',
          name: 'ADCenter Valencia',
          createdAt: '2021-04-29T05:56:27.392Z',
          updatedAt: '2021-04-29T05:56:27.392Z',
          version: 1,
        },
        {
          id: '98755bf7-ada7-495c-8019-8d7ab62d488e',
          name: 'ADCenter Bangalore',
          createdAt: '2021-04-29T05:56:27.392Z',
          updatedAt: '2021-04-29T05:56:27.392Z',
          version: 1,
        },
      ];
      const expectedResponse: ViewCentersResponse[] = [
        {
          centerId: '98655bf7-ada7-495c-8019-8d7ab62d488e',
          centerName: 'ADCenter Valencia',
        },
        {
          centerId: '98755bf7-ada7-495c-8019-8d7ab62d488e',
          centerName: 'ADCenter Bangalore',
        },
      ];
      jest.spyOn(adCenterRepo, 'find').mockImplementation(() => adcenter);
      const actualResponse = await service.getAllCenters();
      expect(adCenterRepo.find).toBeCalled();
      expect(actualResponse).toEqual(expectedResponse);
    });
  });
});
