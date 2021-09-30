import { NotesDTO } from './NotesDTO.dto';

export class SurveyDTO {
  TeamName!: string;
  Code?: string;
  EndDate!: string;
  Median?: number;
  Note?: NotesDTO[];
  StartDate?: string;
}

//"surveys": [
//   {
//     "TeamName": "string",
//     "code": "string",
//     "endDate": "string",
//     "median": 0,
//     "notes": [
//       {
//         "Number": 0,
//         "SurveyCode": "string",
//         "User": "string",
//         "note": 0
//       }
//     ],
//     "startDate": "string"
//   }
// ],
