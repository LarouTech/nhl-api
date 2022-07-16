import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { Season } from './interfaces/seasons.interface';

@Injectable()
export class SeasonsService {
  private readonly url = this.config.get('nhlApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getseason(season?: number, current?: string | boolean): Observable<Season[]> {
    // console.log(`season: ${season}`);
    // console.log(`current: ${current}`);

    if (season && current) {
      throw new HttpException(
        'invalid string parameter - cannot have both season and current as parameters',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (season && season.toString().length != 8) {
      throw new HttpException(
        'invalid season parameter - must have 8 characters i.e 20112012',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (season) {
      const startingYear = season.toString().slice(0, 4);
      const finishingYear = season.toString().slice(4);
      const delta = +finishingYear - +startingYear;
      if (delta != 1) {
        throw new HttpException(
          'invalid season parameter - must contain two consequtive years i.e 20112012',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    let url = `${this.url}/seasons`;
    if (season) {
      url = `${url}${season}`;
    }

    if (current) {
      url = `${url}/current`;
    }

    return this.http.get(url).pipe(
      map((res) => {
        return res.data.seasons;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }
}
