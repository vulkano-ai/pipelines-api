import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './healthcheck.controller';
import { HealthCheckResult, TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import AppConfig, { mongoDbConfigFactory } from '../../config';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [HealthCheckController],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [AppConfig],
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: mongoDbConfigFactory,
          inject: [ConfigService],
        }),
        TerminusModule,
      ],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should run the db health check', async () => {
    const check: HealthCheckResult = await controller.check();
    expect(check).toBeDefined();
    const { status, info, error, details } = check;
    expect(status).toBeDefined();
    expect(status).toEqual('ok');
    expect(info).toBeDefined();
    expect(info.mongoose).toBeDefined();
    expect(info.mongoose.status).toBeDefined();
    expect(info.mongoose.status).toEqual('up');
    expect(error).toBeDefined();
    expect(error).toEqual({});
    expect(details).toBeDefined();
    expect(details.mongoose).toBeDefined();
    expect(details.mongoose.status).toBeDefined();
    expect(details.mongoose.status).toEqual('up');
  });
});
