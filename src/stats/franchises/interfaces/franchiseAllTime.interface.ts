export interface Logo {
  id: number;
  background: string;
  endSeason: number;
  secureUrl: string;
  startSeason: number;
  teamId: number;
  url: string;
}

export interface FranchiseAllTime {
  id: number;
  firstSeasonId: number;
  fullName: string;
  lastSeasonId: string;
  mostRecentTeamId: number;
  teamAbbrev: string;
  teamCommonName: string;
  teamPlaceName: string;
  teams?: {
    id: number;
    active: string;
    franchiseTeam: {
      firstSeason: {
        id: number;
      };
      lastSeason: string;
    }[];
  }[];
  logos: Logo[];
}
