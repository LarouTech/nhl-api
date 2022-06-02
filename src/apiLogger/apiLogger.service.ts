/* eslint-disable @typescript-eslint/no-empty-function */
import {
  HttpException,
  HttpStatus,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { catchError, of, pipe } from 'rxjs';

export enum LoggerType {
  'ERROR' = 'ERROR',
}

export enum NhlServiceType {
  'PLAYER' = 'player',
  'CONFIG' = 'config',
}

@Injectable()
export class ApiLoggerService implements LoggerService {
  loggerMessageBuilder(
    type: LoggerType,
    code: string,
    message: string,
    httpStatus: HttpStatus,
    url: string,
  ) {
    return `[${type}] [TIMESTAMP: ${new Date()}] [CODE: ${code}] [MESSAGE: ${message}] [URL: ${url}] [HTTP_STATUS_CODE: ${httpStatus}]`;
  }

  log() {
    return;
  }

  error(error: any, message: string, httpStatus: HttpStatus) {
    const logMessage = this.loggerMessageBuilder(
      LoggerType.ERROR,
      error.code,
      message,
      httpStatus,
      error.config.url,
    );
    console.error(logMessage);
  }

  warn() {
    return;
  }

  debug?() {
    return;
  }

  verbose() {
    return;
  }

  serviceUnavailbaleRxjsPipe = (
    service?: NhlServiceType,
    disableLogger?: boolean,
  ) =>
    pipe(
      catchError((error) => {
        switch (service) {
          case NhlServiceType.PLAYER:
            throw new HttpException('invalid player Id', HttpStatus.NOT_FOUND);
          case NhlServiceType.CONFIG:
            throw new HttpException(
              'no connectivity with nhl-api',
              HttpStatus.NOT_FOUND,
            );

          default:
            break;
        }

        if (error.code === 'ENOTFOUND') {
          this.errorHandler(
            error,
            'Service Unavailable',
            HttpStatus.SERVICE_UNAVAILABLE,
            disableLogger ? disableLogger : null,
          );
        }

        return of(error);
      }),
    );

  errorHandler(
    error: any,
    message: string,
    httpStatus: HttpStatus,
    disableLogger?: boolean,
  ) {
    !disableLogger ? this.error(error, message, httpStatus) : null;
    throw new HttpException(message, httpStatus);
  }
}
