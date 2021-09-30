import { CodeQualityResponse } from '../model/dto/CodeQualityResponse';

export interface ICodeQualityService {
  //to fetch code quality snapshot on basis of team ID
  getCodeQualitySnapshot(teamId: string): Promise<CodeQualityResponse | undefined>;
}
