import { Sprint } from '../../../sprint/model/entities/sprint.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';

@Entity()
export class ClientStatus extends BaseEntity {
  @Column('int', { nullable: false })
  client_rating!: number;

  @OneToOne(() => Sprint, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sprintId', referencedColumnName: 'id' })
  sprint!: Sprint;
}
