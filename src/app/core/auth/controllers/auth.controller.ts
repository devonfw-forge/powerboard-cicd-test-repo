import { Body, Controller, Get, Post, Response, Inject, Put, Param } from '@nestjs/common';

import { LoginDTO } from '../model/LoginDTO';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { Response as eResponse } from 'express';
import { IAuthService } from '../services/auth.service.interface';
import { ChangePasswordDTO } from '../model/ChangePasswordDTO';

@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private readonly authService: IAuthService) {}

  //Login the user
  @Post('login')
  //@UseGuards(AuthGuard('jwt'))
  async login(@Body() login: LoginDTO): Promise<any> {
    console.log(login);
    return await this.authService.login(login);
  }

  @Post('login/guest')
  //@UseGuards(AuthGuard('jwt'))
  async loginGuest(@Body() login: LoginDTO): Promise<any> {
    console.log('hiiiiiiii');
    return await this.authService.loginGuest(login);
  }

  //Add the user
  @Post('register')
  //@UseGuards(AuthGuard('jwt'))
  async register(@Body() user: UserDTO, @Response() res: eResponse): Promise<void> {
    const registered = await this.authService.register(user);
    if (registered) {
      res.status(201).send('Users successfully Registered');
    }
  }

  @Put('change-password')
  //@UseGuards(AuthGuard('jwt'))
  async changePassword(@Body() changePassword: ChangePasswordDTO, @Response() res: eResponse): Promise<void> {
    const isChanged = await this.authService.changePassword(changePassword);
    if (isChanged) {
      res.status(201).send('Password changed successfully');
    }
  }

  @Get('home/:userId')
  //@UseGuards(AuthGuard('jwt'))
  async getHomeDetailsForUserId(@Param('userId') userId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.authService.getHomeDetailsForUserId(userId);
    res.status(200).json(result);
  }

  // @Get('currentuser')
  // @UseGuards(AuthGuard())
  // currentUser(@GetUser() user: User): User {
  //   return user;
  // }
}
