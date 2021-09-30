import { DeleteResponse } from '../model/dto/DeleteResponse.interface';
import { DisplayResponse } from '../model/dto/DisplayResponse';
import { MultimediaResponse } from '../model/dto/MultimediaResponse';
import { Multimedia } from '../model/entities/multimedia.entity';

export interface IMultimediaService {
  getDefaultMultimediaForTeam(teamId: string): Promise<MultimediaResponse>;
  uploadFile(file: any, teamId: string): Promise<Multimedia>;
  getAllFilesInFolderForTeam(teamId: string, folderId: string): Promise<DisplayResponse[]>;
  uploadFileToFolder(teamId: string, folderId: string, file: any): Promise<Multimedia>;
  deleteMultipleFilesAndFolders(teamId: string, deleteResponse: DeleteResponse): Promise<any>;
  getAllFilesForTeam(teamId: string): Promise<DisplayResponse[]>;
  addFolder(teamId: string, folderName: string): Promise<Multimedia>;
  addFilesAndFoldersIntoSlideshow(teamId: string, fileAndFolderIds: string[]): Promise<Multimedia[]>;
  getMultimediaForSlideshow(teamId: string): Promise<any>;
}
