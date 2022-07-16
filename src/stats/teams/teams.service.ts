import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { TeamExpandsType } from './enum/teamsExpands.enum';
import { Teams } from './interfaces/teams.interface';
import { TeamRoster } from './interfaces/teamsRoster.interface';
import { TeamStats } from './interfaces/teamStats.interface';

@Injectable()
export class TeamsService {
  private url = this.config.get('nhlApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getTeams(
    id?: string | number,
    expand?: TeamExpandsType,
    season?: number,
  ): Observable<Teams[] | Teams> {
    let url = `${this.url}/teams`;
    if (id) {
      url = `${url}/${id}`;
    }

    if (expand) {
      url = `${url}?expand=${expand}`;
    }

    if (season) {
      url = expand ? `${url}&season=${season}` : `${url}?season=${season}`;
    }

    return this.http.get(url).pipe(
      map((res) => {
        return id ? (res.data.teams as Teams[])[0] : res.data.teams;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }

  getTeamRoster(id: string): Observable<TeamRoster> {
    const url = `${this.url}/teams/${id}/roster`;

    return this.http.get(url).pipe(
      map((res) => {
        return res.data.roster;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }

  getTeamStats(id: string): Observable<TeamStats> {
    const url = `${this.url}/teams/${id}/stats`;

    return this.http.get(url).pipe(
      map((res) => {
        return res.data.stats[0];
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }
}
