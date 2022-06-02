import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { Award } from './interfaces/awards.interface';
import { isInt } from 'validator';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';

@Injectable()
export class AwardsService {
  private readonly url = this.config.get('nhlApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getAwards(id?: number): Observable<Award[]> {
    const url = `${this.url}/awards ${id ? `/${id}` : ''}`;

    if (id && !isInt(id, { min: 1, max: 25 })) {
      throw new HttpException(
        'Plase enter a valid id between 1 and 25',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.http.get(url).pipe(
      map((res) => {
        return id ? res.data.awards[0] : res.data.awards;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }
}
