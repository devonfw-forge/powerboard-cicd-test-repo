export class UserSessionDetailsMockService {
  constructor() {}
  public getUserSessionDetails = jest.fn();
  public updateUserSessionAfterPasswordChange = jest.fn();
  public registerUserIntoUserSession = jest.fn();
  public updateLastLoggedInProject = jest.fn();
}
