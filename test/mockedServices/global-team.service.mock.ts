export class GlobalTeamMockService {
  constructor() {}

  public getTeamsByCenterId = jest.fn();
  public uploadLogoForTeam = jest.fn();
  public deleteLogoFromTeam = jest.fn();
  public addTeam = jest.fn();
  public deleteTeamById = jest.fn();
  public getAllTeams = jest.fn();
  public viewTeamsInADC = jest.fn();
  public findTeamById = jest.fn();
  public findStatusByTeam = jest.fn();
  public updateTeamStatus = jest.fn();
}
