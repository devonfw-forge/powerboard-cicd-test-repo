import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Response as eResponse } from 'express';
import { Multimedia } from '../model/entities/multimedia.entity';
import { IMultimediaService } from '../services/multimedia.crud.service.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResponse } from '../model/dto/DeleteResponse.interface';

@Crud({
  model: {
    type: Multimedia,
  },
})
@CrudType(Multimedia)
@Controller('multimedia')
export class MultimediaCrudController {
  constructor(@Inject('IMultimediaService') public multimediaService: IMultimediaService) {}

  @Post('uploadFile/:teamId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: any,
    @Param('teamId') teamId: string,
    @Response() res: eResponse,
  ): Promise<void> {
    const result = await this.multimediaService.uploadFile(file, teamId);
    res.status(201).json(result);
  }

  @Post('uploadFileToFolder/:albumId/:teamId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileToFolder(
    @UploadedFile() file: any,
    @Param('teamId') teamId: string,
    @Param('albumId') albumId: string,
    @Response() res: eResponse,
  ): Promise<void> {
    const result = await this.multimediaService.uploadFileToFolder(teamId, albumId, file);
    res.status(201).json(result);
  }

  @Get('getDefaultView/:teamId')
  //@UseGuards(AuthGuard('jwt'))
  async getAllAlbums(@Param('teamId') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.multimediaService.getDefaultMultimediaForTeam(teamId);
    res.status(200).json(result);
  }

  @Get('getAllFilesInFolder/:teamId/:folderId')
  //@UseGuards(AuthGuard('jwt'))
  async getAllFilesInFolderForTeam(
    @Param('teamId') teamId: string,
    @Param('folderId') folderId: string,
    @Response() res: eResponse,
  ): Promise<void> {
    const result = await this.multimediaService.getAllFilesInFolderForTeam(teamId, folderId);
    res.status(200).json(result);
  }

  @Delete('deleteFilesAndFolders/:teamId')
  async deleteMultipleFilesAndFolders(
    @Param('teamId') teamId: string,
    @Body() deleteResponse: DeleteResponse,
    @Response() res: eResponse,
  ): Promise<void> {
    const result = await this.multimediaService.deleteMultipleFilesAndFolders(teamId, deleteResponse);
    console.log('delete files controller');
    console.log(result);
    res.status(200).json({ message: 'File or Folders successfully Deleted' });
  }

  @Get('getAllFilesForTeam/:teamId')
  //@UseGuards(AuthGuard('jwt'))
  async getAllFilesForTeam(@Param('teamId') teamId: string, @Response() res: eResponse): Promise<any> {
    const result = await this.multimediaService.getAllFilesForTeam(teamId);
    res.status(200).json(result);
  }

  @Post('addFolder/:teamId')
  async addFolderInRoot(
    @Param('teamId') teamId: string,
    @Body() folderName: { name: string },
    @Response() res: eResponse,
  ): Promise<void> {
    console.log(folderName);
    const result = await this.multimediaService.addFolder(teamId, folderName.name);
    res.status(201).json(result);
  }

  @Post('addToSlideshow/:teamId')
  async addFilesAndFoldersIntoSlideshow(
    @Param('teamId') teamId: string,
    @Body() itemIds: { fileAndFolderIds: string[] },
    @Response() res: eResponse,
  ): Promise<void> {
    const result = await this.multimediaService.addFilesAndFoldersIntoSlideshow(teamId, itemIds.fileAndFolderIds);
    res.status(201).json(result);
  }

  @Get('slideshow/:teamid')
  async getMultimediaForSlideshow(@Param('teamid') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.multimediaService.getMultimediaForSlideshow(teamId);
    res.status(200).json(result);
  }
}
