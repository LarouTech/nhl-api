import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PlayerService } from './player.service';
import { PlayersController } from './player.controller';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { TeamsService } from '../teams/teams.service';

@Module({
  imports: [HttpModule],
  providers: [PlayerService, ConfigService, ApiLoggerService, TeamsService],
  controllers: [PlayersController],
})
export class PeopleModule {}
