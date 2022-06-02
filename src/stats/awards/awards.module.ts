import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';

@Module({
  imports: [HttpModule],
  providers: [AwardsService, ConfigService, ApiLoggerService],
  controllers: [AwardsController],
})
export class AwardsModule {}
