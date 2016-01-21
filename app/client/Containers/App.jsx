import * as React from 'react';
import Layout from '../Presenters/Layout';
import TransactionIDBar from './TransactionIDBar';

class App extends React.Component {
  render() {
    return (
      <Layout searchBar={(
        <TransactionIDBar />
      )}>
        {this.props.children}
      </Layout>
    );
  }
}

export default App;
