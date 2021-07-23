import React from 'react';
import {Layout} from 'antd';

const {Header} = Layout;

const PageHeader: React.FC = () => (
  <Header
    style={{
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      textAlign: 'center',
    }}>
    <h1 className="mt-2 text-white d-none d-md-block">THIS IS THE PR 1</h1>
    <h1 className="mt-2 text-white d-block d-md-none"> THIS IS THE PR 1</h1>
  </Header>
);

export default PageHeader;
