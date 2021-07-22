import React, {useState, useEffect, useContext} from 'react';
import {Select, Spin, message, Modal} from 'antd';
import {MainContext} from '@pages/App';
import debounce from 'lodash/debounce';
import 'antd/dist/antd.css';

import api from '@services/api';
import {TYPE_OPTIONS, DEFAULT_TYPE} from '@config/index';

const {Option} = Select;

const SEARCH_SUGGESTIONS = {
  planets: 'Tatooine',
  people: 'Dart Vader',
  films: 'A New Hope',
  species: 'Ewok',
  vehicles: 'Sail barge',
  starships: 'Executor',
};

const DELAY_TIME = 800;

const makeID = (url) => {};

const SearchComponent: React.FC = () => {
  const {selectedOptions, setSelectedOptions} = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(DEFAULT_TYPE);
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);

  const debouncedSearchText = debounce(setSearchText, DELAY_TIME);

  const showRequest = () =>
    Modal.error({
      title: `Please don't add the same element again! is a requirement`,
      content: 'I really, really, want this job',
      okText: 'I will',
      onOk: (close) => {
        message.success('I appreciate');
        close();
      },
    });

  const handleAddSelectedOption = (value) => {
    const selectedOption = options[value];

    const alreadyAdded = selectedOptions.some(
      (el) => el.type === type && el.name === selectedOption.name,
    );
    if (alreadyAdded) return showRequest();

    const {url} = selectedOptions;
    const id = makeID(url);

    setSelectedOptions([
      ...selectedOptions,
      {
        ...selectedOption,
        id: `${type}_${value}`,
        type,
      },
    ]);
    setSearchText('');
    setOptions([]);
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
    <div className="container text-center">
      <div className="h2 mx-auto">May the force be with your search</div>
      <Select
        className="col-12 col-sm-3"
        onChange={(value) => setType(value)}
        value={type}>
        {typeOptionsRender}
      </Select>
      <Select
        showSearch
        value={searchText}
        placeholder="Input your search"
        className="col-12 col-sm-7"
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
