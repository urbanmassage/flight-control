import * as React from 'react';
import Layout from './Presenters/Layout';
import TransactionIDBar from './Containers/TransactionIDBar';

class App extends React.Component {
  render() {
    return (
      <Layout searchBar={(
        <TransactionIDBar />
      )}>
        Hello!
      </Layout>
    );
  }
}

export default App;
