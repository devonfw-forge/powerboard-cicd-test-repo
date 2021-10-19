export class MultimediaMockService {
  constructor() {}
  //public getAllCenters = jest.fn();

  public getDefaultMultimediaForTeam = jest.fn();
  public uploadFile = jest.fn();
  public getAllFilesInFolderForTeam = jest.fn();
  public uploadFileToFolder = jest.fn();
  public deleteMultipleFilesAndFolders = jest.fn();
  public getAllFilesForTeam = jest.fn();
  public addFolder = jest.fn();
  public addFilesAndFoldersIntoSlideshow = jest.fn();
  public getMultimediaForSlideshow = jest.fn();
  public deleteFilesAndFoldersFromRoot = jest.fn();
  public deleteFilesFromSubFolder = jest.fn();
}
