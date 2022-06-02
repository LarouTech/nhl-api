import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BehaviorSubject, lastValueFrom, map, Observable } from 'rxjs';
import {
  ApiLoggerService,
  NhlServiceType,
} from '../../apiLogger/apiLogger.service';
import { ConfigurationTypes } from './enum/nhlApiConfigurations.enum';
import {
  Expands,
  NhlApiConfigurationsResponse,
} from './interfaces/nhlApiConfigurations.interfaces';

@Injectable()
export class NhlApiConfigurationsService {
  private url = this.config.get('nhlApi');
  private _expands = new BehaviorSubject<Expands[]>(null);

  get expands(): Observable<Expands[]> {
    return this._expands.asObservable() as Observable<Expands[]>;
  }

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {
    lastValueFrom(this.getConfig(ConfigurationTypes.expands)).then((res) => {
      this._expands.next(res as Expands[]);
    });
  }

  getConfig(
    type?: ConfigurationTypes,
  ): Observable<NhlApiConfigurationsResponse> {
    const url = `${this.url}/${type ? type : 'configurations'}`;

    return this.http.get<NhlApiConfigurationsResponse>(url).pipe(
      map((res) => {
        return res.data;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(NhlServiceType.CONFIG),
    );
  }
}
