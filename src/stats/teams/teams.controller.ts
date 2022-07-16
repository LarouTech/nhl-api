import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TeamExpandsType } from './enum/teamsExpands.enum';
import { Teams } from './interfaces/teams.interface';
import { TeamRoster } from './interfaces/teamsRoster.interface';
import { TeamStats } from './interfaces/teamStats.interface';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teams: TeamsService) {}

  @Get()
  getTeams(
    @Query('id') id: number,
    @Query('expand') expand: TeamExpandsType,
    @Query('season') season: number,
  ): Observable<Teams[] | Teams> {
    return this.teams.getTeams(id, expand, season);
  }

  // @Get(':id')
  // getTeam(
  //   @Param('id') id: string | number,
  //   @Query('expand') expand: TeamExpandsType,
  // ): Observable<Teams[] | Teams> {
  //   return this.teams.getTeams(id, expand);
  // }

  @Get(':id/roster')
  getTeamRoster(@Param('id') id: string): Observable<TeamRoster> {
    return this.teams.getTeamRoster(id);
  }

  @Get(':id/stats')
  getTeamStats(@Param('id') id: string): Observable<TeamStats> {
    return this.teams.getTeamStats(id);
  }
}
