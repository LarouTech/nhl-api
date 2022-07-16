import { PlayerStats } from 'src/stats/player/interfaces/playerStats.interface';

export interface TeamRoster {
  person: {
    id: number;
    fullName: string;
    link: string;
  };
  jerseyNumber: string;
  position: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  stats?: PlayerStats[];
}
