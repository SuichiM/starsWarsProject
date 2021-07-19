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
    <h1 style={{color: 'white'}}>THE STARS WARS CHALLENGE</h1>
  </Header>
);

export default PageHeader;
