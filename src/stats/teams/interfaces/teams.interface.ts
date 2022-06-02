import { Conference } from 'src/stats/conferences/interfaces/conference.interface';
import { Division } from 'src/stats/divisions/interfaces/division.interface';
import { Franchise } from 'src/stats/franchises/franchises.service';
import { TeamRoster } from './teamsRoster.interface';
import { TeamStats } from './teamStats.interface';

export interface Teams {
  id: number;
  name: string;
  link: string;
  venue: {
    name: string;
    link: string;
    city: string;
    timeZone: {
      id: string;
      offset: string;
      tz: string;
    };
  };
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: Division;
  conference: Conference;
  franchise: Franchise;
  roster?: {
    roster: TeamRoster[];
  };
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean | string;
  teamStats?: TeamStats[];
  nextGameSchedule?: {
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalMatches: number;
    metaData: {
      timeStamp: string;
    };
    dates: [
      {
        date: string;
        totalItems: number;
        totalEvents: number;
        totalGames: number;
        totalMatches: number;
        games: [
          {
            gamePk: number;
            link: string;
            gameType: string;
            season: string;
            gameDate: string;
            status: {
              abstractGameState: string;
              codedGameState: string;
              detailedState: string;
              statusCode: string;
              startTimeTBD: string | boolean;
            };
            teams: {
              away: {
                leagueRecord: {
                  wins: number;
                  losses: number;
                  type: string;
                };
                score: number;
                team: {
                  id: number;
                  name: string;
                  link: string;
                };
              };
              home: {
                leagueRecord: {
                  wins: number;
                  losses: number;
                  type: string;
                };
                score: number;
                team: {
                  id: number;
                  name: string;
                  link: string;
                };
              };
            };
            venue: {
              id: number;
              name: string;
              link: string;
            };
            content: {
              link: string;
            };
          },
        ];
        events: string[];
        matches: string[];
      },
    ];
  };
}
