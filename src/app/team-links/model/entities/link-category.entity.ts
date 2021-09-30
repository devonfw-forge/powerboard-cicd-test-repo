import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class LinksCategory extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  title!: string;
}
