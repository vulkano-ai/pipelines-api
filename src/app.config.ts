import { ConfigService } from '@nestjs/config';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rtmp-api',
  env: process.env.ENVIRONMENT || 'dev',
});

export const mongoDbConfigFactory = async (config: ConfigService) => ({
  uri: config.get('mongoUri'),
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
