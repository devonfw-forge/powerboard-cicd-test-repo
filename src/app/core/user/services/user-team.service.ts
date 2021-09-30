import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../model/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserTeam } from '../model/entities/user_team.entity';
import { UserDTO } from '../model/dto/UserDTO';
import { TeamsMemberResponse } from '../../../shared/interfaces/teamMemberResponse';
import { UpdateUserRoleDTO } from '../model/dto/UpdateUserRoleDTO';
import { IUserTeamService } from './user-team.service.interface';
import { UserRole } from '../model/entities/user_role.entity';

@Injectable()
export class UserTeamService extends TypeOrmCrudService<UserTeam> implements IUserTeamService {
  constructor(
    @InjectRepository(UserTeam) private readonly userTeamRepository: Repository<UserTeam>,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>, //@Inject('IUserPrivilegeService') private readonly userPrivilegeService: IUserPrivilegeService,
  ) {
    super(userTeamRepository);
  }

  /**
   * addUserToTeam method will add user to other teams
   * @param {User, UserDTO} .Takes as input
   * @return {UserTeam} UserTeam as response
   */
  async addUserToTeam(actualUser: User, userDTO: UserDTO): Promise<any> {
    let userTeam = new UserTeam();
    userTeam.user = actualUser;
    //const roleObj = await this.userPrivilegeService.findRole(userDTO.role);
    const roleObj = (await this.userRoleRepository.findOne({ where: { id: userDTO.role } })) as UserRole;
    const output = (await this.userTeamRepository.findOne({
      where: { user: actualUser.id, team: userDTO.team.id },
    })) as UserTeam;
    console.log('output from userTeamRepository');
    console.log(output);
    if (output) {
      throw new ConflictException('User in team already exists');
    }
    userTeam.role = roleObj;
    userTeam.team = userDTO.team;
    return await this.userTeamRepository.save(userTeam);
  }

  /**
   * deleteUserFromTeamById method will delete user , and system admin can do so
   * @param {userteamId} .Takes userTeamId as input
   * @return {void}
   */
  async deleteUserFromTeamById(id: string): Promise<DeleteResult> {
    const userTeam = (await this.userTeamRepository.findOne({ where: { id: id } })) as UserTeam;
    if (!userTeam) {
      throw new NotFoundException('user not found for that team');
    } else {
      return await this.userTeamRepository.delete(id);
    }
  }

  /**
   * getAllMemberOfTeam method will fetch all user of team , and system admin can do so
   * @param {teamId} .Takes teamId as input
   * @return {TeamsMemberResponse[]} .Return array of team member as response
   */
  async getAllMemberOfTeam(teamId: string): Promise<TeamsMemberResponse[]> {
    const result = (await this.userTeamRepository.find({ where: { team: teamId } })) as UserTeam[];
    if (result.length == 0) {
      throw new NotFoundException('No Member Found in team');
    }
    let teamsMemberResponse: TeamsMemberResponse = {} as TeamsMemberResponse;
    let teamMemberList = [],
      i;
    for (i = 0; i < result.length; i++) {
      teamsMemberResponse.userTeamId = result[i].id;
      teamsMemberResponse.userId = result[i].user.id;
      teamsMemberResponse.teamId = result[i].team.id;
      teamsMemberResponse.roleId = result[i].role.id;
      teamsMemberResponse.userName = result[i].user.username;
      teamsMemberResponse.email = result[i].user.email;
      teamMemberList.push(teamsMemberResponse);

      teamsMemberResponse = {} as TeamsMemberResponse;
    }
    return teamMemberList;
  }

  /**
   * findUserTeamForAdmin method will fetch object of UserTeam on basis of userId only for admin
   * @param {userId} .Takes userId as input
   * @return {UserTeam} .Return object of UserTeam as response
   */
  async findUserTeamForAdmin(userId: string) {
    const userTeam = (await this.userTeamRepository.findOne({ where: { user: userId } })) as UserTeam;
    return userTeam;
  }

  /**
   * updateUserRole method will update role of user and admin can do so
   * @param {UpdateUserRoleDTO} .Takes UpdateUserRoleDTO as input
   * @return {UserTeam} .Return object of UserTeam as response
   */
  async updateUserRole(updateRoleDTO: UpdateUserRoleDTO): Promise<UserTeam> {
    let userTeam = (await this.userTeamRepository.findOne({
      where: { user: updateRoleDTO.userId, team: updateRoleDTO.teamId },
    })) as UserTeam;

    if (!userTeam) {
      throw new NotFoundException('User in team not found');
    }
    let userTeamOBJ = new UserTeam();
    userTeamOBJ.id = userTeam.id;
    //userTeamOBJ.role = await this.userPrivilegeService.findRole(updateRoleDTO.roleId);
    userTeamOBJ.role = (await this.userRoleRepository.findOne({ where: { id: updateRoleDTO.roleId } })) as UserRole;
    const result = await this.userTeamRepository.save(userTeamOBJ);
    return result;
  }

  /**
   * findUserTeamsByUserId method will fetch array of UserTeam on basis of userId
   * @param {userId} .Takes userId as input
   * @return {UserTeam[]} .Return array of UserTeam object as response
   */
  findUserTeamsByUserId(id: string) {
    return this.userTeamRepository.find({ where: { user: id } });
  }

  /**
   * isAdminOrGuest method will figure out whether the userId is admin or guest
   * @param {userId} .Takes userId as input
   * @return {boolean} .Return boolean value as response
   */
  async isSystemAdmin(userId: string): Promise<boolean> {
    const output = (await this.userTeamRepository.findOne({ where: { user: userId } })) as UserTeam;
    if (output.role.roleName == 'system_admin') {
      return true;
    }
    return false;
  }

  /**
   * findUserTeamDetails method will fetch unique UserTeam object on basis of userId and teamId
   * @param {userId, teamId} .Takes userId and teamId as input
   * @return {UserTeam[]} .Return unique UserTeam object as response
   */
  async findUserTeamDetails(userId: string, teamId: string) {
    const output = (await this.userTeamRepository.findOne({ where: { user: userId, team: teamId } })) as UserTeam;
    return output;
  }
}
