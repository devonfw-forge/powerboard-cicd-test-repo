import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';

@Entity()
export class SprintMetric extends BaseEntity {
  @Column('varchar', { nullable: false })
  name!: string;
}
