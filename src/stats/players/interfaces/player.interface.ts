import { Teams } from '../../teams/interfaces/teams.interface';
import { PlayerStats } from './playerStats.interface';

export interface Player {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince: string;
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
  currentTeam: Teams;
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  otherNames?: {
    slug: string;
    lastFirstName: string;
    firstLastName: string;
  };
  social?: {
    twitter?: string[];
    facebook?: string[];
    instagram?: [];
  };
  position?: string;
  team?: string;
  image?: {
    headshot: string;
    actionshot: string;
  };
  stats?: PlayerStats[];
}
