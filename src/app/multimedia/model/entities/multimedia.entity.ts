import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { Team } from '../../../teams/model/entities/team.entity';
import { Files } from './files.entity';

@Entity()
export class Multimedia extends BaseEntity {
  @Column('varchar', { name: 'album_name', length: 1000, nullable: true })
  albumName!: string;

  @Column('varchar', { name: 'file_name', length: 1000, nullable: true })
  fileName!: string;

  @Column('boolean', { name: 'in_slideshow', default: false })
  inSlideshow!: boolean;

  @ManyToOne(() => Team, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'multimedia_team_id', referencedColumnName: 'id' })
  team!: string;

  @OneToMany(() => Files, files => files.album, { eager: true })
  files!: Files[];
}
