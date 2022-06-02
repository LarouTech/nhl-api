import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { NhlApiConfigurationsService } from '../nhlApiConfigurations/nhlApiConfigurations.service';

@Module({
  imports: [HttpModule],
  providers: [
    TeamsService,
    ConfigService,
    ApiLoggerService,
    NhlApiConfigurationsService,
  ],
  controllers: [TeamsController],
})
export class TeamsModule {}
