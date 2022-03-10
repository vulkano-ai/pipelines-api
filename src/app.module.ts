import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RtmpModule } from './rtmp/rtmp.module';

@Module({
  imports: [RtmpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
