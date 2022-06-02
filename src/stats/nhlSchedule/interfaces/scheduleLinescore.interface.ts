export interface Linescore {
  currentPeriod: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  periods: [
    {
      periodType: string;
      startTime: string;
      num: number;
      ordinalNum: string;
      home: {
        goals: number;
        shotsOnGoal: number;
        rinkSide: string;
      };
      away: {
        goals: number;
        shotsOnGoal: number;
        rinkSide: string;
      };
    },
  ];
  shootoutInfo: {
    away: {
      scores: number;
      attempts: number;
    };
    home: {
      scores: number;
      attempts: number;
    };
  };
  teams: {
    home: {
      team: {
        id: number;
        name: string;
        link: string;
      };
      goals: number;
      shotsOnGoal: number;
      goaliePulled: false | string;
      numSkaters: number;
      powerPlay: false | string;
    };
    away: {
      team: {
        id: number;
        name: string;
        link: string;
      };
      goals: number;
      shotsOnGoal: number;
      goaliePulled: false | string;
      numSkaters: number;
      powerPlay: false | string;
    };
  };
}
