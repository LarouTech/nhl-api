import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';

import { StandingsExpand } from './enums/standingsExpands';
import { Standing } from './interfaces/standings.interface';

@Injectable()
export class StandingsService {
  private readonly url = this.config.get('nhlApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getStandings(
    expand?: StandingsExpand,
    season?: string,
  ): Observable<Standing[]> {
    if (expand && !Object.values(StandingsExpand).includes(expand)) {
      throw new HttpException(
        'invalid expamd parameter. Must be a StandingsExpand enum',
        HttpStatus.FORBIDDEN,
      );
    }

    if (season.toString().length != 8) {
      throw new HttpException(
        'invalid seasons parameter - must have 8 characters i.e 20112012',
        HttpStatus.BAD_REQUEST,
      );
    }

    const startingYear = season.toString().slice(0, 4);
    const finishingYear = season.toString().slice(4);
    const delta = +finishingYear - +startingYear;

    if (delta != 1) {
      throw new HttpException(
        'invalid seasons parameter - must contain two consequtive years i.e 20112012',
        HttpStatus.BAD_REQUEST,
      );
    }

    let queryParameter = '';

    if (expand) {
      queryParameter =
        queryParameter === ''
          ? `?expand=${expand}`
          : `${queryParameter}&expand=${expand}`;
    }

    if (season) {
      queryParameter =
        queryParameter === ''
          ? `?season=${season}`
          : `${queryParameter}&season=${season}`;
    }

    const url = `${this.url}/standings${queryParameter ? queryParameter : ''}`;

    console.log(url);

    return this.http.get(url).pipe(
      map((res) => {
        return res.data.records;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }
}
