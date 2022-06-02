interface TeamStatsNumbersDetails {
  stat: {
    gamesPlayed: number;
    wins: number;
    losses: number;
    ot: number;
    pts: number;
    ptPctg: number;
    goalsPerGame: number;
    goalsAgainstPerGame: number;
    evGGARatio: number;
    powerPlayPercentage: number;
    powerPlayGoals: number;
    powerPlayGoalsAgainst: number;
    powerPlayOpportunities: number;
    penaltyKillPercentage: number;
    shotsPerGame: number;
    shotsAllowed: number;
    winScoreFirst: number;
    winOppScoreFirst: number;
    winLeadFirstPer: number;
    winLeadSecondPer: number;
    winOutshootOpp: number;
    winOutshotByOpp: number;
    faceOffsTaken: number;
    faceOffsWon: number;
    faceOffsLost: number;
    faceOffWinPercentage: number;
    shootingPctg: number;
    savePctg: number;
  };
  team: {
    id: number;
    name: string;
    link: string;
  };
}

interface TeamsStatsStandingDetails {
  stat: {
    wins: string;
    losses: string;
    ot: string;
    pts: string;
    ptPctg: string;
    goalsPerGame: string;
    goalsAgainstPerGame: string;
    evGGARatio: string;
    powerPlayPercentage: string;
    powerPlayGoals: string;
    powerPlayGoalsAgainst: string;
    powerPlayOpportunities: string;
    penaltyKillOpportunities: string;
    penaltyKillPercentage: string;
    shotsPerGame: string;
    shotsAllowed: string;
    winScoreFirst: string;
    winOppScoreFirst: string;
    winLeadFirstPer: string;
    winLeadSecondPer: string;
    winOutshootOpp: string;
    winOutshotByOpp: string;
    faceOffsTaken: string;
    faceOffsWon: string;
    faceOffsLost: string;
    faceOffWinPercentage: string;
    savePctRank: string;
    shootingPctRank: string;
  };
  team: {
    id: number;
    name: string;
    link: string;
  };
}

export interface TeamStats {
  type: {
    displayName: string;
    gameType: {
      id: string;
      descxription: string;
      postSeason: string;
    };
    splits: (TeamStatsNumbersDetails | TeamsStatsStandingDetails)[];
  };
}
