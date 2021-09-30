import { Config } from '../app/shared/model/config/config.model';

const def: Config = {
  isDev: true,
  host: 'localhost',
  port: 3000,
  clientUrl: 'localhost:4200',
  globalPrefix: 'v1',
  loggerConfig: {
    console: false,
    loggerLevel: 'info',
  },
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'azhar',
    database: 'PowerBoard',
    synchronize: false,
    migrationsRun: true,
    logging: true,
    entities: ['dist/**/*.entity.ts'],
    migrations: ['dist/migration/**/*.ts'],
    subscribers: ['dist/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  swaggerConfig: {
    swaggerTitle: 'NestJS Application',
    swaggerDescription: 'API Documentation',
    swaggerVersion: '0.0.1',
  },
  jwtConfig: { secret: 'SECRET', signOptions: { expiresIn: '24h' } },
};

export default def;
