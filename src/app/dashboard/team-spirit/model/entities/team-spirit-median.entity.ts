import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Team } from '../../../../teams/model/entities/team.entity';

@Entity()
export class TeamSpiritMedian extends BaseEntity {
  @Column('int', { name: 'survey_median', nullable: true })
  surveyMedian!: number;

  @Column('timestamp', { name: 'start_date', nullable: true })
  startDate!: string;

  @Column('timestamp', { name: 'end_date', nullable: true })
  endDate!: string;

  @Column('varchar', { name: 'survey_code', nullable: true })
  surveyCode!: string;

  @ManyToOne(() => Team, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_name', referencedColumnName: 'name' })
  teamName!: Team;
}
