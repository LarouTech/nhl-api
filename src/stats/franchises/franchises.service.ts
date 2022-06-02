import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { FranchiseAllTime } from './interfaces/franchiseAllTime.interface';
import { FranchiseTeamTotalStats } from './interfaces/franchiseTeamTotalStats.interface';
import { isBoolean } from 'validator';

export interface Franchise {
  franchiseId: number;
  firstSeasonId: number;
  mostRecentTeamId: number;
  lastSeasonId?: number;
  teamName: string;
  locationName: string;
  link: string;
}

@Injectable()
export class FranchisesService {
  private readonly url = this.config.get('nhlApi');
  private readonly recordUrl = this.config.get('nhlRecordApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getFranchises(
    id?: string | number,
  ): Observable<Franchise[]> | Observable<Franchise> {
    const url = id ? `${this.url}/franchises/${id}` : `${this.url}/franchises`;

    return this.http.get(url).pipe(
      map((res) => {
        return id
          ? (res.data.franchises as Franchise[])[0]
          : res.data.franchises;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }

  getFranchisesAllTime(
    mostRecentTeamId?: number,
    logos?: boolean,
  ): Observable<FranchiseAllTime> {
    let url = `${this.recordUrl}/franchise`;
    if (mostRecentTeamId) {
      url = `${url}?cayenneExp=mostRecentTeamId=${mostRecentTeamId}`;
    }

    if (logos && !isBoolean(logos)) {
      throw new HttpException(
        'query parameter logos must be boolean',
        HttpStatus.FORBIDDEN,
      );
    }

    if (logos) {
      url = `${url}?include=teams.active&include=teams.logos&include=teams.franchiseTeam.firstSeason.id&include=teams.franchiseTeam.lastSeason.id&include=teams.id`;
    }

    return this.http.get(url).pipe(
      map((res) => {
        return res.data.data;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }

  getFranchiseTeamTotalStats(
    activeTeam?: boolean,
    teamId?: number,
    franchiseId?: number,
  ): Observable<FranchiseTeamTotalStats> {
    if (
      (activeTeam && (teamId || franchiseId)) ||
      (teamId && (activeTeam || franchiseId)) ||
      (franchiseId && (activeTeam || teamId))
    ) {
      throw new HttpException(
        'can only have a query parameter at a time',
        HttpStatus.FORBIDDEN,
      );
    }

    let queryParameters = '';

    if (activeTeam) {
      queryParameters =
        queryParameters === '' ? `?cayenneExp=activeTeam=${activeTeam}` : '';
    }

    if (teamId) {
      queryParameters =
        queryParameters === '' ? `?cayenneExp=teamId=${teamId}` : '';
    }

    if (franchiseId) {
      queryParameters =
        queryParameters === '' ? `?cayenneExp=franchiseId=${franchiseId}` : '';
    }

    const url = `${this.recordUrl}/franchise-team-totals${
      queryParameters ? queryParameters : ''
    }`;

    return this.http.get(url).pipe(
      map((res) => {
        return res.data.data;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }
}
