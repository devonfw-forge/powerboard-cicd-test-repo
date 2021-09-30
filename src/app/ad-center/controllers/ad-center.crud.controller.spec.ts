import { Test, TestingModule } from '@nestjs/testing';
import { AdCenterMockService } from '../../../../test/mockedServices/ad-center.service.mock';
import { ADCenter } from '../model/entities/ad-center.entity';
import { ADCenterCrudController } from './ad-center.crud.controller';

describe('Auth Controller', () => {
  let adCenterController: ADCenterCrudController;
  let adCenterService: AdCenterMockService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ADCenterCrudController],
      providers: [
        {
          provide: 'IADCenterService',
          useClass: AdCenterMockService,
        },
      ],
    }).compile();

    adCenterController = module.get<ADCenterCrudController>(ADCenterCrudController);
    adCenterService = module.get<AdCenterMockService>('IADCenterService');
  });

  it('should be defined after module initialization', () => {
    expect(adCenterController).toBeDefined();
    expect(adCenterService).toBeDefined();
  });
  describe('getAllCenters', () => {
    it('should return all the centers present in db', async () => {
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const allCenters = {} as ADCenter[];
      jest.spyOn(adCenterService, 'getAllCenters').mockImplementation(() => allCenters);
      await adCenterController.getAllCenters(mockResponse);
      expect(adCenterService.getAllCenters).toBeCalled();
      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);
    });
  });
});
