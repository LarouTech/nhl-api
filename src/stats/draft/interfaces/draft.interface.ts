export interface DraftPick {
  year: number;
  round: number;
  pickOverall: number;
  pickInRound: number;
  team: {
    id: number;
    name: string;
    link: string;
  };
  prospect: {
    id: number;
    fullName: string;
    link: string;
  };
}

export interface DraftRound {
  roundNumber: number;
  round: string;
  picks: DraftPick[];
}

export interface Draft {
  draftYear: number;
  rounds: DraftRound[];
}
