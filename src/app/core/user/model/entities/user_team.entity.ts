import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Team } from '../../../../teams/model/entities/team.entity';
import { UserRole } from './user_role.entity';

@Entity('user_team')
export class UserTeam extends BaseEntity {
  @ManyToOne(() => User, user => user.userTeam, { eager: true, nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_Id' })
  user!: User;

  @ManyToOne(() => Team, team => team.userTeam, { eager: true, nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_Id' })
  team!: Team;

  @ManyToOne(() => UserRole, { eager: true })
  @JoinColumn({ name: 'user_role_id', referencedColumnName: 'id' })
  role!: UserRole;
}
