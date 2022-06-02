import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { StandingsExpand } from './enums/standingsExpands';
import { Standing } from './interfaces/standings.interface';
import { StandingsService } from './standings.service';

@Controller('standings')
export class StandingsController {
  constructor(private standings: StandingsService) {}

  @Get()
  getStandings(
    @Query('expand') expand: StandingsExpand,
  ): Observable<Standing[]> {
    return this.standings.getStandings(expand);
  }
}
