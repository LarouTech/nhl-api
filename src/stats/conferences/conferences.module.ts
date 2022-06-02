import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { ConferencesController } from './conferences.controller';
import { ConferencesService } from './conferences.service';

@Module({
  imports: [HttpModule],
  providers: [ConferencesService, ConfigService, ApiLoggerService],
  controllers: [ConferencesController],
})
export class ConferencesModule {}
