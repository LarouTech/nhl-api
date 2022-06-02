export interface Season {
  seasonId: string;
  regularSeasonStartDate: string;
  regularSeasonEndDate: string;
  seasonEndDate: string;
  numberOfGames: number;
  tiesInUse: true | string;
  olympicsParticipation: false | string;
  conferencesInUse: false | string;
  divisionsInUse: false | string;
  wildCardInUse: false | string;
}
