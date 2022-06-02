import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { SeasonsController } from './seasons.controller';
import { SeasonsService } from './seasons.service';

@Module({
  imports: [HttpModule],
  controllers: [SeasonsController],
  providers: [SeasonsService, ConfigService, ApiLoggerService],
})
export class SeasonsModule {}
