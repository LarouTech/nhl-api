import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiLoggerService } from './apiLogger/apiLogger.service';
import { AwardsModule } from './stats/awards/awards.module';
import { ConferencesModule } from './stats/conferences/conferences.module';
import configurations from './config/configurations';
import { DivisionsModule } from './stats/divisions/divisions.module';
import { DraftModule } from './stats/draft/draft.module';
import { FranchisesModule } from './stats/franchises/franchises.module';
import { GamesModule } from './stats/games/games.module';
import { NhlStatsModule } from './stats/nhlApiConfigurations/nhlApiConfigurations.module';
import { PeopleModule } from './stats/players/player.module';
import { SeasonsModule } from './stats/seasons/seasons.module';
import { StandingsModule } from './stats/standings/standings.module';
import { TeamsModule } from './stats/teams/teams.module';
import { NhlScheduleModule } from './stats/nhlSchedule/nhlSchedule.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    NhlStatsModule,
    ConfigModule.forRoot({ load: [configurations] }),
    FranchisesModule,
    TeamsModule,
    DivisionsModule,
    ConferencesModule,
    PeopleModule,
    GamesModule,
    SeasonsModule,
    StandingsModule,
    DraftModule,
    AwardsModule,
    NhlScheduleModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [ConfigService, ApiLoggerService],
})
export class AppModule {}
