import { Test, TestingModule } from '@nestjs/testing';
import { MultimediaMockService } from '../../../../test/mockedServices/multimedia.service.mock';
import { MultimediaCrudController } from './multimedia.crud.controller';

describe('Multimedia Controller', () => {
  let multimediaController: MultimediaCrudController;
  let multimediaService: MultimediaMockService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultimediaCrudController],
      providers: [
        {
          provide: 'IMultimediaService',
          useClass: MultimediaMockService,
        },
      ],
    }).compile();

    multimediaController = module.get<MultimediaCrudController>(MultimediaCrudController);
    multimediaService = module.get<MultimediaMockService>('IMultimediaService');
  });
  it('should be defined after module initialization', () => {
    expect(multimediaController).toBeDefined();
    expect(multimediaService).toBeDefined();
  });

  describe('getAllAlbums()', () => {
    it('should return all the folders/albums present in the DB', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      await expect(multimediaController.getAllAlbums(teamId, mockResponse)).resolves.not.toThrow();
      expect(multimediaService.getDefaultMultimediaForTeam).toBeCalled();
    });
  });

  describe('uploadImage()', () => {
    it('should upload the image properly', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      const file: any = {
        fieldname: 'file',
        originalname: 'logo(5).png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer:
          '<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 202440 more bytes>',
        size: 202490,
      };

      await expect(multimediaController.uploadImage(file, teamId, mockResponse)).resolves.not.toThrow();
      expect(multimediaService.uploadFile).toBeCalled();
    });
  });
  describe('uploadFileToFolder()', () => {
    it('should upload the file to a folder properly', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const folderId = 'aaad19f7-1b66-44aa-a443-4fcdd173f386';
      const file: any = {
        fieldname: 'file',
        originalname: 'logo(5).png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer:
          '<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 202440 more bytes>',
        size: 202490,
      };

      await expect(
        multimediaController.uploadFileToFolder(file, teamId, folderId, mockResponse),
      ).resolves.not.toThrow();

      expect(multimediaService.uploadFileToFolder).toBeCalled();
    });
  });
  describe('getAllFilesInFolderForTeam()', () => {
    it('should return all the files present in a folder of a team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const folderId = 'aaad19f7-1b66-44aa-a443-4fcdd173f386';

      await expect(
        multimediaController.getAllFilesInFolderForTeam(teamId, folderId, mockResponse),
      ).resolves.not.toThrow();
      expect(multimediaService.getAllFilesInFolderForTeam).toBeCalled();
    });
  });

  describe('deleteMultipleFilesAndFolders()', () => {
    it('should delete multiple files and folders present in a team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      const deleteResponse = {
        subFolderId: 'aaad19f7-1b66-44aa-a443-4fcdd173f386',
        foldersId: [],
        filesId: ['16b0103f-664d-49ad-92ff-c578376a2fba'],
      };
      await expect(
        multimediaController.deleteMultipleFilesAndFolders(teamId, deleteResponse, mockResponse),
      ).resolves.not.toThrow();
      expect(multimediaService.deleteMultipleFilesAndFolders).toBeCalled();
    });
  });
  describe('getAllFilesForTeam()', () => {
    it('should return all files present in a team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await expect(multimediaController.getAllFilesForTeam(teamId, mockResponse)).resolves.not.toThrow();
      expect(multimediaService.getAllFilesForTeam).toBeCalled();
    });
  });
  describe('addFolderInRoot()', () => {
    it('should return all files present in a team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const folderName = {
        name: 'resort',
      };
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await expect(multimediaController.addFolderInRoot(teamId, folderName, mockResponse)).resolves.not.toThrow();
      expect(multimediaService.addFolder).toBeCalled();
    });
  });
  describe('addFilesAndFoldersIntoSlideshow()', () => {
    it('should return all files present in a team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const itemIds = {
        fileAndFolderIds: ['36078c40-6667-4a15-bd5f-38d0c74fb006', 'aaad19f7-1b66-44aa-a443-4fcdd173f387'],
      };
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await expect(
        multimediaController.addFilesAndFoldersIntoSlideshow(teamId, itemIds, mockResponse),
      ).resolves.not.toThrow();
      expect(multimediaService.addFilesAndFoldersIntoSlideshow).toBeCalled();
    });
  });
  describe('getMultimediaForSlideshow()', () => {
    it('should return all files present in a team', async () => {
      const teamId = '46455bf7-ada7-495c-8019-8d7ab76d488e';

      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
      await expect(multimediaController.getMultimediaForSlideshow(teamId, mockResponse)).resolves.not.toThrow();
      expect(multimediaService.getMultimediaForSlideshow).toBeCalled();
    });
  });
});
