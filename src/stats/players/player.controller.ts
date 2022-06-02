import { Controller, Get, Param, Query } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { Observable } from 'rxjs';
import { PlayerExpands } from './enum/playerExpands';
import { StatsParam } from './enum/statsParam.enum';
import { Player } from './interfaces/player.interface';
import { PlayerExtendedDetails } from './interfaces/playerExtendedDetails.interface';
import { PlayerStats } from './interfaces/playerStats.interface';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayersController {
  constructor(private players: PlayerService) {}

  @Get('all')
  getAllPlayersDetailsAndStats(@Query('statsParam') statsParam: StatsParam) {
    return this.players.getAllPlayersDetailsAndStats(statsParam);
  }

  @Get(':id')
  getPlayer(
    @Param('id') id: string,
    @Query('expand') expand: PlayerExpands,
  ): Observable<Player | Player[]> {
    return this.players.getPlayerDetails(id, expand);
  }

  @Get('stats/:id')
  getPlayerDetailsAndStats(
    @Param('id') id: string,
    @Query('stats') stats: StatsParam,
    @Query('season') season: number | string,
  ): Observable<PlayerStats | Player[]> {
    return this.players.getPlayerDetailsAndStats(id, stats, season);
  }

  @Get('search/:name')
  searchAllTimePlayer(
    @Param('name') name: string,
    @Query('active') active: boolean,
  ): Observable<Partial<Player>> {
    return this.players.searchAllTimePlayer(name, active);
  }

  @Get('byTeam/:teamId')
  getPlayerExtendedDetailsByTeamId(
    @Param('teamId') teamId: number,
  ): Observable<PlayerExtendedDetails> {
    return this.players.getPlayerExtendedDetailsByTeamId(teamId);
  }
}
