import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { IFileStorageService } from '../../file-storage/services/file-storage.service.interface';
import { FolderResponse } from '../model/dto/FolderResponse';
import { RootResponse } from '../model/dto/RootResponse';
import { FileResponse } from '../model/dto/FileResponse';
import { MultimediaResponse } from '../model/dto/MultimediaResponse';
import { Files } from '../model/entities/files.entity';
import { Multimedia } from '../model/entities/multimedia.entity';
import { IMultimediaService } from './multimedia.crud.service.interface';
import * as dotenv from 'dotenv';
import { DisplayResponse } from '../model/dto/DisplayResponse';
import { DeleteResponse } from '../model/dto/DeleteResponse.interface';

dotenv.config();
//const Thumbler = require('thumbler');

@Injectable()
export class MultimediaCrudService extends TypeOrmCrudService<Multimedia> implements IMultimediaService {
  constructor(
    @InjectRepository(Multimedia) private readonly multimediaRepository: Repository<Multimedia>, // @Inject(forwardRef(() => TeamCrudService)) // private teamService: TeamCrudService,
    @InjectRepository(Files) private readonly filesRepository: Repository<Files>,
    @Inject('IFileStorageService') private readonly fileStorageService: IFileStorageService,
  ) {
    super(multimediaRepository);
  }
  videos = ['mp4', '3gp', 'ogg'];
  multimediaResponse: MultimediaResponse = {} as MultimediaResponse;
  fileResponse: FileResponse = {} as FileResponse;
  rootResponse: RootResponse = {} as RootResponse;
  folderResponse: FolderResponse = {} as FolderResponse;
  displayResponse: DisplayResponse = {} as DisplayResponse;
  globalLink = process.env.AWS_URL;
  /**
   * setImagePath method will set image fot that team
   * @param {teamId, path} .Takes teamId and path as input
   * @return {Images} Images as response for that team
   */
  async uploadFile(file: any, teamId: string): Promise<any> {
    let multimedia = new Multimedia();
    // console.log('Multimedia Service');
    // console.log(file);
    const originalPath = `uploads/uploads/multimedia/${teamId}/`;

    const output = await this.fileStorageService.uploadFile(file, originalPath);
    console.log('This is output');
    console.log(output);

    if (output) {
      const key = output.Key.split('/');
      multimedia.fileName = key[key.length - 1];
      multimedia.team = teamId;
      console.log(multimedia);
      console.log(multimedia.team);
      const result = await this.multimediaRepository.save(multimedia);
      // if (result && this.videos.includes(output.split('.')[1])) {
      //   this.fileStorageService.saveThumbail(output, originalPath);
      // }
      result.fileName = `${this.globalLink}/${teamId}/${result.fileName}`;
      return result;
    }
  }

  async uploadFileToFolder(teamId: string, albumId: string, file: any): Promise<any> {
    const multimedia = (await this.multimediaRepository.findOne({ where: { id: albumId } })) as Multimedia;
    const albumName = multimedia.albumName;
    let fileEntry = new Files();
    const originalPath = `uploads/uploads/multimedia/${teamId}/${albumName}/`;
    const fileUploaded = await this.fileStorageService.uploadFile(file, originalPath);
    if (fileUploaded) {
      const key = fileUploaded.Key.split('/');
      fileEntry.fileName = key[key.length - 1];
      fileEntry.album = multimedia.id;
      const fileSaved = await this.filesRepository.save(fileEntry);
      fileSaved.fileName = `${this.globalLink}/${teamId}/${albumName}/${fileSaved.fileName}`;
      return fileSaved;
    }
  }

