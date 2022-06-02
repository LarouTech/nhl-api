import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Season } from './interfaces/seasons.interface';
import { SeasonsService } from './seasons.service';

@Controller('seasons')
export class SeasonsController {
  constructor(private season: SeasonsService) {}

  @Get()
  getSeasons(
    @Query('season') season: number,
    @Query('current') current: string | boolean,
  ): Observable<Season[]> {
    return this.season.getseason(season, current);
  }
}
