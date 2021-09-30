import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { ChangePasswordDTO } from '../../auth/model/ChangePasswordDTO';
import { UserDTO } from '../model/dto/UserDTO';
import { User } from '../model/entities/user.entity';

export interface IUserService {
  findUser(username: string): Promise<User | undefined>;
  registerUser(userDTO: UserDTO): Promise<any>;
  changePassword(changePassword: ChangePasswordDTO): Promise<any>;
  deleteGuestById(guestId: string): Promise<DeleteResult>;
}
