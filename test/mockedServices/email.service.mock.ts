export class EmailMockService {
  constructor() {}
  public sendTeamplateEmail = jest.fn();
  public getSES = jest.fn();
}
