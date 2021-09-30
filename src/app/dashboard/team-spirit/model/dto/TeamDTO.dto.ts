import { SurveyDTO } from './SurveyDTO.dto';
import { TeamSpiritUserDTO } from './TeamSpiritUserDTO.dto';

export class TeamDTO {
  Frequency?: number;
  Name!: string;
  Num_mumbers?: number;
  StartDate?: string;
  Surveys?: SurveyDTO[];
  Users?: TeamSpiritUserDTO[];
}

// "frequency": 0,
// "name": "string",
// "num_mumbers": 0,
// "startDate": "string",
// "surveys": [
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
// "users": [
//   {
//     "RoleID": 0,
//     "email": "string",
//     "full_name": "string",
//     "id": 0,
//     "password": "string",
//     "role": {
//       "id": 0,
//       "name": "string"
//     },
//     "teams": [
//       null
//     ]
//   }
// ]
