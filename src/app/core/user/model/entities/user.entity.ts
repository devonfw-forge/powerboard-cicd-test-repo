import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserTeam } from './user_team.entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false, unique: true })
  username!: string;

  @Column('varchar', { length: 255, nullable: false })
  @Exclude({ toPlainOnly: true })
  password!: string;

  @Column('varchar', { length: 255, nullable: true, unique: true })
  email!: string;

  @OneToMany(() => UserTeam, userteam => userteam.user, { nullable: true })
  userTeam!: UserTeam[];
}
