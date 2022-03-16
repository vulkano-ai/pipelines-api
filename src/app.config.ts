import { ConfigService } from '@nestjs/config';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rtmp-api',
  env: process.env.ENVIRONMENT || 'dev',
  rtmpServerUri: process.env.RTMP_SERVER_URI || 'rtmp://localhost:1935',
  amqp: {
    hostname: process.env.RABBITMQ_HOST || 'localhost',
    username: process.env.RABBITMQ_USER || 'user',
    password: process.env.RABBITMQ_PASSWORD || 'password',
    port: process.env.RABBITMQ_PORT || 5672,
    protocol: process.env.RABBITMQ_PROTO || 'amqp',
  },
});

export const mongoDbConfigFactory = async (config: ConfigService) => ({
  uri: config.get('mongoUri'),
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const availableProtocols = ['RTMP'];
