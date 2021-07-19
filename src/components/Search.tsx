import React from 'react';
import {Button, DatePicker, version} from 'antd';
import 'antd/dist/antd.css';

const Search: React.FC = () => (
  <div className="ant-container">
    <h1>antd version: {version}</h1>
    <DatePicker />
    <Button type="primary" style={{marginLeft: 8}}>
      Primary Button
    </Button>
  </div>
);

export default Search;
