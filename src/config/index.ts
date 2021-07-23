export const TYPE_OPTIONS = [
  {value: 'planets', icon: '🪐', label: 'planets'},
  {value: 'people', icon: '👸', label: 'people'},
  {value: 'films', icon: '⭐', label: 'films'},
  {value: 'species', icon: '👾', label: 'species'},
  {value: 'vehicles', icon: '🛸', label: 'vehicles'},
  {value: 'starships', icon: '☄️', label: 'starships'},
];

export const DEFAULT_TYPE: ResourceType = 'planets';

const config = {
  // API_URL: process.env.API_URL,
  API_URL: 'https://swapi.dev/api',
};

export default config;
