//import { CodeQualitySnapshot } from '../../src/app/code-quality-snapshot/model/entities/code-quality-snapshot.entity';

//import { CodeQualitySnapshot } from '../../src/app/code-quality-snapshot/model/entities/code-quality-snapshot.entity';

export class UserPrivilegeMockService {
  constructor() {}
  // public createQueryBuilder = jest.fn(() => this.queryBuilder);

  // public manager = { transaction: (a: () => any) => Promise.resolve(a()) };
  // public metadata = { connection: { options: { type: null } }, columns: [], relations: [] };
  public getUserPrivilegeForTeam = jest.fn();
  public getPrivilegeList = jest.fn();
  public getAllPrivilegeForAdmin = jest.fn();
  public getAllUserRoles = jest.fn();
  public findRole = jest.fn();
}
