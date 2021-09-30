import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../model/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { UserDTO } from '../model/dto/UserDTO';
import { ChangePasswordDTO } from '../../auth/model/ChangePasswordDTO';
import { IUserTeamService } from './user-team.service.interface';
import { IUserService } from './user.service.interface';
import { IUserSessionDetailsService } from './user-session-details.service.interface';
import { IEmailService } from '../../../email/services/email.service.interface';
import { SendEmailDTO } from '../../../email/model/dto/SendEmail.dto';

var generator = require('generate-password');

@Injectable()
export class UserService extends TypeOrmCrudService<User> implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    //@InjectRepository(UserSessionDetails) private readonly userInfoRepository: Repository<UserSessionDetails>,
    @Inject('IUserTeamService') private readonly userTeamService: IUserTeamService,
    @Inject('IUserSessionDetailsService') private readonly userSessionDetailsService: IUserSessionDetailsService, //private readonly userTeamService: UserTeamService,
    @Inject('IEmailService') private readonly emailService: IEmailService,
  ) {
    super(userRepository);
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  /**
   * registerUser method will register the user as well as add user to other team also
   * @param {UserDTO} .Takes as input
   * @return {User} created User as response
   */
  async registerUser(userDTO: UserDTO): Promise<any> {
    console.log('This is user DTO');
    console.log(userDTO);
    const actualUser = await this.findUser(userDTO.username);
    if (actualUser) {
      console.log(actualUser);
      return this.userTeamService.addUserToTeam(actualUser, userDTO);
    }
    var password = generator.generate({ length: 6, numbers: true });
    //console.log(password);
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    const salt = await genSalt(12);
    const hashPass = await hash(password, salt);

    let user = new User();
    user.username = userDTO.username;
    user.password = hashPass;
    user.email = userDTO.email;
    const result = await this.userRepository.save(user);

    console.log('This is the saved user in user table');
    console.log(result.id);
    //save the user session object into the DB here
    if (result) {
      let sendEmailDTO: SendEmailDTO = {} as SendEmailDTO;
      sendEmailDTO.username = result.username;
      sendEmailDTO.toEmail = result.email;
      sendEmailDTO.defaultPassword = password;
      this.emailService.sendTeamplateEmail(sendEmailDTO);
      this.userSessionDetailsService.registerUserIntoUserSession(result.id);
      return this.userTeamService.addUserToTeam(result, userDTO);
    }
  }

  async changePassword(changePassword: ChangePasswordDTO): Promise<any> {
    const output = await this.userRepository.findOne({ where: { id: changePassword.userId } });
    const user = new User();
    if (output && (await compare(changePassword.oldPassword, output.password))) {
      user.id = output.id;
      const salt = await genSalt(12);
      const hashPass = await hash(changePassword.newPassword, salt);
      user.password = hashPass;
      const updatedUser = await this.userRepository.save(user);
      if (updatedUser) {
        await this.userSessionDetailsService.updateUserSessionAfterPasswordChange(updatedUser.id);
      } else {
        console.log('User Not found');
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    }
  }

  async deleteGuestById(guestId: string): Promise<DeleteResult> {
    const user = (await this.userRepository.findOne({ where: { id: guestId } })) as User;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.delete(guestId);
  }
}
