import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserSession extends BaseEntity {
  @Column('uuid', { name: 'user_id', unique: true })
  userId!: string;

  @Column('boolean', { name: 'is_password_changed', default: false })
  isPasswordChanged!: boolean;

  @Column('uuid', { name: 'last_checked_project_id', nullable: true })
  lastCheckedInProjectId!: string;
}
