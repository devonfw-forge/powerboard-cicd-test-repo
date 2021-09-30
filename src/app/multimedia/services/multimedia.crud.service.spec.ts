import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MultimediaRepositoryMock } from '../../../../test/mockCrudRepository/crudRepository.mock';
import { IFileStorageService } from '../../file-storage/services/file-storage.service.interface';
import { CloudFileStorageService } from '../../file-storage/services/cloud-file-storage.service';
import { MultimediaResponse } from '../model/dto/MultimediaResponse';
import { Multimedia } from '../model/entities/multimedia.entity';
import { MultimediaCrudService } from './multimedia.crud.service';

describe('ImagesCrudService', () => {
  let multimediaCrudService: MultimediaCrudService;
  let multimediaMockRepo: MultimediaRepositoryMock;
  let fileStorageService: IFileStorageService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MultimediaCrudService,
        CloudFileStorageService,
        {
          provide: getRepositoryToken(Multimedia),
          useClass: MultimediaRepositoryMock,
        },
        {
          provide: 'IFileStorageService',
          useClass: LocalFileStorageService,
        },
      ],
    }).compile();

    multimediaCrudService = module.get<MultimediaCrudService>(MultimediaCrudService);
    multimediaMockRepo = module.get<MultimediaRepositoryMock>(getRepositoryToken(Multimedia));
    fileStorageService = module.get<LocalFileStorageService>('IFileStorageService');
    // fileStorageService = mock<IFileStorageService>();  //TODO --> Interface mocking not done//need to verify this
  });

  it('should be defined after module initialization', () => {
    expect(multimediaCrudService).toBeDefined();
    expect(multimediaMockRepo).toBeDefined();
    expect(fileStorageService).toBeDefined();
  });

  const teamId: string = '46455bf7-ada7-495c-8019-8d7ab76d488e';
  describe('getFilesForTeam()', () => {
    it('getFilesForTeam() should return all the files present in the database', async () => {
      const files: Multimedia[] = [
        {
          id: '52055bf8-ada5-495c-8019-8d7ab76d488e',
          version: 1,
          createdAt: '2021-04-29T05:56:27.392Z',
          updatedAt: '2021-04-29T05:56:27.392Z',
          fileName: 'jirab05d9639-10f5-4ec5-85bf-087731ce4f8b.png',
          team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        },
        {
          id: '52155bf8-ada5-495c-8019-8d7ab76d488e',
          version: 1,
          createdAt: '2021-04-29T05:56:27.392Z',
          updatedAt: '2021-04-29T05:56:27.392Z',
          fileName: 'power46455bf7-ada7-495c-8019-8d7ab76d497e.png',
          team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        },
      ];
      const expectedMultimediaResponses: MultimediaResponse[] = [
        {
          fileId: '52055bf8-ada5-495c-8019-8d7ab76d488e',
          fileName: 'jirab05d9639-10f5-4ec5-85bf-087731ce4f8b.png',
        },
        {
          fileId: '52155bf8-ada5-495c-8019-8d7ab76d488e',
          fileName: 'power46455bf7-ada7-495c-8019-8d7ab76d497e.png',
        },
      ];

      jest.spyOn(multimediaMockRepo, 'find').mockImplementation(() => files);
      const actualMultimediaResponse = await multimediaCrudService.getFilesForTeam(teamId);
      expect(multimediaMockRepo.find).toBeCalledTimes(1);
      expect(actualMultimediaResponse).toBeDefined();
      expect(actualMultimediaResponse).toEqual(expectedMultimediaResponses);
    });
  });

  describe('setFilePath', () => {
    it('setFilePath() should save the image ', async () => {
      const uploadedFile = {
        fieldname: 'file',
        originalname: 'power.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer:
          '<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 202440 more bytes>',
        size: 202490,
      };
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const expectedSavedFileResponse: Multimedia = {
        fileName: 'powerb60f5d38-7a1e-430e-9d88-0a620359f191.png',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        id: 'd123011a-7fd0-4237-b1b5-d3fc657d2467',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
      };

      const fileName = 'powerb60f5d38-7a1e-430e-9d88-0a620359f191.png';
      jest.spyOn(multimediaMockRepo, 'save').mockImplementation(() => expectedSavedFileResponse);
      jest.spyOn(fileStorageService, 'uploadFile').mockResolvedValue(fileName);
      const actualImageResponse = await multimediaCrudService.uploadFile(uploadedFile, teamId);
      expect(multimediaMockRepo.save).toBeCalledTimes(1);
      expect(actualImageResponse).toBeDefined();
      expect(actualImageResponse).toEqual(expectedSavedFileResponse);
    });
  });

  it('deleteFileById() should delete the given file ', async () => {
    const file: Multimedia = {
      id: '52055bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-04-29T05:56:27.392Z',
      updatedAt: '2021-04-29T05:56:27.392Z',
      fileName: 'jirab05d9639-10f5-4ec5-85bf-087731ce4f8b.png',
      team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
    };
    const fileId: string = 'd123011a-7fd0-4237-b1b5-d3fc657d2467';
    const teamId: string = '46455bf7-ada7-495c-8019-8d7ab76d488e';
    jest.spyOn(multimediaMockRepo, 'findOne').mockImplementation(() => file);
    jest.spyOn(multimediaMockRepo, 'delete').mockImplementation(() => undefined);
    jest.spyOn(fileStorageService, 'deleteFile').mockResolvedValue(true);
    await multimediaCrudService.deleteFileById(fileId, teamId);
    expect(multimediaMockRepo.delete).toBeCalledTimes(1);
    //expect(multimediaMockRepo.delete).toBeCalledWith(file);
  });
});
