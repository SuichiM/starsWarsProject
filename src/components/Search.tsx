import React, {useState, useEffect, useContext} from 'react';
import {Select, Spin, message} from 'antd';
import {MainContext} from '@pages/App';
import debounce from 'lodash/debounce';

import 'antd/dist/antd.css';

import api from '@services/api';

const {Option} = Select;

const DEFAULT_TYPE: ResourceType = 'planets';

const TYPE_OPTIONS = [
  {value: 'planets', icon: '🪐', label: 'planets'},
  {value: 'people', icon: '👸', label: 'people'},
  {value: 'films', icon: '⭐', label: 'films'},
  {value: 'species', icon: '👾', label: 'species'},
  {value: 'vehicles', icon: '🛸', label: 'vehicles'},
  {value: 'starships', icon: '☄️', label: 'starships'},
];

const SEARCH_SUGGESTIONS = {
  planets: 'Tatooine',
  people: 'Dart Vader',
  films: 'A New Hope',
  species: 'Ewok',
  vehicles: 'Sail barge',
  starships: 'Executor',
};

const DELAY_TIME = 800;

const SearchComponent: React.FC = () => {
  const {selectedOptions, setSelectedOptions} = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(DEFAULT_TYPE);
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);

  const debouncedSearchText = debounce(setSearchText, DELAY_TIME);

  const handleAddSelectedOption = (value) => {
    const selectedOption = options[value];
    setSelectedOptions([
      ...selectedOptions,
      {
        ...selectedOption,
        id: `${type}_${value}`,
        type,
      },
    ]);
    setSearchText('');
  };

  useEffect(() => {
    if (searchText.length > 2) {
      setLoading(true);
      api.getResources(type, searchText).then((result = []) => {
        setOptions(result || []);
        setLoading(false);
        if (result.length === 0)
          message.warning(
            `There was no lucky on the search. Why don't try: ${SEARCH_SUGGESTIONS[type]}`,
          );
      });
    }
  }, [type, searchText]);

  const typeOptionsRender = TYPE_OPTIONS.map(({value, icon, label}, idx) => (
    <Option key={idx} value={value}>
      {icon} {'  '}
      {label}
    </Option>
  ));

  const spinnerRender =
    loading === true ? (
      <span className="text-center">
        <Spin />{' '}
      </span>
    ) : null;

  const OptionsRender = options.map(({value, name, title, population}, idx) => (
    <Option key={idx} value={value}>
      <span className="fw-bolder">{name || title}</span>{' '}
      {Boolean(population) && (
        <small className="text-muted">{`(pop. ${population})`}</small>
      )}
    </Option>
  ));

  return (
    <div className="d-flex justify-content-center">
      <Select
        style={{
          width: 150,
        }}
        onChange={(value) => setType(value)}
        value={type}>
        {typeOptionsRender}
      </Select>
      <Select
        showSearch
        value={searchText}
        placeholder="Input your search"
        style={{
          width: '60%',
        }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={(value) => debouncedSearchText(value)}
        onChange={(value) => handleAddSelectedOption(value)}
        notFoundContent={spinnerRender}>
        {OptionsRender}
      </Select>
    </div>
  );
};

export default SearchComponent;
