//import { CodeQualitySnapshot } from '../../src/app/code-quality-snapshot/model/entities/code-quality-snapshot.entity';

export class MockRepository {
  constructor() {}
  public createQueryBuilder = jest.fn(() => this.queryBuilder);

  public manager = { transaction: (a: () => any) => Promise.resolve(a()) };
  public metadata = { connection: { options: { type: null } }, columns: [], relations: [] };

  public save = jest.fn();
  public delete = jest.fn();
  public update = jest.fn();
  public findOne = jest.fn();
  public findOneOrFail = jest.fn();
  public find = jest.fn();
  public getMany = jest.fn();

  public queryBuilder = {
    offset: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    addFrom: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    getMany: jest.fn(),
    getOne: jest.fn(),
    delete: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
  };
}

export class CodeQualityRepositoryMock extends MockRepository {}
export class TeamSpiritRepositoryMock extends MockRepository {}
export class SprintRepositoryMock extends MockRepository {}
export class ClientStatusRepositoryMock extends MockRepository {}
export class TeamRepositoryMock extends MockRepository {}
export class BusinessUnitRepositoryMock extends MockRepository {}
export class UserRepositoryMock extends MockRepository {}
export class DailyMeetingLinkMock extends MockRepository {}
export class TeamLinksMockRepo extends MockRepository {}
export class LinksCategoryMock extends MockRepository {}
export class MultimediaRepositoryMock extends MockRepository {}
export class VisibilityMock extends MockRepository {}
export class UserRoleRepositoryMock extends MockRepository {}
export class UserTeamRepositoryMock extends MockRepository {}
export class UserInfoRepositoryMock extends MockRepository {}
export class ADCenterRepositoryMock extends MockRepository {}
export class UserSessionDetailsRepositoryMock extends MockRepository {}
export class TeamStatusRepositoryMock extends MockRepository {}
