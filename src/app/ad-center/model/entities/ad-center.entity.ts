import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class ADCenter extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  name!: string;
}
