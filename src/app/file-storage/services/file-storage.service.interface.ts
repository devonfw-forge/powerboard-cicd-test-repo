export interface IFileStorageService {
  uploadFile(file: any, path: string): Promise<any>;
  uploadS3(file: any, bucket: any, name: any): Promise<any>;
  getS3(): any;
  deleteFile(filePath: string): Promise<any>;
  deleteMultipleFiles(filePaths: string[]): Promise<any>;
  deleteMultipleFolders(folderPaths: string[]): Promise<any>;
}
