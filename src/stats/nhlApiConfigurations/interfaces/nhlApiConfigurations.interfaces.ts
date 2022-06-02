export interface Configurations {
  description: string;
  endpoint: string;
}

export interface GameTypes {
  id: string;
  description: string;
  postSeason: string;
}

export interface SeriesCodes {
  seriesCode: string;
}

export interface Expands {
  description: string;
  name: string;
}

export interface PlayerStatus {
  displayName: string;
}

export interface PerformerTypes {
  name: string;
}

export interface StatTypes {
  displayName: string;
  gameType: string;
}

export type StandingsTypes = Expands;

export interface GameStatus {
  code: string;
  abstractGameState: string;
  detailedState: string;
  baseballCode: string;
  startTimeTBD: false;
}

export interface PlayTypesPlayer {
  playerType: string;
}

export interface PlayTypes {
  name: string;
  id: string;
  cmsKey: string;
  playerTypes: PlayTypesPlayer[];
  code: string;
  secondaryEventCodes: string[];
}

export interface Languages {
  languageCode: string;
  locale: string;
}

export interface Positions {
  abbrev: string;
  code: string;
  fullName: string;
  type: string;
}

export interface Platforms {
  platformCode: string;
  platformDescription: string;
}

export interface PowerPlayStregth {
  description: string;
}

export interface LeagueLeaderTypes {
  displayName: string;
  hasMinimums: boolean | string;
}

export type DepthTypes = PlayerStatus;

export interface ImageTypes {
  type: string;
  extension: string;
}

export interface ImageDimension {
  dimension: string;
  width: string | number;
  height: string | number;
}

export interface ImageSizes {
  LEGACY_NHL: ImageDimension[];
  XBOX_ONE: ImageDimension[];
  FIRE_TV: ImageDimension[];
  IOS_PHONE: ImageDimension[];
  APPLE_TV: ImageDimension[];
  WEB: ImageDimension[];
  ROKU: ImageDimension[];
  ANDROID_TABLET: ImageDimension[];
  CHROMECAST: ImageDimension[];
  IOS_TABLET: ImageDimension[];
  TV_OS: ImageDimension[];
  XBOX_360: ImageDimension[];
  ANDROID_PHONE: ImageDimension[];
  PLAYSTATION: ImageDimension[];
}

export interface ScheduleTypes {
  id: string;
  description: string;
}

export interface RosterTypes {
  description: string;
  parameter: string;
}

export interface SiteLanguage {
  code: string;
  description: string;
  site: {
    siteCode: string;
  };
  language: {
    languageCode: string;
    locale: string;
  };
}

export type TeamDesignations = string[];

export interface RosterStatuses {
  code: string;
  description: string;
}
export type EventTypes = ScheduleTypes;

export interface TournamentTypes {
  description: string;
  gameTypeEnum: {
    id: string;
    description: string;
    postSeason: string | boolean;
  };
  parameter: string;
}

export interface ProspectCategories {
  id: number;
  shortName: string;
  name: string;
}

export type NhlApiConfigurationsResponse =
  | Configurations[]
  | GameTypes[]
  | Expands[]
  | PlayerStatus[]
  | PerformerTypes[]
  | StatTypes[]
  | StandingsTypes[]
  | GameStatus[]
  | PlayTypesPlayer[]
  | PlayTypes[]
  | Languages[]
  | Positions[]
  | Platforms[]
  | PowerPlayStregth[]
  | LeagueLeaderTypes[]
  | DepthTypes[]
  | ImageTypes[]
  | ImageSizes[]
  | ScheduleTypes[]
  | RosterTypes[]
  | SiteLanguage[]
  | TeamDesignations[]
  | RosterStatuses[]
  | EventTypes[]
  | TournamentTypes[]
  | ProspectCategories[];
