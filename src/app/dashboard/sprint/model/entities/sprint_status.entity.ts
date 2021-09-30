import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';

@Entity()
export class SprintStatus extends BaseEntity {
  @Column('varchar', { nullable: false })
  status!: string;
}
