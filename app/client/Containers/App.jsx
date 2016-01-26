import * as React from 'react';
import Layout from '../Presenters/Layout';
import TransactionIDBar from './TransactionIDBar';
import loadSearch from '../actions/load-search';
import {connect} from 'react-redux';

let devTools = null;

@connect(null, {loadSearch})
class App extends React.Component {
  componentDidMount() {
    this.props.loadSearch();
    if (process.env.NODE_ENV === 'development') {
      // Hack to avoid mismatch in first render between server and client.
      // Devtools need window width and height to be known.
      const DevTools = require('./DevTools').default;
      devTools = <DevTools />;
      this.forceUpdate();
    }
  }
  render() {
    const {sidebar, main} = this.props;
    return (
      <div>
        {devTools}
        <Layout>
          <div className="row">{[
            (<div className="col-sm-6 col-md-4 animated" key={sidebar.key}>
              {React.cloneElement(sidebar, {key: sidebar.key})}
            </div>),
            (<div className="col-sm-6 col-md-8 animated" key={main.key}>
              {React.cloneElement(main, {key: main.key})}
            </div>),
          ]}</div>
        </Layout>
      </div>
    );
  }
  static propTypes = {
    sidebar: React.PropTypes.element.isRequired,
    main: React.PropTypes.element.isRequired,
  };
}

export default App;
