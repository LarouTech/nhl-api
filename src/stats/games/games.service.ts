import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { ApiLoggerService } from 'src/apiLogger/apiLogger.service';
import { PlayoffGame } from './interfaces/playoffGame.interface';
import { isInt } from 'validator';
import { Game } from './interfaces/game.interface';

export enum GameDataType {
  'LIVE' = 'live',
  'BOXSCORE' = 'boxscore',
  'LINESCORE' = 'linescore',
  'CONTENT' = 'content',
}

@Injectable()
export class GamesService {
  private readonly url = this.config.get('nhlApi');
  private readonly recordUrl = this.config.get('nhlRecordApi');

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
  ) {}

  getGameData(id: number, gameDataType?: GameDataType): Observable<Game> {
    let url = `${this.url}/game/${id}`;

    if (gameDataType && !Object.values(GameDataType).includes(gameDataType)) {
      throw new HttpException(
        'invalid gameDataType parameter. Must be a GameDataType enum',
        HttpStatus.FORBIDDEN,
      );
    }

    console.log(gameDataType);

    switch (gameDataType) {
      case GameDataType.LIVE:
        url = `${url}/feed/live`;
        break;
      case GameDataType.BOXSCORE:
        url = `${url}/boxscore`;
        break;
      case GameDataType.LINESCORE:
        url = `${url}/linescore`;
        break;
      case GameDataType.CONTENT:
        url = `${url}/content`;

      default:
        // url = `${url}/feed/live`;
        break;
    }

    return this.http.get(url).pipe(
      map((res) => {
        delete res.data.copyright;
        return res.data;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }

  getPlayoffGames(
    gameId?: number,
    gameNumber?: number,
    playoffRound?: number,
    seasonId?: number,
  ): Observable<PlayoffGame[]> {
    if ((gameId || gameNumber) && (playoffRound || seasonId)) {
      throw new HttpException(
        'query parameters gameId and gameNumber cannot be mix with playoffround and/or seasonId',
        HttpStatus.FORBIDDEN,
      );
    }

    if (gameId && !isInt(gameId)) {
      throw new HttpException(
        'gameid should be an integer',
        HttpStatus.FORBIDDEN,
      );
    }

    if (gameNumber && isInt(gameNumber)) {
      throw new HttpException(
        'gameNumber should be an integer',
        HttpStatus.FORBIDDEN,
      );
    }

    if (playoffRound && !isInt(playoffRound, { min: 1, max: 4 })) {
      throw new HttpException(
        'playoffRound should be an interger in the range 1 to 4',
        HttpStatus.FORBIDDEN,
      );
    }

    if (seasonId && seasonId.toString().length != 8) {
      throw new HttpException(
        'invalid season parameter - must have 8 characters i.e 20112012',
        HttpStatus.BAD_REQUEST,
      );
    }

    let queryParameters = '';
    if (gameId) {
      queryParameters =
        queryParameters === ''
          ? `?cayenneExp=gameId=${gameId}`
          : `${queryParameters}%20and%20gameId=${gameId}`;
    }

    if (gameNumber) {
      queryParameters =
        queryParameters === ''
          ? `?cayenneExp=gameNumber=${gameNumber}`
          : `${queryParameters}%20and%20gameNumber=${gameNumber}`;
    }

    if (playoffRound) {
      queryParameters =
        queryParameters === ''
          ? `?cayenneExp=playoffRound=${playoffRound}`
          : `${queryParameters}%20and%20playoffRound=${playoffRound}`;
    }

    if (seasonId) {
      const startingYear = seasonId.toString().slice(0, 4);
      const finishingYear = seasonId.toString().slice(4);
      const delta = +finishingYear - +startingYear;
      if (delta != 1) {
        throw new HttpException(
          'invalid season parameter - must contain two consequtive years i.e 20112012',
          HttpStatus.BAD_REQUEST,
        );
      }
      queryParameters =
        queryParameters === ''
          ? `?cayenneExp=seasonId=${seasonId}`
          : `${queryParameters}%20and%20seasonId=${seasonId}`;
    }

    const url = `${this.recordUrl}/playoff-series${
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
