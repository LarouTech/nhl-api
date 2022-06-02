export interface Prospects {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthCity: string;
  birthCountry: string;
  height: string;
  weight: number;
  shootsCatches: string;
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  nhlPlayerId: number;
  draftStatus: string;
  prospectCategory: {
    id: number;
    shortName: string;
    name: string;
  };
  amateurTeam: {
    name: string;
    link: string;
  };
  amateurLeague: {
    name: string;
    link: string;
  };
  ranks: {
    midterm: number;
    finalRank: number;
    draftYear: number;
  };
}
