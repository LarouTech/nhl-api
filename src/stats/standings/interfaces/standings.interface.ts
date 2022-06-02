export interface Record {
  wins: number;
  losses: number;
  ot: number;
  type: string;
}

export interface TeamRecord {
  team: {
    id: number;
    name: string;
    link: string;
  };
  leagueRecord: {
    wins: number;
    losses: number;
    ot: number;
    type: string;
  };
  regulationWins: number;
  goalsAgainst: number;
  goalsScored: number;
  points: number;
  divisionRank: string;
  divisionL10Rank: 1;
  divisionRoadRank: string;
  divisionHomeRank: string;
  conferenceRank: string;
  conferenceL10Rank: string;
  conferenceRoadRank: string;
  conferenceHomeRank: string;
  leagueRank: string;
  leagueL10Rank: string;
  leagueRoadRank: string;
  leagueHomeRank: string;
  wildCardRank: string;
  row: number;
  gamesPlayed: number;
  streak: {
    streakType: string;
    streakNumber: number;
    streakCode: string;
  };
  clinchIndicator: string;
  pointsPercentage: number;
  ppDivisionRank: string;
  ppConferenceRank: string;
  ppLeagueRank: string;
  records: {
    overallRecords: Record[];
    divisionRecords: Record[];
    conferenceRecords: Record[];
  };
  lastUpdated: string;
}

export interface Standing {
  standingsType: string;
  league: {
    id: number;
    name: string;
    link: string;
  };
  division: {
    id: number;
    name: string;
    nameShort: string;
    link: string;
    abbreviation: string;
  };
  conference: {
    id: number;
    name: string;
    link: string;
  };
  teamsRecord: TeamRecord[];
}
