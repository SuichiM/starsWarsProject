// import _ from 'lodash';

import config from '@config/index';
const {API_URL} = config;

const request = async function (
  base: string,
  type: ResourceType,
  searchText: string,
) {
  const response = await fetch(`${base}/${type}?search=${searchText}`);
  const {results = []}: TAPIResponse = await response.json();
  return results;
};

function getResources(
  type: ResourceType,
  searchText: string,
): Promise<TPeople[] | TPlanets[] | null> {
  return request(API_URL, type, searchText);
}

export default {
  // getResources: _.debounce(getResources, 1000),
  getResources,
};