  /**
   * getFilesForTeam method will fetch all images fot that team
   * @param {teamId} .Takes teamId as input
   * @return {MultimediaResponse} MultimediaResponse[] as response for that team
   */
  async getDefaultMultimediaForTeam(teamId: string): Promise<MultimediaResponse> {
    const link = `${this.globalLink}/${teamId}/`;
    const result = await this.multimediaRepository.find({
      where: { team: teamId },
      order: {
        albumName: 'ASC',
      },
    });
    if (result == null) {
      throw new NotFoundException('not found');
    } else {
      let rootFiles = this.getCommonFiles(result, link);

      if (rootFiles.length != 0) {
        this.multimediaResponse.display = this.getDisplay(rootFiles);
      } else {
        this.multimediaResponse.display = this.getDisplayFilesFromFolder(result, link);
      }
      this.multimediaResponse.root = this.getFolderList(result);
      return this.multimediaResponse;
    }
  }
  getDisplay(files: FileResponse[]) {
    let displayArray = [] as DisplayResponse[],
      i;
    for (i = 0; i < files.length; i++) {
      this.displayResponse.id = files[i].fileId;
      this.displayResponse.urlName = files[i].fileName;
      this.displayResponse.inSlideShow = files[i].inSlideShow;
      displayArray.push(this.displayResponse);
      this.displayResponse = {} as DisplayResponse;
    }
    return displayArray;
  }
  addFiles(files: Files[], albumName: string, inSlideShow: boolean, link?: string) {
    let displayArray = [] as DisplayResponse[],
      i;
    link = `${link}${albumName}/`;
    this.setStatusForFolder(albumName);
    for (i = 0; i < files.length; i++) {
      this.displayResponse.id = files[i].id;
      this.displayResponse.urlName = link + files[i].fileName;
      this.displayResponse.inSlideShow = inSlideShow;
      displayArray.push(this.displayResponse);
      this.displayResponse = {} as DisplayResponse;
    }
    return displayArray;
  }
  getCommonFiles(result: Multimedia[], link: string) {
    let fileArray = [] as FileResponse[],
      i;
    for (i = 0; i < result.length; i++) {
      if (result[i].fileName != null && result[i].albumName == null) {
        this.fileResponse.fileId = result[i].id;
        this.fileResponse.fileName = link + result[i].fileName;
        this.fileResponse.inSlideShow = result[i].inSlideshow;
        fileArray.push(this.fileResponse);
        this.fileResponse = {} as FileResponse;
      }
    }
    return fileArray;
  }

  getDisplayFilesFromFolder(result: Multimedia[], link?: string) {
    let fileArray = [] as DisplayResponse[],
      i;
    for (i = 0; i < result.length; i++) {
      if (result[i].albumName != null && result[i].fileName == null && result[i].files.length != 0) {
        return this.addFiles(result[i].files, result[i].albumName, result[i].inSlideshow, link);
      }
    }
    return fileArray;
  }
  getFolderList(result: Multimedia[]) {
    let fileArray = [] as FolderResponse[],
      i;
    for (i = 0; i < result.length; i++) {
      if (result[i].albumName != null && result[i].fileName == null) {
        this.folderResponse.folderId = result[i].id;
        this.folderResponse.folderName = result[i].albumName;
        this.folderResponse.inSlideShow = result[i].inSlideshow;
        this.folderResponse.status = this.getStatusForFolder(result[i].albumName);
        fileArray.push(this.folderResponse);
        this.folderResponse = {} as FolderResponse;
      }
    }
    return fileArray;
  }

  flag: boolean = false;
  folderName: string = '';
  setStatusForFolder(albumName: string) {
    this.folderName = albumName;
    this.flag = true;
  }
  getStatusForFolder(albumName: string) {
    if (albumName == this.folderName) {
      return this.flag;
    } else {
      return false;
    }
  }

  private async deleteFilesFromSubFolder(teamId: string, subFolderId: string, filesId: string[]) {
    let filesPath: string[] = [];
    const subFolder = await this.multimediaRepository.findOne(subFolderId);

    const commanPath = 'uploads/uploads/multimedia/' + teamId + '/' + subFolder?.albumName + '/';
    for (var k = 0; k < filesId.length; k++) {
      const file = (await this.filesRepository.findOne(filesId[k])) as Files;
      filesPath.push(commanPath + file.fileName);
    }
    console.log(filesPath);

    const fileDeletedFromDB = await this.filesRepository.delete(filesId);

    if (fileDeletedFromDB) {
      if (filesPath.length > 0) {
        return await this.fileStorageService.deleteMultipleFiles(filesPath);
      }
    }
  }

  private async deleteFilesAndFoldersFromRoot(teamId: string, filesId: string[], foldersId: string[]) {
    const commanPath = 'uploads/uploads/multimedia/' + teamId + '/';

    let foldersPath: string[] = [];
    let filesPath: string[] = [];
    for (var i = 0; i < foldersId.length; i++) {
      const folder = (await this.multimediaRepository.findOne(foldersId[i])) as Multimedia;
      foldersPath.push(commanPath + folder.albumName);
    }
    for (var i = 0; i < filesId.length; i++) {
      const file = (await this.multimediaRepository.findOne(filesId[i])) as Multimedia;
      filesPath.push(commanPath + file.fileName);
    }
    const finalList = filesId.concat(foldersId);
    const fileDeletedFromDB = await this.multimediaRepository.delete(finalList);
    if (fileDeletedFromDB) {
      let folderSuccess;
      let fileSuccess;

      if (foldersPath.length > 0) {
        folderSuccess = await this.fileStorageService.deleteMultipleFolders(foldersPath);
      }
      if (filesPath.length > 0) {
        fileSuccess = await this.fileStorageService.deleteMultipleFiles(filesPath);
      }
      if (folderSuccess && fileSuccess) {
        return folderSuccess;
      }
    }
  }

