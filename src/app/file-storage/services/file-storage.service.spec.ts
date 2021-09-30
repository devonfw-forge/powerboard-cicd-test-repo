import { Test, TestingModule } from '@nestjs/testing';
import { CloudFileStorageService } from './cloud-file-storage.service';
import { IFileStorageService } from './file-storage.service.interface';
describe('CloudFileStorageService', () => {
  let fileStorageService: IFileStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudFileStorageService,
        {
          provide: 'IFileStorageService',
          useClass: CloudFileStorageService,
        },
      ],
    }).compile();

    fileStorageService = module.get<CloudFileStorageService>('IFileStorageService');
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // beforeAll((done /* Call it or remove it */) => {
  //   done(); // Calling it
  // });

  it('should be defined after module initialization', () => {
    expect(fileStorageService).toBeDefined();
  });

  describe('uploadS3() method ', () => {
    it('should call the s3 with correct parameters to upload a file to aws', async () => {
      // const mS3Instance: any = {
      //   upload: () => {
      //     return jest.fn().mockReturnThis()
      //   },
      //   promise: jest.fn(),
      // };
      // const s3Object: any = jest.mock('aws-sdk', () => {
      //   return { S3: jest.fn(() => mS3Instance) };
      // });
      // const data = {};
      // const fakeS3Promise: any = {
      //   promise: jest
      //     .fn()
      //     .mockImplementationOnce(() => Promise.resolve(data))
      // }
      // const fakeS3: any = {
      //   upload: () => {
      //     return fakeS3Promise;
      //   },
      // };
      // jest.mock('aws-sdk', () => {
      //   const mS3 = { upload: jest.fn().mockReturnThis(), promise: jest.fn() };
      //   return { S3: jest.fn(() => mS3) };
      // });
      // const mS3 = new AWSMock.S3();
      // const mResponse: any = { Bucket: 'xxx' };
      // jest.mock('aws-sdk', () => {
      // const mockedS3: any = {
      //   upload: jest.fn().mockReturnThis(),
      //   promise: jest.fn(),
      // };
      //   return { S3: jest.fn(() => mockedS3) };
      // });
      // mS3Instance = new AWSMock.S3()
      //const mockedS3 = new AWS.S3();
      // mockedS3.promise.mockResolvedValueOnce({ Location: 'us' });
      // mockedS3.promise.mockResolvedValueOnce('fake response');
      const mockedS3: any = {
        upload: jest.fn().mockReturnThis(),
        promise: jest.fn(),
      };

      jest.mock('aws-sdk', () => {
        return { S3: jest.fn(() => mockedS3) };
      });
      const bucketS3 = 'bucket-dev';
      const fileName = 'powerboard.png';

      jest.spyOn(fileStorageService, 'getS3').mockImplementation(() => mockedS3);
      await fileStorageService.uploadS3(Buffer.from('ok'), bucketS3, fileName);
      //  expect(actual).toEqual('fake response');
      expect(mockedS3.upload).toBeCalledWith({ Bucket: bucketS3, Key: fileName, Body: Buffer.from('ok') });
    });
  });

  // describe('uploadS3() method ', () => {
  //   it('should call the s3 with correct parameters to upload a file to aws', async () => {

  //     const mS3Instance = {
  //       upload: jest.fn().mockReturnThis(),
  //       promise: jest.fn(),
  //       catch: jest.fn(),
  //     };
  //     jest.mock('aws-sdk', () => {
  //       return { S3: jest.fn(() => mS3Instance) };
  //     });
  // const config: any = {
  //   get: jest
  //     .fn()
  //     .mockReturnValueOnce('accessKeyId')
  //     .mockReturnValueOnce('secretAccessKey')
  //     .mockReturnValueOnce('eu-east')
  //   // .mockReturnValueOnce('bucket-dev'),
  // };
  // const file: any = {
  //   fieldname: 'file',
  //   originalname: 'Screenshot (7).png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   buffer:
  //     '<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 177001 more bytes>',
  //   size: 177051,
  // };
  // const file = 'somefile'
  // const base64data = new Buffer(file, 'binary');
  //const path = `/upload-test/multimedia/`;
  // const name = 'powerboard.png';
  // const fileUploaded: any = {};
  // const bucketS3 = 'bucket-dev';
  // const fileName = 'powerboard.png';
  // mS3Instance.promise.mockResolvedValueOnce('fake response');
  // const s3 = new S3(config);
  //jest.spyOn(fileStorageService, 'uploadS3').mockImplementation(() => fileUploaded);
  //jest.spyOn(fileStorageService, 'getS3').mockImplementation(() => s3);
  // await fileStorageService.uploadS3(Buffer.from('ok'), bucketS3, fileName);
  // expect(mS3Instance.upload).resolves.toHaveBeenCalledWith({ Bucket: bucketS3, Key: fileName, Body: Buffer.from('ok') });
  // expect(mS3Instance.upload).resolves.toHaveBeenCalledTimes(1);

  // expect(fileStorageService.uploadFile).toBeDefined();
  // expect(await fileStorageService.uploadFile(file, path)).toBeDefined();

  // })
  //})
});
// describe('deleteFile() method ', () => {
//   it('should delete the file which is stored', async () => {
//     const fileName: string = 'Screenshot(7)5a74cfb0-a1ad-4053-92c0-6e1db1ac42a3.png'
//     expect(await fileStorageService.deleteFile(fileName)).toEqual(undefined);
//   })
// })

// import { CloudFileStorageService } from './cloud-file-storage.service';

// let cloudFileStorageService: CloudFileStorageService;

// const mS3Instance = {
//   upload: jest.fn().mockReturnThis(),
//   promise: jest.fn(),
// };

// jest.mock('aws-sdk', () => {
//   return { S3: jest.fn(() => mS3Instance) };
// });

// describe('uploadFile ', () => {
//   it('should call the uploadS3() method with bucket and file name to upload file ', async () => {

//     const file: any = {
//       fieldname: 'file',
//       originalname: 'Screenshot (7).png',
//       encoding: '7bit',
//       mimetype: 'image/png',
//       buffer:
//         '<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 177001 more bytes>',
//       size: 177051,
//     };
//     const path = 'somePath'
//     mS3Instance.promise.mockResolvedValueOnce('fake response');

//     const actual = await cloudFileStorageService.uploadFile(file, path);
//     //const actual = await mS3Instance.upload('name', 'contentType', Buffer.from('ok'));
//     expect(actual).toEqual('fake response');
//     expect(mS3Instance.upload).toBeCalledWith({ Bucket: 'bucket-dev', Key: 'key', Body: Buffer.from('ok') });
//   });

// });
// describe('uploadS3', () => {
//   it('should upload file correctly', async () => {
// const config: any = {
//   get: jest
//     .fn()
//     .mockReturnValueOnce('accessKeyId')
//     .mockReturnValueOnce('secretAccessKey')
//     .mockReturnValueOnce('eu-east')
//   // .mockReturnValueOnce('bucket-dev'),
// };
// const bucketS3 = 'bucket-dev';
// const fileName = 'powerboard.png'
//     jest.spyOn(cloudFileStorageService, 'getS3').mockImplementation(() => config);
//     expect(mS3Instance.upload).toBeCalledWith({ Bucket: bucketS3, Key: fileName, Body: Buffer.from('ok') });

//   })
// })
