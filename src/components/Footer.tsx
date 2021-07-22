import React from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;

const PageHeader: React.FC = () => (
  <Footer className="fixed-bottom" style={{textAlign: 'center'}}>
    The stars wars challenge page - Created by{' '}
    <a href="https://github.com/SuichiM">SuichiM</a>
  </Footer>
);

export default PageHeader;
