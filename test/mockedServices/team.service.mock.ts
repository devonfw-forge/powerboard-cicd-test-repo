export class TeamMockService {
  constructor() {}

  public getTeamInfoById = jest.fn();
  public updateTeam = jest.fn();
  public getCenterByTeamId = jest.fn();
  public getLinksForTeam = jest.fn();
  public getMultimediaForTeam = jest.fn();
}
