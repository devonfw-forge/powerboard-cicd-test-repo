import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { VisibilityDTO } from '../model/dto/VisibilityDTO';
import { VisibilityResponse } from '../model/dto/VisibilityResponse';
import { Visibility } from '../model/entities/visibility.entity';

@Injectable()
export class VisibilityCrudService extends TypeOrmCrudService<Visibility> {
  constructor(@InjectRepository(Visibility) private readonly visibilityRepository: Repository<Visibility>) {
    super(visibilityRepository);
  }
  async setVisibility(visibility: VisibilityDTO): Promise<any> {
    const output = (await this.visibilityRepository.findOne({ where: { team: visibility.teamId } })) as Visibility;
    let visible = new Visibility();
    if (output) {
      visible.id = output.id;
    }
    visible.team = visibility.teamId;
    if (visibility.name == 'images') {
      visible.images = visibility.value;
    } else if (visibility.name == 'dailyMeeting') {
      visible.dailyMeeting = visibility.value;
    } else if (visibility.name == ' teamLink') {
      visible.teamLink = visibility.value;
    } else {
      visible.videos = visibility.value;
    }
    const result = await this.visibilityRepository.save(visible);
    return result;
  }

  visibility: VisibilityResponse = {} as VisibilityResponse;
  async getVisiblilityForTeam(teamId: string): Promise<VisibilityResponse | undefined> {
    const result = (await this.visibilityRepository.findOne({ where: { team: teamId } })) as Visibility;
    if (result == null) {
      return undefined;
    } else {
      console.log('Visibility*******************');
      console.log(result);
      this.visibility.teamId = teamId;
      this.visibility.image = result.images;
      this.visibility.video = result.videos;
      this.visibility.dailyMeeting = result.dailyMeeting;
      this.visibility.teamLinks = result.teamLink;
      return this.visibility;
    }
  }
}
