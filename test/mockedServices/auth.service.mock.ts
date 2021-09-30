//import { CodeQualitySnapshot } from '../../src/app/code-quality-snapshot/model/entities/code-quality-snapshot.entity';

//import { CodeQualitySnapshot } from '../../src/app/code-quality-snapshot/model/entities/code-quality-snapshot.entity';

export class AuthMockService {
  constructor() {}
  // public createQueryBuilder = jest.fn(() => this.queryBuilder);

  // public manager = { transaction: (a: () => any) => Promise.resolve(a()) };
  // public metadata = { connection: { options: { type: null } }, columns: [], relations: [] };

  public validateUser = jest.fn();
  public signIn = jest.fn();
  public login = jest.fn();
  public loginGuest = jest.fn();
  public systemAdminHome = jest.fn();
  public getPrivileges = jest.fn();
  public teamMemberTeamAdminHome = jest.fn();

  public homeDetailsForTeamMemberAdmin = jest.fn();
  public getHomeDetailsForUserId = jest.fn();
  public register = jest.fn();
  public changePassword = jest.fn();
}
