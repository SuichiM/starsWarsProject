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
        <div
          className="site-layout-background"
          style={{padding: 24, minHeight: 380}}>
          {children}
        </div>
      </Content>
      <PageFooter></PageFooter>
    </Layout>
    <style jsx>{`
      .site-layout .site-layout-background {
        background: #fff;
      }
    `}</style>
  </>
);

export default myLayout;
