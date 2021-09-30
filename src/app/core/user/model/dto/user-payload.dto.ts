import { User } from '../entities/user.entity';

export class UserPayload implements Pick<User, 'id' | 'username'> {
  id!: string;
  username!: string;
}
