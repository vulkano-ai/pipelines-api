import { ConfigService } from '@nestjs/config';
import getenv from 'getenv';
import { Params } from 'nestjs-pino';
import { config } from 'rxjs';

export interface MqExchangeConfig {
  pipelines: string;
}
export interface AmqpConfig {
  uri: string;
  hostname: string;
  username: string;
  password: string;
  port: string;
  protocol: string;
  exchanges: MqExchangeConfig;
}

export default () => ({
  port: getenv.int('PORT', 3000),
  mongoUri: getenv.string('MONGODB_URI', 'mongodb://localhost:27017/inference'),
  env: getenv.string('ENVIRONMENT', 'dev'),
  serviceName: getenv.string('SERVICE_NAME', 'api-inference'),
  version: getenv.string('VERSION', 'latest'),
  rtmpServerUri: getenv.string('RTMP_SERVER_URI', 'rtmp://localhost:1935'),
  hlsBaseUrl: getenv.string('HLS_BASE_URL', 'http://localhost:3000'),
  hlsBasePath: getenv.string('HLS_BASE_PATH', 'hls/'),
  uploadsPath: getenv.string('UPLOADS_PATH', 'uploads/'),
  amqp: {
    uri: getenv.string('RABBITMQ_URI', 'amqp://user:password@localhost:5672'),
    hostname: getenv.string('RABBITMQ_HOST', 'localhost'),
    username: getenv.string('RABBITMQ_USER', 'user'),
    password: getenv.string('RABBITMQ_PASSWORD', 'password'),
    port: getenv.int('RABBITMQ_PORT', 5672),
    protocol: getenv.string('RABBITMQ_PROTO', 'amqp'),
    exchanges: {
      pipelines: getenv.string('PIPELINES_QUEUE', 'pipelines'),
    },
  },
});

export const mongoDbConfigFactory = async (config: ConfigService) => ({
  uri: config.get('mongoUri'),
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const multerConfigFactory = async (config: ConfigService) => ({
  dest: config.get('uploadsPath'),
});
export const rabbitMqConfigFactory = async (config: ConfigService) => ({
  uri: config.get<AmqpConfig>('amqp').uri,
  connectionInitOptions: { wait: false },
});

export const loggerConfigFactory = async (
  config: ConfigService,
): Promise<Params> => ({
  pinoHttp: {
    autoLogging: false,
    level: getenv.string('LOGGER_LEVEL', 'info'),
    mixin: () => ({
      env: config.get('env'),
      app: config.get('serviceName'),
      version: config.get('version'),
    }),
  },
});

export const uploadsConfig = {
  path: 'uploads/',
};
