import { Module } from '@nestjs/common';
import { ConfigurationsController } from './nhlApiConfigurations.controller';
import { HttpModule } from '@nestjs/axios';
import { NhlApiConfigurationsService } from './nhlApiConfigurations.service';
import { ConfigService } from '@nestjs/config';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';

@Module({
  imports: [HttpModule],
  controllers: [ConfigurationsController],
  providers: [NhlApiConfigurationsService, ApiLoggerService, ConfigService],
})
export class NhlStatsModule {}
