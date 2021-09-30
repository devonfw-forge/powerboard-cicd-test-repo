import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { SprintSnapshot } from './sprintSnapshot.entity';
import { SprintMetric } from './sprint_metric.entity';

@Entity()
export class SprintSnapshotMetric extends BaseEntity {
  @ManyToOne(() => SprintSnapshot, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'snapshot_id', referencedColumnName: 'id' })
  snapshot!: SprintSnapshot;

  @ManyToOne(() => SprintMetric, { eager: true })
  @JoinColumn({ name: 'metric_id', referencedColumnName: 'id' })
  metric!: SprintMetric;

  @Column('varchar', { nullable: false })
  value!: string;
}
