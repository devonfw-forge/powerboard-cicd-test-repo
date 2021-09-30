import { ClientStatusResponse } from '../model/dto/ClientStatusResponse';

export interface IClientStatusService {
  getClientFeedback(teamId: string): Promise<ClientStatusResponse | undefined>;
}
