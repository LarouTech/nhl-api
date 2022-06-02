import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { Conference } from './interfaces/conference.interface';

@Injectable()
export class ConferencesService {
  private readonly url = this.config.get('nhlApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getDivisions(id?: string | number) {
    const url = id
      ? `${this.url}/conferences/${id}`
      : `${this.url}/conferences`;

    return this.http.get(url).pipe(
      map((res) => {
        return id
          ? (res.data.conferences as Conference[])[0]
          : res.data.conferences;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }
}
