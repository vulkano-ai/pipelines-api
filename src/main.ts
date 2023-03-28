import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  const config = app.get(ConfigService);
  app.useGlobalPipes(new JoiPipe());
  const swaggerCfg = new DocumentBuilder()
    .setTitle('Inference API')
    .setDescription('Real time AI platform')
    .setVersion(config.get('version'))
    .addTag('rtmp-streams')
    .addTag('pipelines')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup('api', app, document);
  await app.listen(config.get('port'));
}
bootstrap();
