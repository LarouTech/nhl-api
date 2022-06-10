import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Franchise, FranchisesService } from './franchises.service';
import { FranchiseAllTime } from './interfaces/franchiseAllTime.interface';
import { FranchiseTeamTotalStats } from './interfaces/franchiseTeamTotalStats.interface';

@Controller('franchises')
export class FranchisesController {
  constructor(private franchises: FranchisesService) {}

  @Get()
  getFranchises(
    @Query('logos') logos: boolean,
  ): Observable<Franchise[] | Franchise> {
    return this.franchises.getFranchises(null, logos);
  }

  @Get('all-time')
  getFranchisesAllTime(
    @Query('mostRecentTeamId') mostRecentTeamId: number,
    @Query('logos') logos: boolean,
  ): Observable<FranchiseAllTime> {
    return this.franchises.getFranchisesAllTime(mostRecentTeamId, logos);
  }

  @Get('all-time-stats')
  getFranchiseTeamTotalStats(
    @Query('activeTeam') activeTeam: boolean,
    @Query('teamId') teamId: number,
    @Query('franchiseId') franchiseId: number,
  ): Observable<FranchiseTeamTotalStats> {
    return this.franchises.getFranchiseTeamTotalStats(
      activeTeam,
      teamId,
      franchiseId,
    );
  }

  @Get(':id')
  getFranchise(
    @Param('id') id: string | number,
    @Query('logos') logos: boolean,
  ): Observable<Franchise[] | Franchise> {
    return this.franchises.getFranchises(id, logos);
  }
}
