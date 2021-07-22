import React from 'react';

import {Layout} from 'antd';
import PageHeader from '@components/Header';
import PageFooter from '@components/Footer';

const {Content} = Layout;

const myLayout: React.FC = ({children}) => (
  <>
    <Layout>
      <PageHeader></PageHeader>
      <Content
        className="site-layout"
        style={{padding: '0 50px', marginTop: 64}}>
        {children}
      </Content>
      <PageFooter></PageFooter>
    </Layout>
    <style jsx>{`
      .site-layout {
        background: #fff;
        height: calc(100vh - 64px - 70px);
      }
      .site-layout .site-layout-background {
      }
    `}</style>
  </>
);

export default myLayout;
