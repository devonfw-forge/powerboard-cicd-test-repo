//import { CodeQualitySnapshot } from '../../src/app/code-quality-snapshot/model/entities/code-quality-snapshot.entity';

//import { CodeQualitySnapshot } from '../../src/app/code-quality-snapshot/model/entities/code-quality-snapshot.entity';

export class UserTeamMockService {
  constructor() {}
  // public createQueryBuilder = jest.fn(() => this.queryBuilder);

  // public manager = { transaction: (a: () => any) => Promise.resolve(a()) };
  // public metadata = { connection: { options: { type: null } }, columns: [], relations: [] };

  findUserTeamDetails = jest.fn();
  addUserToTeam = jest.fn();
  deleteUserFromTeamById = jest.fn();
  getAllMemberOfTeam = jest.fn();
  updateUserRole = jest.fn();
  findUserTeamsByUserId = jest.fn();
  findUserTeamForAdmin = jest.fn();
  isSystemAdmin = jest.fn();
}
