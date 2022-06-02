import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BehaviorSubject,
  combineLatest,
  lastValueFrom,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { PlayerExpands } from './enum/playerExpands';
import { StatsParam } from './enum/statsParam.enum';
import { Player } from './interfaces/player.interface';
import { isBoolean } from 'validator';
import {
  ApiLoggerService,
  NhlServiceType,
} from '../../apiLogger/apiLogger.service';
import { PlayerExtendedDetails } from './interfaces/playerExtendedDetails.interface';
import { TeamsService } from '../teams/teams.service';
import { TeamRoster } from '../teams/interfaces/teamsRoster.interface';
import { TeamExpandsType } from '../teams/enum/teamsExpands.enum';
import { Teams } from '../teams/interfaces/teams.interface';

@Injectable()
export class PlayerService {
  private readonly url = this.config.get('nhlApi');
  private readonly recordUrl = this.config.get('nhlRecordApi');
  private _allPlayers = new BehaviorSubject<TeamRoster[]>(null);

  get allPlayers$() {
    return this._allPlayers.asObservable();
  }

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private logger: ApiLoggerService,
    private teams: TeamsService,
  ) {
    lastValueFrom(this.fetchAllPlayersFromTeams());
  }

  getPlayerDetails(
    id: string,
    expand?: PlayerExpands,
  ): Observable<Player | Player[]> {
    if (expand && !Object.values(PlayerExpands).includes(expand)) {
      throw new HttpException(
        'invalid expand parameter. Must be of a PlayerExpands enum',
        HttpStatus.FORBIDDEN,
      );
    }

    const url = expand
      ? `${this.url}/people/${id}?expand=${expand}`
      : `${this.url}/people/${id}`;

    return this.http.get(url).pipe(
      map((res) => {
        return id ? (res.data.people as Player[])[0] : res.data.people;
      }),
      map((data) => {
        return {
          ...data,
          image: {
            headshot: `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${data.id}.jpg`,
            actionshot: `https://cms.nhl.bamgrid.com/images/actionshots/${id}.jpg`,
          },
        };
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }

  getPlayerDetailsAndStats(
    id: string,
    statsParam: StatsParam,
    season?: number | string,
  ): Observable<Player[]> {
    if (statsParam && !Object.values(StatsParam).includes(statsParam)) {
      throw new HttpException(
        'invalid statsParam parameter. Must be of a StatsParam enum',
        HttpStatus.FORBIDDEN,
      );
    }

    const url = id
      ? `${this.url}/people/${id}/stats?stats=${statsParam}${
          season ? `&season=${season}` : ''
        }`
      : `${this.url}/people`;

    return this.getPlayerDetails(id).pipe(
      switchMap((player) => {
        return this.http.get(url).pipe(
          map((res) => {
            return {
              ...player,
              stats: res.data.stats,
            };
          }),
          this.logger.serviceUnavailbaleRxjsPipe(NhlServiceType.PLAYER),
        );
      }),
    );
  }

  getPlayerExtendedDetailsByTeamId(
    teamId: number,
  ): Observable<PlayerExtendedDetails> {
    const url = `${this.recordUrl}/player/byTeam/${teamId}`;

    return this.http.get(url).pipe(
      map((res) => {
        return res.data.data;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(),
    );
  }

  searchAllTimePlayer(
    name: string,
    active?: boolean,
  ): Observable<Partial<Player>> {
    if (active && !isBoolean(active)) {
      throw new HttpException(
        'active a parameter must be booelan',
        HttpStatus.FORBIDDEN,
      );
    }

    const url = `https://suggest.svc.nhl.com/svc/suggest/v1/${
      active ? 'minactiveplayers' : 'minplayers'
    }/${name}`;

    const template = [
      'id',
      'lastName',
      'firstName',
      'ignore',
      'ignore',
      'height',
      'weight',
      'birthCity',
      'birthStateProvince',
      'birthCountry',
      'birthdate',
      'team',
      'position',
      'primaryNumber',
      'ignore',
    ];

    return this.http.get(url).pipe(
      map((res) => {
        const suggestions: string[] = res.data.suggestions;

        const players: Partial<Player>[] = [];

        suggestions.map((s) => {
          const splitArray = s.split('|');

          const player: Partial<Player> = {};

          splitArray.map((i) => {
            player[template[splitArray.indexOf(i)]] = i;
          });

          delete player['ignore'];
          players.push(player);
        });

        return players;
      }),
      this.logger.serviceUnavailbaleRxjsPipe(NhlServiceType.PLAYER),
    );
  }

  private fetchAllPlayersFromTeams(): Observable<TeamRoster[]> {
    return this.teams.getTeams(null, TeamExpandsType.ROSTER).pipe(
      map((teams: Teams[]) => {
        const rosters: TeamRoster[] = [];

        teams.map((team) => {
          team.roster.roster.map((player) => {
            rosters.push(player);
          });
        });

        this._allPlayers.next(rosters);
        return rosters;
      }),
    );
  }

  getAllPlayersDetailsAndStats(statsParam: StatsParam): Observable<Player[]> {
    console.log('run');
    if (
      statsParam &&
      (statsParam === StatsParam.GAME_LOG ||
        statsParam === StatsParam.REGULAR_SEASON_STAT_RANKINGS)
    ) {
      throw new HttpException(
        `cannot get ${statsParam} statsParam for bulk query`,
        HttpStatus.FORBIDDEN,
      );
    }

    const rosterPerTeam = [];

    this._allPlayers.getValue().forEach((roster) => {
      const obs$ = this.getPlayerDetailsAndStats(
        roster.person.id.toString(),
        statsParam ? statsParam : StatsParam.SINGLE_SEASON,
      );

      rosterPerTeam.push(obs$);
    });

    return combineLatest([...rosterPerTeam]).pipe(
      map((data) => {
        return data as Player[];
      }),
    );
  }
}
