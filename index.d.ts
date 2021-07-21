type Url = string;

type Json =
  | string
  | number
  | boolean
  | null
  | {[property: string]: Json}
  | Json[];

type TProductId = string;

type ResourceType =
  | 'planets'
  | 'people'
  | 'films'
  | 'species'
  | 'vehicles'
  | 'starships';

type TPeople = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
};

type TPlanets = {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: boolean;
  population: number;
};

type TList = TPeople[] | TPlanets[];

type TAPIResponse = {
  count: number;
  results: TList;
  next: string;
  previous: string;
  error?: string;
};
