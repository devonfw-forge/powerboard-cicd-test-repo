import { Team } from '../../../teams/model/entities/team.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
@Entity()
export class Visibility extends BaseEntity {
  @Column('boolean', { name: 'daily_meeting', nullable: true })
  dailyMeeting!: boolean;

  @Column('boolean', { name: 'team_link', nullable: true })
  teamLink!: boolean;

  @Column('boolean', { name: 'images', nullable: true })
  images!: boolean;

  @Column('boolean', { name: 'videos', nullable: true })
  videos!: boolean;

  @OneToOne(() => Team, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'visibility_team_id', referencedColumnName: 'id' })
  team!: string;
}
