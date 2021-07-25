import React from 'react';
import {Layout, Button} from 'antd';

const {Header} = Layout;

const PageHeader: React.FC = () => (
  <Header
    style={{
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      textAlign: 'center',
    }}>
    <h1 className="mt-2 text-white">THIS IS THE PR1</h1>
  </Header>
);

export default PageHeader;
