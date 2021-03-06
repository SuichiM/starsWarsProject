export type paramType = {
  value: ResourceType;
  icon: string;
  label: string;
};

type ArrayParamType = Array<paramType>;

export const TYPE_OPTIONS: ArrayParamType = [
  {value: 'planets', icon: '🪐', label: 'planets'},
  {value: 'people', icon: '👸', label: 'people'},
  {value: 'films', icon: '⭐', label: 'films'},
  {value: 'species', icon: '👾', label: 'species'},
  {value: 'vehicles', icon: '🛸', label: 'vehicles'},
  {value: 'starships', icon: '☄️', label: 'starships'},
];

export const DEFAULT_TYPE: ResourceType = 'planets';

const config = {
  API_URL: 'https://swapi.dev/api',
  // API_URL_ENV: process.env.API_URL,
};

// eslint-disable-next-line
// console.log(process.env.API_URL);

export default config;
