import React from 'react';
import '@assets/styles.scss';
import Search from '@components/Search';
import Layout from '@components/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Search></Search>
    </Layout>
  );
};

export default App;
