import React, {useState} from 'react';
import '@assets/styles.scss';
import Layout from '@components/Layout';
import Search from '@components/Search';
import List from '@components/List';

import {Divider} from 'antd';

export const MainContext = React.createContext(null);

const App: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Layout>
      <MainContext.Provider
        value={{
          selectedOptions,
          setSelectedOptions,
        }}>
        <Search />
        <Divider />
        <List />
      </MainContext.Provider>
    </Layout>
  );
};

export default App;
