import { Module } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { StandingsController } from './standings.controller';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';

@Module({
  imports: [HttpModule],
  providers: [StandingsService, ConfigService, ApiLoggerService],
  controllers: [StandingsController],
})
export class StandingsModule {}