  /**
   * deleteMultipleFilesAndFolders method will delete multiple files & folders from root as well as subFolder
   * @param {teamId} .Takes teamId as input
   * @return {DeleteResponse} DeleteResponse as response having subfolder details, folderIds[] details & fileIds[] details
   */
  async deleteMultipleFilesAndFolders(teamId: string, deleteResponse: DeleteResponse): Promise<any> {
    if (deleteResponse.subFolderId === null) {
      console.log('delete files from root');
      console.log(deleteResponse);
      return await this.deleteFilesAndFoldersFromRoot(teamId, deleteResponse.filesId, deleteResponse.foldersId);
    } else {
      console.log('delete files from sub folder');
      console.log(deleteResponse);
      return await this.deleteFilesFromSubFolder(teamId, deleteResponse.subFolderId, deleteResponse.filesId);
    }
  }

  async addFolder(teamId: string, folderName: string): Promise<Multimedia> {
    if (folderName === '') {
      throw new NotAcceptableException();
    }
    folderName = folderName.toLowerCase();
    let multimediaOBJ = new Multimedia();
    multimediaOBJ.albumName = folderName;
    multimediaOBJ.team = teamId;
    const result = await this.multimediaRepository.save(multimediaOBJ);

    console.log(result);
    return result;
  }

  /**
   * getFilesForTeam method will fetch all images fot that team
   * @param {teamId} .Takes teamId as input
   * @return {FileResponse} FileResponse[] as response for that team
   */
  async getAllFilesInFolderForTeam(teamId: string, folderId: string): Promise<DisplayResponse[]> {
    let filesArray = [] as DisplayResponse[],
      i;
    const result = await this.multimediaRepository.find({ where: { team: teamId, id: folderId } });
    console.log(result);
    if (result == null) {
      return filesArray;
    }
    const link = `${this.globalLink}/${teamId}/${result[0].albumName}/`;
    for (i = 0; i < result[0].files.length; i++) {
      this.displayResponse.id = result[0].files[i].id;
      this.displayResponse.urlName = link + result[0].files[i].fileName;
      filesArray.push(this.displayResponse);
      this.displayResponse = {} as DisplayResponse;
    }
    return filesArray;
  }

  async getAllFilesForTeam(teamId: string): Promise<DisplayResponse[]> {
    let filesArray = [] as DisplayResponse[],
      i,
      j;
    const result = await this.multimediaRepository.find({ where: { team: teamId } });
    console.log(result);
    if (result == null) {
      return filesArray;
    }
    let link1 = `${this.globalLink}/${teamId}/`;
    for (i = 0; i < result.length; i++) {
      if (result[i].fileName == null) {
        let a = result[i];
        for (j = 0; j < a.files.length; j++) {
          let link2 = `${this.globalLink}/${teamId}/${a.albumName}/`;
          this.displayResponse.urlName = link2 + a.files[j].fileName;
          filesArray.push(this.displayResponse);
          this.displayResponse = {} as DisplayResponse;
        }
      } else {
        this.displayResponse.urlName = link1 + result[i].fileName;
        filesArray.push(this.displayResponse);
        this.displayResponse = {} as DisplayResponse;
      }
    }
    return filesArray;
  }

  async addFilesAndFoldersIntoSlideshow(teamId: string, fileAndFolderIds: string[]): Promise<Multimedia[]> {
    let finalMultimediaList: Multimedia[] = [];
    let resetMultimedia = (await this.multimediaRepository.find({
      where: { team: teamId },
    })) as Multimedia[];
    for (var i = 0; i < resetMultimedia.length; i++) {
      resetMultimedia[i].inSlideshow = false;
    }
    let multimedia = await this.multimediaRepository.save(resetMultimedia);
    console.log(multimedia);
    for (var j = 0; j < multimedia.length; j++) {
      if (fileAndFolderIds.includes(multimedia[j].id)) {
        multimedia[j].inSlideshow = true;

        finalMultimediaList.push(multimedia[j]);
      }
    }

    return await this.multimediaRepository.save(finalMultimediaList);
  }

  async getMultimediaForSlideshow(teamId: string): Promise<any> {
    let result: { fileURL: string }[] = [];
    const commanPath =
      'https://powerboard-test.s3.eu-central-1.amazonaws.com/uploads/uploads/multimedia/' + teamId + '/';

    let multimedia = await this.multimediaRepository.find({ where: { team: teamId, inSlideshow: true } });

    for (var i = 0; i < multimedia.length; i++) {
      if (multimedia[i].albumName === null) {
        result.push({ fileURL: commanPath + multimedia[i].fileName });
      } else {
        for (var j = 0; j < multimedia[i].files.length; j++) {
          result.push({ fileURL: commanPath + multimedia[i].albumName + '/' + multimedia[i].files[j].fileName });
        }
      }
    }
    return result;
  }
}
