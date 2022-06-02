export interface Division {
  id: number;
  name: string;
  nameShort: string;
  link: string;
  abbreviation: string;
  conference?: {
    id: number;
    name: string;
    link: string;
  };
  active?: boolean | string;
}
