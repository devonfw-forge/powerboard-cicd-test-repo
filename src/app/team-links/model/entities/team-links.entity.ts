import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Team } from '../../../teams/model/entities/team.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { LinksCategory } from './link-category.entity';

@Entity()
export class TeamLinks extends BaseEntity {
  @ManyToOne(() => LinksCategory, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'link_title', referencedColumnName: 'id' })
  linkType!: LinksCategory;

  @Column('varchar', { name: 'link_name', length: 255, nullable: false })
  linkName!: string;

  @Column('varchar', { name: 'link', length: 5000, nullable: false })
  link!: string;

  @ManyToOne(() => Team, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team!: string;
}
