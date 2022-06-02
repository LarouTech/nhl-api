import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { ApiLoggerService } from '../../apiLogger/apiLogger.service';
import { Division } from './interfaces/division.interface';

@Injectable()
export class DivisionsService {
  private readonly url = this.config.get('nhlApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getDivisions(id?: string | number): Observable<Division[] | Division> {
    const url = id ? `${this.url}/divisions/${id}` : `${this.url}/divisions`;

    return this.http.get(url).pipe(
      map((res) => {
        return id ? (res.data.divisions as Division[])[0] : res.data.divisions;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }
}
