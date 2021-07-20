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
    <h1 className="mt-2 text-white">THE STARS WARS CHALLENGE</h1>
  </Header>
);

export default PageHeader;
