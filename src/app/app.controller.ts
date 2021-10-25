import { Controller, Response, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Response as eResponse } from 'express';

@Controller()
export class AppController {
  constructor(readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth(@Response() res: eResponse): Promise<void> {
    res.status(200).json('OK');
  }
}
