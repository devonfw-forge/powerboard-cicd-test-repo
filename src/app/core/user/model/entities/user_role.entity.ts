import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Privileges } from './privileges.entity';

@Entity('user_role')
export class UserRole extends BaseEntity {
  @Column('varchar', { name: 'role_name', length: 255, nullable: false })
  roleName!: string;

  @Column('varchar', { name: 'role_description', length: 1000, nullable: true })
  description!: string;

  @ManyToMany(() => Privileges, { eager: true, cascade: true })
  @JoinTable({
    name: 'user_role_privilege',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'privilege_id',
      referencedColumnName: 'id',
    },
  })
  privilege!: Privileges[];
}
