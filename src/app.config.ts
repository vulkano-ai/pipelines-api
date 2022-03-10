import getenv from 'getenv';

export interface AppConfig {
  mongoUri: string;
  port: number;
  env: string;
}

export const config: AppConfig = {
  mongoUri: getenv.string('MONGODEB_URI', 'mongoddb://localhost:27017'),
  port: getenv.number('PORT', 8080),
  env: getenv.string('ENVIRONMENT', 'dev'),
};
