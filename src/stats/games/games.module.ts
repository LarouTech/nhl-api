import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { ConfigService } from '@nestjs/config';
import { ApiLoggerService } from 'src/apiLogger/apiLogger.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GamesService, ConfigService, ApiLoggerService],
  controllers: [GamesController],
})
export class GamesModule {}
