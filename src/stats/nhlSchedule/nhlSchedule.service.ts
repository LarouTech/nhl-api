import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { GameType } from './enum/gameType.enum';
import { Schedule } from './interfaces/schedule.interface';
import { isDate, isInt } from 'validator';
import { ScheduleExpands } from './enum/scheduleExpands';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';

@Injectable()
export class NhlScheduleService {
  private readonly url = this.config.get('nhlApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getSchedule(
    expand?: ScheduleExpands,
    teamId?: number,
    date?: string,
    startDate?: string,
    endDate?: string,
    gameType?: GameType,
  ): Observable<Schedule> {
    if (expand && !Object.values(ScheduleExpands).includes(expand)) {
      throw new HttpException(
        'invalid expamd parameter. Must be a ScheduleExpands enum',
        HttpStatus.FORBIDDEN,
      );
    }

    if (teamId && !isInt(teamId)) {
      throw new HttpException(
        'teamId muts be a valid integer',
        HttpStatus.FORBIDDEN,
      );
    }

    if (
      (date && !isDate(date)) ||
      (startDate && !isDate(startDate)) ||
      (endDate && !isDate(endDate))
    ) {
      throw new HttpException(
        'invalid date format in string parameters (yyyy-mm-dd)',
        HttpStatus.FORBIDDEN,
      );
    }

    if (gameType && !Object.values(GameType).includes(gameType)) {
      throw new HttpException(
        'invalid gameType parameter. Must be a GameType',
        HttpStatus.FORBIDDEN,
      );
    }

    let queryParameter = '';

    if (expand) {
      queryParameter =
        queryParameter === ''
          ? `?expand=${expand}`
          : `${queryParameter}&expand=${expand}`;
    }

    if (teamId) {
      queryParameter =
        queryParameter === ''
          ? `?teamId=${teamId}`
          : `${queryParameter}&teamId=${teamId}`;
    }

    if (date) {
      queryParameter =
        queryParameter === ''
          ? `?date=${date}`
          : `${queryParameter}&date=${date}`;
    }

    if (startDate) {
      queryParameter =
        queryParameter === ''
          ? `?startDate=${startDate}`
          : `${queryParameter}&startDate=${startDate}`;
    }

    if (endDate) {
      queryParameter =
        queryParameter === ''
          ? `?endDate=${endDate}`
          : `${queryParameter}&endDate=${endDate}`;
    }

    if (gameType) {
      queryParameter =
        queryParameter === ''
          ? `?gameType=${gameType}`
          : `${queryParameter}&gameType=${gameType}`;
    }

    let url = `${this.url}/schedule${queryParameter ? queryParameter : ''}`;

    url = `${url}&expand=${ScheduleExpands.SERIES_SUMMARY}&expand=${ScheduleExpands.CONTENT_ALL}`;

    return this.http.get(url).pipe(
      map((res) => {
        return res.data.dates.length > 0 ? res.data.dates : res.data.dates[0];
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }
}
