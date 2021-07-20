import React from 'react';
import '@assets/styles.scss';
import Search from '@components/Search';
import Layout from '@components/Layout';
import {Divider} from 'antd';

const App: React.FC = () => {
  //const Context = React.createContext({});

  return (
    <Layout>
      <Search></Search>
      <Divider></Divider>
    </Layout>
  );
};

export default App;
