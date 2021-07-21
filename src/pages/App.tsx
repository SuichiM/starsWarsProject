import React, {useState} from 'react';
import '@assets/styles.scss';
import Search from '@components/Search';
import Layout from '@components/Layout';
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
        <Search></Search>
        <Divider></Divider>
      </MainContext.Provider>
    </Layout>
  );
};

export default App;
