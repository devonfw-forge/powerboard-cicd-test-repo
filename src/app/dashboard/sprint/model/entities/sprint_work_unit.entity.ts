import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';

@Entity()
export class SprintWorkUnit extends BaseEntity {
  @Column('varchar', { nullable: false })
  work_unit!: string;
}
