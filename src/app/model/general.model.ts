export class PowerboardResponse{
    team_id: string;
    team_name: string;
    center: string;
    team_code: string;
    logo: string;
    dashboard: Dashboard = new Dashboard();
    images? : ImageResponse[];
    teamLinks: LinkResponse[];
    privileges : string[];
    videos? : VideoResponse[];
    multimedia : Multimedia;
 
}

export class Multimedia{
    rootResponse : MultimediaFiles[];
    folderResponse : FolderResponse[];
}
export class MultimediaFiles{
    fileId : string;
    fileName : string;
}
export class FolderResponse{
    folderId : string;
    folderName : string;
    fileResponse? : MultimediaFiles[];
}

 export class TeamDetailResponse{
     powerboardResponse : PowerboardResponse = new PowerboardResponse(); 
   
   
 }
 
export class Dashboard{
    teamId:string;
    teamStatus:number;
    sprintWorkUnit: string;
    codeQuality:CodeQualityResponse = new CodeQualityResponse();
    clientStatus:ClientStatusResponse = new ClientStatusResponse();
    teamSpirit:TeamSpiritResponse = new TeamSpiritResponse();
    burndown:BurndownResponse = new BurndownResponse();
    sprintDetail:SprintDetailResponse = new SprintDetailResponse();
    velocity:VelocityResponse = new VelocityResponse();
}
export class CodeQualityResponse{
    bugs:number;
    codeSmells: number;
    codeCoverage:number
    status: string;
}
export class ClientStatusResponse{
    clientSatisfactionRating: number;
    sprintNumber: number;
}
export class TeamSpiritResponse{
    teamSpiritRating: number;
    sprintNumber: number;
}
export class BurndownResponse{
    workUnit: string;
    remainingDays: number;
    remainingWork: number;
    count: number;
    burndownStatus: string;
}
export class SprintDetailResponse{
    Sprint_current_day: number;
    sprint_number: number;
    Sprint_days: number;
}
export class VelocityResponse{
    Avg: number;
    Committed: number;
    Completed: number;
}

export class LinkResponse{
    teamLinkId: string;
    linkName: string;
    linkType: string;
    links: string;

}

export class LinksCategory {
    linkId: string;
    linkTitle: string;
  }
export class ImageResponse{
    ImageId: string;
    ImagePath: string;
}
export class VideoResponse{
    videoId: string;
    videoPath: string;
}
export class VisibleResponse{
    teamId: string;
    image: boolean;
    video: boolean;
    dailyMeeting: boolean;
    teamLinks: boolean;
}

export class MultimediaFolderResponse{
    display : MultimediaFilesNew[];
    root : rootNew[];
    }
    
    export class MultimediaFilesNew{
        id : string;
        urlName : string;
    }
    export class rootNew{
        folderId : string;
        folderName : string; 
        status : boolean;
    }