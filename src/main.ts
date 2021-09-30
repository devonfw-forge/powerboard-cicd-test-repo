import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WinstonLogger } from './app/shared/logger/winston.logger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@devon4node/config';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorFilter } from './app/shared/filters/errors.filter';

const path = require('path');
require('dotenv').config({ path: path.resolve('src/.env') });

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: new WinstonLogger() });
  const configModule = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setGlobalPrefix(configModule.values.globalPrefix);
  app.useGlobalFilters(new ErrorFilter());
  app.use(helmet());
  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: 'Authorization',
    allowedHeaders: 'authorization, content-type',
  });
  if (configModule.values.isDev) {
    const options = new DocumentBuilder()
      .setTitle(configModule.values.swaggerConfig.swaggerTitle)
      .setDescription(configModule.values.swaggerConfig.swaggerDescription)
      .setVersion(configModule.values.swaggerConfig.swaggerVersion)
      .addBearerAuth()
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup((configModule.values.globalPrefix || '') + '/api', app, swaggerDoc);
  }
  await app.listen(configModule.values.port);
}
bootstrap();
