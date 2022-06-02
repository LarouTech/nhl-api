import { Module } from '@nestjs/common';
import { NhlScheduleService } from './nhlSchedule.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { NhlScheduleController } from './nhlSchedule.controller';

@Module({
  providers: [NhlScheduleService, ConfigService, ApiLoggerService],
  imports: [HttpModule],
  controllers: [NhlScheduleController],
})
export class NhlScheduleModule {}
