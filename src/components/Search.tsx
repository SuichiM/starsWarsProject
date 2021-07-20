import React, {useState, useEffect} from 'react';
import {Select, Spin} from 'antd';
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

type frmDataType = {
  type: ResourceType;
  input: string;
};

const SearchComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const initialFormData: frmDataType = {
    type: DEFAULT_TYPE,
    input: '',
  };
  const [frm, setFrm] = useState(initialFormData);

  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  const handleInputChange = async (input: string, value: string) => {
    setFrm({
      ...frm,
      [input]: value,
    });
  };

  useEffect(() => {
    if (frm.input.length > 2) {
      setLoading(true);
      api.getResources(frm.type, frm.input).then((res) => {
        setAutoCompleteOptions(res || []);
        setTimeout(() => setLoading(false), 2000);
      });
    }
  }, [frm.input, frm.type]);

  return (
    <div className="d-flex justify-content-center">
      <Select
        style={{
          width: 150,
        }}
        onChange={(value: string) => handleInputChange('type', value)}
        value={frm.type}>
        {TYPE_OPTIONS.map(({value, icon, label}, idx) => (
          <Option key={idx} value={value}>
            {icon} {'  '}
            {label}
          </Option>
        ))}
      </Select>
      <Select
        showSearch
        value={frm.input}
        placeholder="Input your search"
        style={{
          width: '60%',
        }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={(value) => handleInputChange('input', value)}
        //onChange={(value) => handleInputChange('input', value)}
        notFoundContent={
          loading === true ? (
            <span className="text-center">
              <Spin />{' '}
            </span>
          ) : null
        }>
        {autoCompleteOptions.map(({value, name, title, population}, idx) => (
          <Option key={idx} value={value}>
            <span className="fw-bolder">{name || title}</span>{' '}
            {Boolean(population) && (
              <small className="text-muted">{`(pop. ${population})`}</small>
            )}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SearchComponent;
