import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Sprint } from './sprint.entity';

@Entity()
export class SprintSnapshot extends BaseEntity {
  @ManyToOne(() => Sprint, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sprint_id', referencedColumnName: 'id' })
  sprint!: Sprint;

  @Column('timestamp', { nullable: false })
  date_time!: string;
}
