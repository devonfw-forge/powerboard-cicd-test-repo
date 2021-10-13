import { Config } from '../app/shared/model/config/config.model';

const def: Config = {
  isDev: false,
  host: 'localhost',
  port: 3000,
  clientUrl: 'localhost:4200',
  globalPrefix: 'v1',
  loggerConfig: {
    console: false,
    errorLogFile: './logs/error.log',
    generalLogFile: './logs/general.log',
    loggerLevel: 'warn',
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    migrationsRun: true,
    logging: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  jwtConfig: { secret: 'SECRET', signOptions: { expiresIn: '24h' } },
};

export default def;
