import { ViewCentersResponse } from '../model/dto/ViewCentersResponse';

export interface IADCenterService {
  getAllCenters(): Promise<ViewCentersResponse[]>;
}
