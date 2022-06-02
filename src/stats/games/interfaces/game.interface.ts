export interface GamePlayPlayer {
  player: {
    id: number;
    fullName: string;
    link: string;
  };
  playerType: string;
}

export interface GamePlay {
  result: {
    event: string;
    eventCode: string;
    eventTypeId: string;
    description: string;
  };
  about: {
    eventIdx: number;
    eventId: number;
    period: number;
    periodType: string;
    ordinalNum: string;
    periodTime: string;
    periodTimeRemaining: string;
    dateTime: string;
    goals: {
      away: number;
      home: number;
    };
  };
  coordinates?: {
    x: number;
    y: number;
  };
  players?: GamePlayPlayer[];
  team?: {
    id: number;
    name: string;
    link: string;
    triCode: string;
  };
}

export interface Game {
  gamePk: 2021030146;
  link: string;
  metaData: {
    wait: number;
    timeStamp: string;
  };
  gameData: {
    game: {
      pk: number;
      season: string;
      type: string;
    };
    datetime: {
      dateTime: string;
    };
    status: {
      abstractGameState: string;
      codedGameState: string;
      detailedState: string;
      statusCode: string;
      startTimeTBD: boolean;
    };
    teams: {
      away: {
        id: number;
        name: string;
        link: string;
        venue: {
          id: number;
          name: string;
          link: string;
          city: string;
          timeZone: {
            id: string;
            offset: number;
            tz: string;
          };
        };
        abbreviation: string;
        triCode: string;
        teamName: string;
        locationName: string;
        firstYearOfPlay: string;
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
        franchise: {
          franchiseId: number;
          teamName: string;
          link: string;
        };
        shortName: string;
        officialSiteUrl: string;
        franchiseId: number;
        active: boolean;
      };
      home: {
        id: number;
        name: string;
        link: string;
        venue: {
          id: number;
          name: string;
          link: string;
          city: string;
          timeZone: {
            id: string;
            offset: number;
            tz: string;
          };
        };
        abbreviation: string;
        triCode: string;
        teamName: string;
        locationName: string;
        firstYearOfPlay: string;
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
        franchise: {
          franchiseId: number;
          teamName: string;
          link: string;
        };
        shortName: string;
        officialSiteUrl: string;
        franchiseId: number;
        active: true;
      };
    };
    players: {
      [key: string]: {
        id: number;
        fullName: string;
        link: string;
        firstName: string;
        lastName: string;
        primaryNumber: string;
        birthDate: string;
        currentAge: number;
        birthCity: string;
        birthCountry: string;
        nationality: string;
        height: string;
        weight: number;
        active: boolean;
        alternateCaptain: boolean;
        captain: boolean;
        rookie: boolean;
        shootsCatches: string;
        rosterStatus: string;
        currentTeam: {
          id: number;
          name: string;
          link: string;
          triCode: string;
        };
        primaryPosition: {
          code: string;
          name: string;
          type: string;
          abbreviation: string;
        };
      };
    };
    venue: {
      id: number;
      name: string;
      link: string;
    };
  };
  liveData: {
    plays: {
      allPlays: GamePlay[];
      scoringPlays: number[];
      penalityPlays: number[];
      playsByPeriod: {
        startIndex: number;
        plays: number[];
        endIndex: number;
      };
      currentPlay: {
        players: {
          player: {
            id: number;
            fullName: string;
            link: string;
          };
          playerType: string;
        }[];
        result: {
          event: string;
          eventCode: string;
          eventTypeId: string;
          description: string;
        };
        about: {
          eventIdx: number;
          eventId: number;
          period: number;
          periodType: string;
          ordinalNum: string;
          periodTime: string;
          periodTimeRemaining: string;
          dateTime: string;
          goals: {
            away: number;
            home: number;
          };
        };
        coordinates: {
          x: number;
          y: number;
        };
        team: {
          id: number;
          name: string;
          link: string;
          triCode: string;
        };
      };
      lineScore: {
        currentPeriod: number;
        currentPeriodOrdinal: string;
        currentPeriodTimeRemaining: string;
        periods: {
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
        }[];
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
              name: SVGStringList;
              link: string;
              abbreviation: string;
              triCode: string;
            };
            goals: number;
            shotsOnGoal: number;
            goaliePulled: boolean;
            numSkaters: number;
            powerPlay: boolean;
          };
          away: {
            team: {
              id: number;
              name: SVGStringList;
              link: string;
              abbreviation: string;
              triCode: string;
            };
            goals: number;
            shotsOnGoal: number;
            goaliePulled: boolean;
            numSkaters: number;
            powerPlay: boolean;
          };
        };
        powerPlayStrength: string;
        hasShootout: boolean;
        intermissionInfo: {
          intermissionTimeRemaining: number;
          intermissionTimeElapsed: number;
          inIntermission: boolean;
        };
        powerPlayInfo: {
          situationTimeRemaining: number;
          situationTimeElapsed: number;
          inSituation: boolean;
        };
      };
      boxScore: {
        teams: {
          away: {
            team: {
              id: number;
              name: string;
              link: string;
              triCode: string;
            };
            teamStats: {
              teamSkaterStats: {
                goals: number;
                pim: number;
                shots: number;
                powerPlayPercentage: string;
                powerPlayGoals: number;
                powerPlayOpportunities: number;
                faceOffWinPercentage: string;
                blocked: number;
                takeaways: number;
                giveaways: number;
                hits: number;
              };
            };
            players: {
              [key: string]: {
                person: {
                  id: number;
                  fullName: string;
                  link: string;
                  shootsCatches: string;
                  rosterStatus: string;
                };
                jerseyNumber: string;
                position: {
                  code: string;
                  name: string;
                  type: string;
                  abbreviation: string;
                };
                stats: {
                  skaterStats: {
                    timeOnIce: string;
                    assists: number;
                    goals: number;
                    shots: number;
                    hits: number;
                    powerPlayGoals: number;
                    powerPlayAssists: number;
                    penaltyMinutes: number;
                    faceOffWins: number;
                    faceoffTaken: number;
                    takeaways: number;
                    giveaways: number;
                    shortHandedGoals: number;
                    shortHandedAssists: number;
                    blocked: number;
                    plusMinus: number;
                    evenTimeOnIce: string;
                    powerPlayTimeOnIce: string;
                    shortHandedTimeOnIce: string;
                  };
                };
                goalies: number[];
                skaters: number[];
                onIce: number[];
                onIcePlus: {
                  playerId: number;
                  shiftDuration: number;
                  stamina: number;
                }[];
                scratches: number[];
                penalitybox: any[];
                coaches: {
                  person: {
                    fullNale: string;
                    link: string;
                  };
                  position: {
                    code: string;
                    name: string;
                    type: string;
                    abbreviation: string;
                  };
                }[];
              };
            };
          };
        };
      };
    };
  };
}
