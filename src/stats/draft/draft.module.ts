import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { DraftController } from './draft.controller';
import { DraftService } from './draft.service';

@Module({
  controllers: [DraftController],
  imports: [HttpModule],
  providers: [DraftService, ConfigService, ApiLoggerService],
})
export class DraftModule {}
