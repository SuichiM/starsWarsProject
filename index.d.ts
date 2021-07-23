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

interface IResource {
  url: Url;
  id: string;
  created: string;
  edited: string;
  type: ResourceType;
}

interface IPeople extends IResource {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface IPlanet extends IResource {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: boolean;
  population: number;
}

interface IFilm extends IResource {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: Url[];
  planets: Url[];
  starships: Url[];
  vehicles: Url[];
  species: Url[];
}

interface ISpecie extends IResource {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: Url[];
  films: Url[];
}

interface IStarship extends IResource {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: Url[];
  films: Url[];
}

interface IVehicle extends IResource {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: Url[];
  films: Url[];
}
type TResource = IPeople & IPlanet & IFilm & ISpecie & IStarship & IVehicle;

type TList = Array<IPeople | IPeople>;

type TAPIResponse = {
  count: number;
  results: TList;
  next: string;
  previous: string;
  error?: string;
};
