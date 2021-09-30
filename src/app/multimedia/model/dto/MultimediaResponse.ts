import { DisplayResponse } from './DisplayResponse';
import { RootResponse } from './RootResponse';

export interface MultimediaResponse {
  root?: RootResponse[];
  display?: DisplayResponse[];
}
