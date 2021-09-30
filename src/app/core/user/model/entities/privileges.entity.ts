import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Privileges extends BaseEntity {
  @Column('varchar', { name: 'privilege_name', length: 255, nullable: false })
  privilegeName!: string;

  @Column('varchar', { name: 'privilege_description', length: 1000, nullable: true })
  description!: string;
}
