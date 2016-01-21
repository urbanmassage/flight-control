import * as React from 'react';
import Layout from '../Presenters/Layout';
import TransactionIDBar from './TransactionIDBar';

let devTools = null;

class App extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      // Hack to avoid mismatch in first render between server and client.
      // Devtools need window width and height to be known.
      const DevTools = require('./DevTools').default;
      devTools = <DevTools />;
      this.forceUpdate();
    }
  }
  render() {
    return (
      <div>
        {devTools}
        <Layout searchBar={(
          <TransactionIDBar />
        )}>
          {this.props.children}
        </Layout>
      </div>
    );
  }
}

export default App;
