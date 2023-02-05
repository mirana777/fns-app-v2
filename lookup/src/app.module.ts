import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import MysqlModule from './config/mysql.config';
import { AppService } from './app.service';
import { FnsModule } from './router/fns.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [MysqlModule, FnsModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
