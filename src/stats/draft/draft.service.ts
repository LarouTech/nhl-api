import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { Draft } from './interfaces/draft.interface';
import { Prospects } from './interfaces/prospects.interface';
import { isInt } from 'validator';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { DraftPlayer } from './interfaces/draftPlayer.interface';

@Injectable()
export class DraftService {
  private readonly url = this.config.get('nhlApi');
  private readonly recordUrl = this.config.get('nhlRecordApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getDraft(year?: number): Observable<Draft> {
    let url = `${this.url}/draft`;

    if (!isInt(year, { min: 1963, max: new Date().getFullYear() })) {
      throw new HttpException(
        'Please enter a valid year where first draft was in 1963 e.g YYYY',
        HttpStatus.FORBIDDEN,
      );
    }

    if (year) {
      url = `${url}/${year}`;
    }

    return this.http.get(url).pipe(
      map((res) => {
        return res.data.drafts[0];
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }

  getDraftProspects(id?: number): Observable<Prospects[] | Prospects> {
    const url = `${this.url}/draft/prospects ${id ? `/${id}` : ''}`;

    if (!isInt(id)) {
      throw new HttpException(
        'propsect if must be a number',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.http.get(url).pipe(
      map((res) => {
        return id ? res.data.prospects[0] : res.data.prospects;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }

  getDraftPlayers(
    draftYear?: number,
    draftedByTeamId?: number,
  ): Observable<DraftPlayer[]> {
    if (!isInt(draftYear, { min: 1963, max: new Date().getFullYear() })) {
      throw new HttpException(
        'Please enter a valid year where first draft was in 1963 e.g YYYY',
        HttpStatus.FORBIDDEN,
      );
    }

    if (!isInt(draftedByTeamId)) {
      throw new HttpException(
        'Please enter a valid team ID. Must be an integer',
        HttpStatus.FORBIDDEN,
      );
    }

    let queryParameters = '';
    if (draftYear) {
      queryParameters =
        queryParameters === '' ? `?cayenneExp=draftYear=${draftYear}` : '';
    }

    if (draftedByTeamId) {
      queryParameters =
        queryParameters === ''
          ? `?cayenneExp=draftedByTeamId=${draftedByTeamId}`
          : `${queryParameters}%20and%20draftedByTeamId=${draftedByTeamId}`;
    }

    const url = `${this.recordUrl}/draft${
      queryParameters ? queryParameters : ''
    }`;

    return this.http.get(url).pipe(
      map((res) => {
        if (res.data.data.length <= 0 && draftedByTeamId) {
          throw new HttpException(
            'Please enter a valid team ID. Must be an integer',
            HttpStatus.FORBIDDEN,
          );
        }

        return res.data.data;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }
}
