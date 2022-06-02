import { Broadcasts } from './scheduleBroadcasts.interface';
import { Linescore } from './scheduleLinescore.interface';
import { Ticket } from './scheduleTicket.interface';

export interface ImageCuts {
  aspectRatio: string;
  width: number;
  height: number;
  src: string;
  at2x: string;
  at3x: string;
}

export interface Playbacks {
  name: string;
  width: string;
  height: string;
  url: string;
}

export interface GameItem {
  type: string;
  id: string;
  date: string;
  title: string;
  blurb: string;
  description: string;
  duration: string;
  authFlow: false;
  mediaPlaybackId: string;
  mediaState: string;
  keywords: { type: string; value: string; displayName: string }[];
  image: {
    title: string;
    altText: string;
    cuts: {
      '1136x640': ImageCuts;
      '1024x576': ImageCuts;
      '960x540': ImageCuts;
      '768x432': ImageCuts;
      '640x360': ImageCuts;
      '568x320': ImageCuts;
      '372x210': ImageCuts;
      '320x180': ImageCuts;
      '248x140': ImageCuts;
      '124x70': ImageCuts;
    };
  };
  playbacks: Playbacks[];
}

export interface MediaMilestonesItem {
  title: string;
  description: string;
  type: string;
  timeAbsolute: string;
  timeOffset: string;
  period: string;
  statsEventId: string;
  teamId: string;
  playerId: string;
  periodTime: string;
  ordinalNum: string;
  highlight: any;
}

export interface MediaEpgItem {
  guid: string;
  mediaState: string;
  mediaPlaybackId: string;
  mediaFeedType: string;
  callLetters: string;
  eventId: string;
  language: string;
  freeGame: string;
  feedName: string;
  gamePlus: string;
  externalId: string[];
}

export interface MediaEpg {
  title: string;
  platform?: string;
  items: MediaEpgItem[] | GameItem;
}

export interface Game {
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
    startTimeTBD: string;
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
    venue: {
      id: number;
      name: string;
      link: string;
    };
  };
  content: {
    link: string;
    editorial?: any;
    media?: {
      title: string;
      streamsStart: string;
      items: MediaMilestonesItem[];
      epg: [];
    };
    highlights?: {
      gameCenter: {
        title: string;
        topicList: string;
        items: GameItem[];
      };
      scoreboard: {
        title: string;
        topicList: string;
        items: GameItem[];
      };
    };
  };
  seriesSummary: {
    gamePk: number;
    gameNumber: number;
    gameLabel: string;
    necessary: string | boolean;
    gameCode: number;
    gameTime: string;
    seriesStatus: string;
    seriesStatusShort: string;
  };
}

export interface Schedule {
  date: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalMatches: number;
  games: Game[];
  broadcasts?: Broadcasts[];
  linescore?: Linescore;
  tickets: Ticket[];
}
