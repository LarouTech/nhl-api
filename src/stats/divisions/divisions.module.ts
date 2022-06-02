import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { DivisionsController } from './divisions.controller';
import { DivisionsService } from './divisions.service';

@Module({
  imports: [HttpModule],
  controllers: [DivisionsController],
  providers: [DivisionsService, ConfigService, ApiLoggerService],
})
export class DivisionsModule {}
